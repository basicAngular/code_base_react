import React from "react";
import moment from "moment";
import { observer } from "mobx-react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";

const DatePicker = observer(({ field, change, className = "col-lg-12" }) => {
  
  const value = new Date(field.$value);
  
  let setTime =false;
  
  if(field.$label==="Start date" || field.$label==="End date"){
    setTime=true;
  }
  else{
    setTime=false;
  }
  return (
    <div
      className={"form-group " + className + (field.error ? " has-error" : "")}
    >
      <label className="control-label" htmlFor={field.id}>
        {field.label}
      </label>
      <DateTimePicker
        id={field.id}
        value={value}
        defaultValue={new Date()}
        onChange={value => {
          const formatedDate = moment(value).format('YYYY-MM-DD');
          change(field.key, formatedDate);          
        }}
        time={setTime}
      />
    </div>
  );
});

export default DatePicker;