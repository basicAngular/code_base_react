import React from "react";
import PropTypes from "prop-types";

class RadioButtonGroup extends React.Component {
    static propTypes = {
        buttons: PropTypes.array.isRequired,
    }

    state = {
        buttons: this.props.buttons,
        active: 0,
    }

    constructor(props) {
        super(props);

        this.buttonOnClick = this.buttonOnClick.bind(this);
    }

    buttonOnClick(key) {
        if (this.state.active === key)
            return;

        this.setState({...this.state, active: key});
        this.state.buttons[key].onClick();
    }

    renderButton(button, key) {
        return (
            <button key={key} className={"btn btn-white" + (key === this.state.active ? " active" : "")} onClick={() => this.buttonOnClick(key)} type="button">
                {((key === this.state.active) && button.value_active) ? button.value_active : button.value}
            </button>
        );
    }

    render() {
        return (
            <div className="btn-group">
                {this.state.buttons.map(this.renderButton.bind(this))}
            </div>
        );
    }
}

export default RadioButtonGroup;
