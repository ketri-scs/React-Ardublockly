import { TUTORIAL_PROGRESS, GET_TUTORIAL, GET_TUTORIALS, TUTORIAL_SUCCESS, TUTORIAL_ERROR, TUTORIAL_CHANGE, TUTORIAL_XML, TUTORIAL_ID, TUTORIAL_STEP } from './types';

import axios from 'axios';
import { returnErrors, returnSuccess } from './messageActions';

export const getTutorial = (id) => (dispatch, getState) => {
  dispatch({type: TUTORIAL_PROGRESS});
  axios.get(`${process.env.REACT_APP_BLOCKLY_API}/tutorial/${id}`)
    .then(res => {
      var tutorial = res.data.tutorial;
      existingTutorial(tutorial, getState().tutorial.status).then(status => {
        dispatch({
          type: TUTORIAL_SUCCESS,
          payload: status
        });
        dispatch({type: TUTORIAL_PROGRESS});
        dispatch({
          type: GET_TUTORIAL,
          payload: tutorial
        });
        dispatch(returnSuccess(res.data.message, res.status));
      });
    })
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'GET_TUTORIAL_FAIL'));
      }
      dispatch({type: TUTORIAL_PROGRESS});
    });
};

export const getTutorials = () => (dispatch, getState) => {
  dispatch({type: TUTORIAL_PROGRESS});
  axios.get(`${process.env.REACT_APP_BLOCKLY_API}/tutorial`)
    .then(res => {
      var tutorials = res.data.tutorials;
      console.log(tutorials);
      existingTutorials(tutorials, getState().tutorial.status).then(status => {
        dispatch({
          type: TUTORIAL_SUCCESS,
          payload: status
        });
        dispatch({
          type: GET_TUTORIALS,
          payload: tutorials
        });
        dispatch({type: TUTORIAL_PROGRESS});
        dispatch(returnSuccess(res.data.message, res.status));
      });
    })
    .catch(err => {
      if(err.response){
        dispatch(returnErrors(err.response.data.message, err.response.status, 'GET_TUTORIALS_FAIL'));
      }
      dispatch({type: TUTORIAL_PROGRESS});
    });
};

export const resetTutorial = () => (dispatch) => {
  dispatch({
    type: GET_TUTORIALS,
    payload: []
  });
  dispatch({
    type: TUTORIAL_STEP,
    payload: 0
  });
};

export const tutorialChange = () => (dispatch) => {
  dispatch({
    type: TUTORIAL_CHANGE
  });
};

export const tutorialCheck = (status, step) => (dispatch, getState) => {
  var tutorialsStatus = getState().tutorial.status;
  var id = getState().tutorial.tutorials[0]._id;
  var tutorialsStatusIndex = tutorialsStatus.findIndex(tutorialStatus => tutorialStatus._id === id);
  var tasksIndex = tutorialsStatus[tutorialsStatusIndex].tasks.findIndex(task => task._id === step._id);
  tutorialsStatus[tutorialsStatusIndex].tasks[tasksIndex] = {
    ...tutorialsStatus[tutorialsStatusIndex].tasks[tasksIndex],
    type: status
  };
  dispatch({
    type: status === 'success' ? TUTORIAL_SUCCESS : TUTORIAL_ERROR,
    payload: tutorialsStatus
  });
  dispatch(tutorialChange());
};

export const storeTutorialXml = (code) => (dispatch, getState) => {
  var tutorial = getState().tutorial.tutorials[0];
  if (tutorial) {
    var id = tutorial._id;
    var activeStep = getState().tutorial.activeStep;
    var steps = tutorial.steps;
    if (steps && steps[activeStep].type === 'task') {
      var tutorialsStatus = getState().tutorial.status;
      var tutorialsStatusIndex = tutorialsStatus.findIndex(tutorialStatus => tutorialStatus._id === id);
      var tasksIndex = tutorialsStatus[tutorialsStatusIndex].tasks.findIndex(task => task._id === steps[activeStep]._id);
      tutorialsStatus[tutorialsStatusIndex].tasks[tasksIndex] = {
        ...tutorialsStatus[tutorialsStatusIndex].tasks[tasksIndex],
        xml: code
      };
      dispatch({
        type: TUTORIAL_XML,
        payload: tutorialsStatus
      });
    }
  }
};

export const tutorialStep = (step) => (dispatch) => {
  dispatch({
    type: TUTORIAL_STEP,
    payload: step
  });
};


const existingTutorials = (tutorials, status) => new Promise(function(resolve, reject){
  var newstatus;
  new Promise(function(resolve, reject){
    var existingTutorialIds = tutorials.map((tutorial, i) => {
      existingTutorial(tutorial, status).then(status => {
        newstatus = status;
      });
      return tutorial._id;
    });
    resolve(existingTutorialIds)
  }).then(existingTutorialIds => {
    // deleting old tutorials which do not longer exist
    if (existingTutorialIds.length > 0) {
      status = newstatus.filter(status => existingTutorialIds.indexOf(status._id) > -1);
    }
    resolve(status);
  });
});

const existingTutorial = (tutorial, status) => new Promise(function(resolve, reject){
  var tutorialsId = tutorial._id;
  var statusIndex = status.findIndex(status => status._id === tutorialsId);
  if (statusIndex > -1) {
    var tasks = tutorial.steps.filter(step => step.type === 'task');
    var existingTaskIds = tasks.map((task, j) => {
      var tasksId = task._id;
      if (status[statusIndex].tasks.findIndex(task => task._id === tasksId) === -1) {
        // task does not exist
        status[statusIndex].tasks.push({ _id: tasksId });
      }
      return tasksId;
    });
    // deleting old tasks which do not longer exist
    if (existingTaskIds.length > 0) {
      status[statusIndex].tasks = status[statusIndex].tasks.filter(task => existingTaskIds.indexOf(task._id) > -1);
    }
  }
  else {
    status.push({ _id: tutorialsId, tasks: tutorial.steps.filter(step => step.type === 'task').map(task => { return { _id: task._id }; }) });
  }
  resolve(status);
});
