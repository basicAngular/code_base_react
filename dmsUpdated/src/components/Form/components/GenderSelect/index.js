import React from "react";
import SelectList from "react-widgets/lib/SelectList";

const genders = [
    { id: 1, name: "männlich" },
    { id: 2, name: "webilich" },
];

export const GenderSelect = ({ input, ...rest }) =>
    <SelectList
        {...input} onBlur={() => input.onBlur()}
        valueField="id" textField="name"
        data={genders}
        {...rest}
    />;
