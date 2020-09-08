import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Card } from '@material-ui/core';


const Accordion = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.secondary.main}`,
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid white`,
    marginBottom: -1,
    minHeight: 50,
    '&$expanded': {
      minHeight: 50,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);


class CodeViewer extends Component {

  state = {
    expanded: true
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate() {
    Prism.highlightAll();
  }

  onChange = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    var curlyBrackets = '{ }';
    var unequal = '<>';
    return (
      <Card style={{height: '100%', maxHeight: '500px'}}>
        <Accordion
          square={true}
          style={{margin: 0}}
          expanded={this.state.expanded}
          onChange={this.onChange}
        >
          <AccordionSummary>
            <b style={{fontSize: '20px', marginRight: '5px', width: '35px'}}>{curlyBrackets}</b>
            <div style={{margin: 'auto 5px 2px 0px'}}>Arduino Quellcode</div>
          </AccordionSummary>
          <AccordionDetails style={{padding: 0, height: 'calc(500px - 50px - 50px)', backgroundColor: 'white'}}>
            <pre className="line-numbers" style={{paddingBottom: 0, width: '100%', overflow: 'auto', scrollbarWidth: 'thin', height: 'calc(100% - 30px)', margin: '15px 0', paddingTop: 0, whiteSpace: 'pre-wrap', backgroundColor: 'white'}}>
              <code className="language-clike">
                {this.props.arduino}
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>
        <Accordion
          square={true}
          style={{margin: 0}}
          expanded={!this.state.expanded}
          onChange={this.onChange}
        >
          <AccordionSummary>
            <b style={{fontSize: '20px', marginRight: '5px', width: '35px'}}>{unequal}</b>
            <div style={{margin: 'auto 5px 2px 0px'}}>XML Blöcke</div>
          </AccordionSummary>
          <AccordionDetails style={{padding: 0, height: 'calc(500px - 50px - 50px)', backgroundColor: 'white'}}>
            <pre className="line-numbers" style={{paddingBottom: 0, width: '100%', overflow: 'auto', scrollbarWidth: 'thin', height: 'calc(100% - 30px)', margin: '15px 0', paddingTop: 0, whiteSpace: 'pre-wrap', backgroundColor: 'white'}}>
              <code className="language-xml">
                {`${this.props.xml}`}
              </code>
            </pre>
          </AccordionDetails>
        </Accordion>
      </Card>
    );
  };
}

CodeViewer.propTypes = {
  arduino: PropTypes.string.isRequired,
  xml: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  arduino: state.workspace.code.arduino,
  xml: state.workspace.code.xml
});

export default connect(mapStateToProps, null)(CodeViewer);
