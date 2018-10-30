import React from "react";
import PropTypes from "prop-types";
import Wave from "./components/Wave";
import RotatingPlane from "./components/RotatingPlane";
import DoubleBounce from "./components/DoubleBounce";
import { randomInt } from "utils/helpers";
import "./style.scss";

class LoadingSpinner extends React.Component {
    
    static propTypes = {
        spinner: PropTypes.string
    }

    defaultProps = {
        random: true
    }

    spinners = {
        "wave": Wave,
        "bounce": DoubleBounce,
        "plane": RotatingPlane,
    }

    render() {
        if (this.props.spinner) {
            const Spinner = this.spinners[this.props.spinner];
            return <div><Spinner /></div>;     
        }

        const randomIdx = randomInt(1, Object.keys(this.spinners).length);
        const Spinner = this.spinners[Object.keys(this.spinners)[randomIdx - 1]];
        return <div><Spinner /></div>;    
    
        
    }
}

export default LoadingSpinner;
