import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeContent } from "../../../actions/tutorialBuilderActions";

import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = (theme) => ({
  errorColor: {
    color: theme.palette.error.dark,
  },
  errorBorder: {
    border: `1px solid ${theme.palette.error.dark}`,
  },
  errorButton: {
    marginTop: "5px",
    height: "40px",
    backgroundColor: theme.palette.error.dark,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
});

class FinalPageOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedSampleSolutions: props.checkedSampleSolutions,
      checkedFurtherTutorials: props.checkedFurtherTutorials,
    };
  }

  onChangeSampleSolutions = (value) => {
    var oldValue = this.state.checked;
    this.setState({ checked: value });
    if (oldValue !== value) {
      this.props.changeContent(value, this.props.index, "samplesolutions");
    }
  };

  onChangeFurtherTutorials = (value) => {
    var oldValue = this.state.checked;
    this.setState({ checked: value });
    if (oldValue !== value) {
      this.props.changeContent(value, this.props.index, "furthertutorials");
    }
  }

  render() {
    var steps = this.props.steps;
    return (
      <div
        style={{
          marginBottom: "10px",
          padding: "18.5px 14px",
          borderRadius: "25px",
          border: "1px solid lightgrey",
          width: "calc(100% - 28px)",
        }}
      >
        <FormGroup>
          <FormControlLabel
            labelPlacement="end"
            label={
              "Musterlösung(en) der Aufgabe(n) auf der Abschlussseite anzeigen"
            }
            control={
              <Switch
                checked={this.state.checked}
                onChange={(e) => this.onChangeSampleSolutions(e.target.checked)}
                color="primary"
              />
            }
          />
          <FormControlLabel
            labelPlacement="end"
            label={
              "Vorschläge für weitere Tutorials auf der Abschlussseite anzeigen"
            }
            control={
              <Switch
                checked={this.state.checked}
                onChange={(e) => this.onChangeFurtherTutorials(e.target.checked)}
                color="primary"
              />
            }
          />
        </FormGroup>
      </div>
    );
  }
}

FinalPageOptions.propTypes = {
  changeContent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
  changeContent,
})(withStyles(styles, { withTheme: true })(FinalPageOptions));
