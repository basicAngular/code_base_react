import React from "react";
import PropTypes from "prop-types";

const ToolTip = ({ name, data }) => {
    const toolTipClass = `tooltip tooltip-${name}`;
    const iconClass = "fa fa-exclamation-triangle";
    const wrapperClass = `show-${name}`;
    return (
        <span className={wrapperClass}>
            <i className={iconClass} aria-hidden="true"></i>
            <ul className={toolTipClass}>
                <div className="tooltip-list">
                    <p className="text-center">{name}</p>
                    {data.map((item, i) => {
                        return (
                            <li className="tooltip-item" key={i}>{item}</li>
                        );
                    })}
                </div>
            </ul>
        </span>
    );
};

export default ToolTip;

ToolTip.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string
}