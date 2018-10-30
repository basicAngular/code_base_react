import React from "react";
import { FormInput } from "react-form";


export default ({field, label, inRow, col, ...rest}) => {
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
    // return (
    //     <FormInput field={field}>
    //       {({ setValue, getValue, setTouched }) => {
    //           return (
    //           <input
    //             value={getValue()} // Set the value to the forms value
    //             onChange={val => setValue(val)} // On Change, update the form value
    //             onBlur={() => setTouched()} // And the same goes for touched
    //           />
    //           );
    //       }}
    //     </FormInput>
    // );
    if (inRow)
        return (<div className="row">{renderedField}</div>);
    else
        return renderedField;
};
