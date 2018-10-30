import React from "react";
import PropTypes from "prop-types";
import "./style.scss";


class LoadingOverlay extends React.Component {
    static defaultProps = {
        isLoading: false
    }

    static propTypes = {
        isLoading: PropTypes.bool
    }

    state = {
        isLoading: this.props.isLoading
    }

    render() {
        const overlayStyle = "overlay" + (this.state.isLoading ? " is-loading" : "");
        return (
            <div styleName="wrapper">
                <div styleName={overlayStyle}>
                    <div styleName="loader">
                        <div className="sk-spinner sk-spinner-wave" styleName="spinner-wave-margin-correction">
                            <div className="sk-rect1"></div>
                            <div className="sk-rect2"></div>
                            <div className="sk-rect3"></div>
                            <div className="sk-rect4"></div>
                            <div className="sk-rect5"></div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default LoadingOverlay;
