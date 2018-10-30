import React from "react";
import { FormInput } from "react-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

export const TextInput = ({field, label, inRow, col, ...rest}) => {
    const renderedField = (
        <div className={"form-group"+(col ? " "+col : "")}>
            <label className="control-label">{label}</label>
            <div>
                <FormInput field={field}>
                    {({ setValue, getValue, setTouched }) => {
                        return (
                            <input
                                className="form-control"
                                {...rest} // Send the rest of your props to React-Select
                                value={getValue()} // Set the value to the forms value
                                onChange={val => setValue(val)} // On Change, update the form value
                                onBlur={() => setTouched()} // And the same goes for touched
                            />
                        );
                    }}
                </FormInput>
            </div>
        </div>
    );
    if (inRow)
        return (<div className="row">{renderedField}</div>);
    else
        return renderedField;
};

export const DateTimePickerInput = ({field, label, inRow, col, showTime, ...rest}) => {
    const renderedField = (
        <div className={"form-group"+(col ? " "+col : "")}>
            <label className="control-label">{label}</label>
            <div>
                <FormInput field={field}>
                    {({ setValue, getValue, setTouched }) => {
                        return (
                            <DateTimePicker
                                onChange={val => setValue(val)}
                                format="DD.MM.YYYY"
                                time={showTime}
                                onBlur={() => setTouched()}
                                value={(getValue() && new Date(getValue())) || null}
                            />
                        );
                    }}
                </FormInput>
            </div>
        </div>
    );
    if (inRow)
        return (<div className="row">{renderedField}</div>);
    else
        return renderedField;
};
