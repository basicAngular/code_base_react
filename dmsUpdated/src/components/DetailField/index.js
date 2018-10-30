import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const DetailField = props => (
    <div className={props.col}>
        <label className="detail">{props.label}</label>
        <p>{props.children}</p>
    </div>
);

DetailField.propTypes = {
    col: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.number
      ]) 
}

export default DetailField;