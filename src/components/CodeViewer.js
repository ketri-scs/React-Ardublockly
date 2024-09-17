import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import withStyles from '@mui/styles/withStyles';
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Card } from "@mui/material";
import * as Blockly from "blockly";
import { default as MonacoEditor } from "@monaco-editor/react";

// FIXME checkout https://mui.com/components/use-media-query/#migrating-from-withwidth
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;

const Accordion = withStyles((theme) => ({
  root: {
    border: `1px solid ${theme.palette.secondary.main}`,
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    borderBottom: `1px solid white`,
    marginBottom: "-1px",
    minHeight: "50px",
    "&$expanded": {
      minHeight: "50px",
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     code: this.props.arduino,
  //     changed: false,
  //     expanded: true,
  //     componentHeight: null,
  //   };
  //   this.myDiv = React.createRef();
  // }
  constructor(props) { // 2024.09.17 : SCS
    super(props);
    this.state = {
      expanded: 'arduino', // 'arduino', 'xml', 'python' 중 하나의 값
      componentHeight: null,
    };
    this.myDiv = React.createRef();
  }

  componentDidMount() {
    this.setState({ componentHeight: this.myDiv.current.offsetHeight + "px" });
  }

  // 2024.09.17 : SCS
  handleChange = (panel) => (event, isExpanded) => {
    this.setState({
      expanded: isExpanded ? panel : false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.arduino !== prevProps.arduino) {
    //   this.setState({ changed: true });

    //   console.log(`code changed: ${this.state.changed}`);
    //   if (this.state.changed && prevState.code !== this.props.arduino) {
    //     this.setState({ code: this.props.arduino });
    //     this.setState({ changed: false });
    //   }

    // if (this.state.code !== prevState.code && this.state.changed) {
    //   this.setState({ changed: false });
    // }

    // if (this.props.arduino !== this.state.code) {
    //   this.setState({ changed: true });
    //   //this.setState({ code: this.props.arduino });
    // }

    if (
      this.myDiv.current &&
      this.myDiv.current.offsetHeight + "px" !== this.state.componentHeight
    ) {
      this.setState({
        componentHeight: this.myDiv.current.offsetHeight + "px",
      });
    }
  }

  onChange = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    var curlyBrackets = "{ }";
    var unequal = "<>";
    return (
      <Card style={{ height: "100%", maxHeight: "60vH" }} ref={this.myDiv}>

        {/* Arduino 코드 아코디언 */}
        <Accordion
          // square={true}
          // style={{ margin: 0 }}
          // expanded={this.state.expanded}
          // onChange={this.onChange}
          square
          expanded={this.state.expanded === 'arduino'}
          onChange={this.handleChange('arduino')}
        >
          <AccordionSummary>
            <b style={{ fontSize: "20px", marginRight: "5px", width: "35px" }}>
              {curlyBrackets}
            </b>
            <div style={{ margin: "auto 5px 2px 0px" }}>
              {Blockly.Msg.codeviewer_arduino}
            </div>
          </AccordionSummary>
          <AccordionDetails
            style={{
              padding: 0,
              height: `calc(${this.state.componentHeight} - 50px - 50px)`,
              backgroundColor: "white",
            }}
          >
            <MonacoEditor
              height="80vh"
              defaultLanguage="cpp"
              value={this.props.arduino}
              // modified={this.props.arduino}
              // original={this.state.code}
              options={{
                readOnly: true,

                fontSize: "16px",
              }}
            />
          </AccordionDetails>
        </Accordion>

         {/* Python 코드 아코디언 */}
         <Accordion
          square
          expanded={this.state.expanded === 'python'}
          onChange={this.handleChange('python')}
        >
          <AccordionSummary>
            <b style={{ fontSize: "20px", marginRight: "5px", width: "35px" }}>
              { "{ }" }
            </b>
            <div style={{ margin: "auto 5px 2px 0px" }}>
              Python
            </div>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0, backgroundColor: "white" }}>
            <MonacoEditor
              height="80vh"
              defaultLanguage="python"
              value={this.props.python}
              options={{
                readOnly: true,
                fontSize: "16px",
              }}
            />
          </AccordionDetails>
        </Accordion>
        

         {/* XML 코드 아코디언 */}
        <Accordion
          // square={true}
          // style={{ margin: 0 }}
          // expanded={!this.state.expanded}
          // onChange={this.onChange}
          square
          expanded={this.state.expanded === 'xml'}
          onChange={this.handleChange('xml')}
        >
          <AccordionSummary>
            <b style={{ fontSize: "20px", marginRight: "5px", width: "35px" }}>
              {unequal}
            </b>
            <div style={{ margin: "auto 5px 2px 0px" }}>
              {Blockly.Msg.codeviewer_xml}
            </div>
          </AccordionSummary>
          <AccordionDetails
            style={{
              padding: 0,
              height: `calc(${this.state.componentHeight} - 50px - 50px)`,
              backgroundColor: "white",
            }}
          >
            <MonacoEditor
              height="80vh"
              defaultLanguage="xml"
              value={this.props.xml}
              readOnly={true}
            />
          </AccordionDetails>
        </Accordion>

       
        
      </Card>
    );
  }
}

CodeViewer.propTypes = {
  arduino: PropTypes.string.isRequired,
  xml: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  python: PropTypes.string.isRequired, // 2024.09.17 : SCS
};

const mapStateToProps = (state) => ({
  arduino: state.workspace.code.arduino,
  xml: state.workspace.code.xml,
  tooltip: state.workspace.code.tooltip,
  python: state.workspace.code.python, // 2024.09.17 : SCS
});

export default connect(mapStateToProps, null)(withWidth()(CodeViewer));
