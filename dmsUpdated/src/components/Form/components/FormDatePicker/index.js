import React from "react";
import moment from "moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

const DatePicker = ({ id = "datepicker", className = "col-lg-12", field, label, change }) => {
  const value = new Date(field);
  return (
    <div className="form-group">
      <label className="control-label" htmlFor={id}>
        {label}
      </label>
      <DateTimePicker
        id={id}
        time={false}
        value={value}
        defaultValue={new Date()}
        onChange={value => {
          const formatedDate = moment(value).format('YYYY-MM-DD');
          change(id, formatedDate);         
        }}
      />
    </div>
  );
};

export default DatePicker;