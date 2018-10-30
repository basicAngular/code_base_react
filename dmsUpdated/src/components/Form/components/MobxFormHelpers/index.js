import React from "react";
import { observer } from "mobx-react";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import MaskedInput from "react-maskedinput";

export const DefaultInput = observer(({field, className = "col-lg-12", nolabel}) => (
    <div className={"form-group " + className + (field.error ? " has-error" : "") }>
        {!nolabel && <label className="control-label" htmlFor={field.id}>{field.label}</label>}
        <input {...field.bind()} className={"form-control"} />
        {field.error && <span className="help-block m-b-none">{field.error}</span>}
    </div>
));

export const DefaultMaskedInput = observer(({field, className = "col-lg-12", nolabel, mask, size}) => (
    <div className={"form-group " + className + (field.error ? " has-error" : "") }>
        {!nolabel && <label className="control-label" htmlFor={field.id}>{field.label}</label>}
        <MaskedInput {...field.bind()} mask={mask} size={size} className={"form-control"} />
        {field.error && <span className="help-block m-b-none">{field.error}</span>}
    </div>
));

export const DefaultTextArea = observer(({field, className = "col-lg-12", nolabel, rows}) => (
    <div className={"form-group " + className + (field.error ? " has-error" : "") }>
        {!nolabel && <label className="control-label" htmlFor={field.id}>{field.label}</label>}
        <textarea {...field.bind()} className={"form-control"} rows={rows} />
        {field.error && <span className="help-block m-b-none">{field.error}</span>}
    </div>
));

export const DatePicker = observer(({ field, className = "col-lg-12" }) => {
    return (
    <div className={"form-group " + className + (field.error ? " has-error" : "") }>
        <label className="control-label" htmlFor={field.id}>{field.label}</label>
         <DateTimePicker
            id={field.id}
            value={field.value}
            onChange={field.sync}
            time={false}
        />
    </div>
    );});

export const DefaultSelect = observer(({ field, className = "col-lg-12" }) => (
    <div className={"form-group " + className + (field.error ? " has-error" : "") }>    
        <label className="control-label" htmlFor={field.id}>{field.label}</label>        
        <select className="form-control"  {...field.bind()}>
            <option key="none" value="">Bitte auswählen</option>
        {field.extra.map(el =>
            <option key={el.value} value={el.value}>{el.label}</option>)}
        </select>
    </div>
  ));

export const DefaultCheckbox = observer(({ field, className = "col-lg-12" }) => (
    <div className={"form-group " + className + (field.error ? " has-error" : "") }>    
        <div className="checkbox ">
            <label htmlFor={field.id}>
            <input type="checkbox"  {...field.bind()} />            
            {field.label}
            </label>
        </div>
    </div>
  ));

export const DefaultHidden = observer(({ field }) => (
    <input  {...field.bind()} type="hidden" />
  ));