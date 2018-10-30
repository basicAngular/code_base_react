import React from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = {
  root: {
    color: green[600],
    "&$checked": {
      color: green[500],
    },
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
  font: {
    fontSize: 14,
  }
};

class MobxFormCheckBox extends React.Component {

  static propTypes = {
    field: PropTypes.object,
    change: PropTypes.func,
    classes: PropTypes.object
  }

  state = {
    checked: false
  }

  componentDidMount() {
    const { field } = this.props;
    const checked = field.$value;
    if(checked){
      this.setState({ checked: true });
    }
    else{
      this.setState({ checked: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { field } = this.props;
    const checked = field.$value;
    if(checked){
      this.setState({ checked: true });
    }
    else{
      this.setState({ checked: false });
    }
  }

  handleChange() {
    const { field, change } = this.props;
    const { checked } = this.state;
    this.setState({ checked: !checked },() => {
      field.$value = !checked;
      change(field.name, field.$value);
    });
  }

  render() {
    const { field, classes } = this.props;
    return (
      <div>
        <FormControlLabel
          label={field.label}
          classes={{
            label: classes.font,
          }}
          control={
            <Checkbox
              checked={this.state.checked}
              onChange={() => this.handleChange()}
              value="checkedG"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
        />
        <small
          id="name-desc"
          className="f6 db mt1 mb3 red"
        >
          {field.error}
        </small>
      </div>
    );
  }
}

export default withStyles(styles)(MobxFormCheckBox);