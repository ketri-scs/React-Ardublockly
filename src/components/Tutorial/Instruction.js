import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Hardware from './Hardware';
import Requirement from './Requirement';
import BlocklyWindow from '../Blockly/BlocklyWindow';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class Instruction extends Component {

  render() {
    var step = this.props.step;
    var isHardware = step.hardware && step.hardware.length > 0;
    var areRequirements = step.requirements && step.requirements.length > 0;
    return (
      <div>
        <Typography variant='h4' style={{marginBottom: '5px'}}>{step.headline}</Typography>
        <Typography style={isHardware ? {} : {marginBottom: '5px'}}>{step.text}</Typography>
        {isHardware ?
          <Hardware picture={step.hardware}/> : null}
        {areRequirements > 0 ?
          <Requirement tutorialIds={step.requirements}/> : null}
        {step.media ?
          step.media.picture ?
            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '5px'}}>
              <img src={`/media/tutorial/${step.media.picture}`} alt='' style={{maxWidth: '100%'}}/>
            </div>
          : step.media.youtube ?
            <div style={{position: 'relative', paddingBottom: '56.25%', height: 0}}>
              <iframe title={step.media.youtube} style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}} src={`https://www.youtube.com/embed/${step.media.youtube}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          : null
        : null}
        {step.xml ?
        <Grid container spacing={2} style={{marginBottom: '5px'}}>
          <Grid item xs={12}>
            <BlocklyWindow
              svg
              blockDisabled
              initialXml={step.xml}
            />
          </Grid>
        </Grid>
        : null }
      </div>
    );
  };
}

Instruction.propTypes = {
  currentTutorialId: PropTypes.number,
};

const mapStateToProps = state => ({
  currentTutorialId: state.tutorial.currentId
});

export default connect(mapStateToProps, null)(Instruction);
