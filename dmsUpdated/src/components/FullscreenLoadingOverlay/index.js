import React from "react";
import PropTypes from "prop-types";
import "./style.scss";


class FullscreenLoadingOverlay extends React.Component {
    static defaultProps = {
        text: ""
    }

    static propTypes = {
        text: PropTypes.string
    }

    state = {
        text: this.props.text
    }

    render() {
        const overlayStyle = "overlay";
        return (
            <div styleName={overlayStyle}>
                <div styleName="loader">
                    <div className="sk-spinner sk-spinner-wave" styleName="spinner-wave-margin-correction big-spinner">
                        <div className="sk-rect1"></div>
                        <div className="sk-rect2"></div>
                        <div className="sk-rect3"></div>
                        <div className="sk-rect4"></div>
                        <div className="sk-rect5"></div>
                    </div>
                    <h1 className="text-center">
                        {this.state.text}
                    </h1>
                </div>
            </div>
        );
    }
}

export default FullscreenLoadingOverlay;
