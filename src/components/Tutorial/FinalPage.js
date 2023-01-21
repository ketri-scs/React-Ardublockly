import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import BlocklyWindow from "../Blockly/BlocklyWindow";

import clsx from "clsx";
import { alpha } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import {
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import Dialog from "../Dialog";
import { IconButton } from "@material-ui/core";
import { clearMessages } from "../../actions/messageActions";

import * as Blockly from "blockly/core";

// import  { getTutorials,
//           tutorialProgress,
//           resetTutorial 
//         } from "../../actions/tutorialActions";



const styles = (theme) => ({
  outerDiv: {
    position: "absolute",
    right: "-30px",
    bottom: "-30px",
    width: "160px",
    height: "160px",
    color: alpha(theme.palette.secondary.main, 0.6),
  },
  outerDivError: {
    stroke: alpha(theme.palette.error.dark, 0.6),
    color: alpha(theme.palette.error.dark, 0.6),
  },
  outerDivSuccess: {
    stroke: alpha(theme.palette.primary.main, 0.6),
    color: alpha(theme.palette.primary.main, 0.6),
  },
  outerDivOther: {
    stroke: alpha(theme.palette.secondary.main, 0.6),
  },
  innerDiv: {
    width: "inherit",
    height: "inherit",
    display: "table-cell",
    verticalAlign: "middle",
    textAlign: "center",
  },
  // button: {
  //   backgroundColor: theme.palette.primary.main,
  //   color: theme.palette.primary.contrastText,
  //   width: "40px",
  //   height: "40px",
  //   "&:hover": {
  //     backgroundColor: theme.palette.primary.main,
  //     color: theme.palette.primary.contrastText,
  //   },
  // },
  // link: {
  //   color: theme.palette.primary.main,
  //   textDecoration: "none",
  //   "&:hover": {
  //     color: theme.palette.primary.main,
  //     textDecoration: "underline",
  //   },
  // },
});

class FinalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: "",
      content: "",
      tutorials: [],
      randomtutorials: [],
      activeXML: "",
    };
  }

  componentWillMount() {
    if (this.props.step.furthertutorials === true) {
      axios
      .get(`${process.env.REACT_APP_BLOCKLY_API}/tutorial`)
      .then((res) => {
        this.setState({ tutorials: res.data.tutorials });
        this.setState({ randomtutorials: this.getRandomTutorials(this.state.tutorials, 3) });
      })
    }    
  }

  toggleDialog = (solution) => {
    console.log(solution)
    if (this.state.open === true) {
      this.setState({ open: !this.state.open, title: "", activeXML: "" });
    } else if (this.state.open === false) {
      this.setState({ open: !this.state.open, title: "Task - " + solution.headline, activeXML: solution.xml });
    }
    
  };


  getRandomTutorials = (tutorials, n) => {
    var length = tutorials.length;
    var taken = new Array(length);
    var result = new Array(n);
    if (n > length)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * length);
        result[n] = tutorials[x in taken ? taken[x] : x];
        taken[x] = --length in taken ? taken[length] : length;
    }
    return result;
  }

    // toggleDialog = (solution) => {
    //     this.setState({ open: !this.state.open });
    //     // if (solution) {
    //     //     this.setState({ open: !this.state.open, activeSolution: solution });
    //     // } else {
    //     //     this.setState({ open: !this.state.open, activeSolution: null });
    //     // }
    // };

  render() {
    var step = this.props.step;
    var tutorials = this.state.tutorials;
    var randomtutorials = this.state.randomtutorials;
    // var randomtutorials = this.getRandomTutorials(tutorials, 3);
    // console.log(randomtutorials)
    return (
      <div>
        <Typography>
          <ReactMarkdown
            className={"tutorial"}
            linkTarget={"_blank"}
            skipHtml={false}
            allowDangerousHtml={true}
            remarkPlugins={[remarkGfm, remarkGemoji]}
          >
            {step.text}
          </ReactMarkdown>
        </Typography>
        {step.media ? (
          step.media.picture ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "5px",
              }}
            >
              <img
                src={`${process.env.REACT_APP_BLOCKLY_API}/media/${step.media.picture.path}`}
                alt=""
                style={{ maxHeight: "40vH", maxWidth: "100%" }}
              />
            </div>
          ) : step.media.youtube ? (
            /*16:9; width: 800px; height: width/16*9=450px*/
            <div style={{ maxWidth: "800px", margin: "auto" }}>
              <div
                style={{
                  position: "relative",
                  height: 0,
                  paddingBottom: "calc(100% / 16 * 9)",
                }}
              >
                <iframe
                  title={step.media.youtube}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    maxWidth: "800px",
                    height: "100%",
                    maxHeight: "450px",
                  }}
                  src={`https://www.youtube.com/embed/${step.media.youtube}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : null
        ) : null}
        {step.samplesolutions === true ? (
          <div>
            <h2 style={{ justifyContent: "center" }}>Musterlösungen</h2>
            <Grid
              container
              spacing={2}
              style={{ marginBottom: "5px", justifyContent: "space-evenly" }}
            >
              {step.solutions.map((solution) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    xl={3}
                    style={{ display: "flex", justifyContent: "center" }}
                    // onclick={this.toggleDialog(solution)}
                  >
                    <IconButton
                      onClick={() => this.toggleDialog(solution)}
                    >
                      <Paper
                        style={{
                          padding: "10px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <h3>{"Task - " + solution.headline}</h3>
                        <BlocklyWindow
                          svg
                          blockDisabled
                          initialXml={solution.xml}
                        />
                      </Paper>
                    </IconButton>
                  </Grid>
                );
              })}
            </Grid>

            <Dialog
              open={this.state.open}
              onClose={this.toggleDialog}
              onClick={this.toggleDialog}
              title={this.state.title}
              button={Blockly.Msg.button_close}
            >
              <BlocklyWindow
                svg
                blockDisabled
                initialXml={this.state.activeXML}
              />
            </Dialog>

          </div>
        ) : null}

        

        {step.furthertutorials === true ? (
          <div>
            <h2 style={{ justifyContent: "center" }}>Weitere Tutorials</h2>
            <Grid 
              container 
              spacing={2}
              style={{ justifyContent: "space-evenly" }}  
            >
              {randomtutorials.map((tutorial, i) => {
                var status = this.props.status.filter(
                  (status) => status._id === tutorial._id
                )[0];
                var tasks = status.tasks;
                var error =
                  status.tasks.filter((task) => task.type === "error").length > 0;
                var success =
                  status.tasks.filter((task) => task.type === "success").length /
                  tasks.length;
                var tutorialStatus =
                  success === 1 ? "Success" : error ? "Error" : "Other";
                const firstExample = {
                  size: 30,
                  value: tutorial.difficulty,
                  edit: false,
                  isHalf: true,
                };
                return (
                  <Grid item xs={12} sm={6} md={4} xl={3} key={i} style={{}}>
                    <Link
                      to={`/tutorial/${tutorial._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Paper
                        style={{
                          height: "150px",
                          padding: "10px",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {tutorial.title}
                        <ReactStars {...firstExample} />
                        <div
                          className={clsx(this.props.classes.outerDiv)}
                          style={{ width: "160px", height: "160px", border: 0 }}
                        >
                          <svg style={{ width: "100%", height: "100%" }}>
                            {error || success === 1 ? (
                              <circle
                                className={
                                  error
                                    ? this.props.classes.outerDivError
                                    : this.props.classes.outerDivSuccess
                                }
                                style={{
                                  transform: "rotate(-44deg)",
                                  transformOrigin: "50% 50%",
                                }}
                                r="75"
                                cx="50%"
                                cy="50%"
                                fill="none"
                                stroke-width="10"
                              ></circle>
                            ) : (
                              <circle
                                className={this.props.classes.outerDivOther}
                                style={{
                                  transform: "rotate(-44deg)",
                                  transformOrigin: "50% 50%",
                                }}
                                r="75"
                                cx="50%"
                                cy="50%"
                                fill="none"
                                stroke-width="10"
                                stroke-dashoffset={`${75 * 2 * Math.PI * (1 - (50 / 100 + success / 2))
                                  }`}
                                stroke-dasharray={`${75 * 2 * Math.PI * (1 - (50 / 100 - success / 2))
                                  } ${75 * 2 * Math.PI * (1 - (50 / 100 + success / 2))
                                  }`}
                              ></circle>
                            )}
                            {success < 1 && !error ? (
                              <circle
                                className={this.props.classes.outerDivSuccess}
                                style={{
                                  transform: "rotate(-44deg)",
                                  transformOrigin: "50% 50%",
                                }}
                                r="75"
                                cx="50%"
                                cy="50%"
                                fill="none"
                                stroke-width="10"
                                stroke-dashoffset={`${75 * 2 * Math.PI * (1 - (50 / 100 + success / 2))
                                  }`}
                                stroke-dasharray={`${75 * 2 * Math.PI}`}
                              ></circle>
                            ) : null}
                          </svg>
                        </div>
                        <div
                          className={clsx(
                            this.props.classes.outerDiv,
                            tutorialStatus === "Error"
                              ? this.props.classes.outerDivError
                              : tutorialStatus === "Success"
                                ? this.props.classes.outerDivSuccess
                                : null
                          )}
                        >
                          <div className={this.props.classes.innerDiv}>
                            {error || success === 1 ? (
                              <FontAwesomeIcon
                                size="4x"
                                icon={
                                  tutorialStatus === "Success" ? faCheck : faTimes
                                }
                              />
                            ) : (
                              <Typography
                                variant="h3"
                                className={
                                  success > 0
                                    ? this.props.classes.outerDivSuccess
                                    : {}
                                }
                              >
                                {Math.round(success * 100)}%
                              </Typography>
                            )}
                          </div>
                        </div>
                      </Paper>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : null}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tutorials: state.tutorial.tutorials,
  status: state.tutorial.status,
  isLoading: state.tutorial.progress,
  message: state.message,
  progress: state.auth.progress,
  user: state.auth.user,
  authProgress: state.auth.progress,
});

export default connect(mapStateToProps, {
  // getTutorials,
  // resetTutorial,
  // tutorialProgress,
  clearMessages,
})(withStyles(styles, { withTheme: true })(FinalPage));
