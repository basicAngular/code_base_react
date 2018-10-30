import React from "react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import SelectList from "react-widgets/lib/SelectList";
import DropdownList from "react-widgets/lib/DropdownList";
import PropTypes from "prop-types";

export const dateTimePicker = ({ input: { onChange, value }, meta: { touched, error }, showTime }) => {
    return (
        <div>
            <DateTimePicker
                onChange={onChange}
                format="DD.MM.YYYY"
                time={showTime}
                value={(value && new Date(value)) || null}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );

};

dateTimePicker.propTypes = {
    input: PropTypes.object,
    showTime: PropTypes.bool,
};

export const dropdownList = ({ input, meta: { touched, error }, ...rest }) => {
    const {valueField, textField} = rest;
    function handleChange(item) {
        let value = item;
        if(textField) {
            value = item[valueField];
        }

        input.onChange(value);
    }
    return (<div><DropdownList {...input} {...rest} onChange={handleChange}/>{error && <span className="error">{error}</span>}</div>);
};



export const selectList = ({ input, meta: { touched, error },...rest }) =>
    <div><SelectList {...input} onBlur={() => input.onBlur()} {...rest}/>{error && <span className="error">{error}</span>}</div>;

selectList.propTypes = {
    input: PropTypes.object,
    rest: PropTypes.object,
    meta: PropTypes.object,
};
