import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import { Multiselect } from "react-widgets";

export default ({ change, field, list, label = "", id="form-select", error = false }) => (
    <FormGroup validationState={error?"error":null}>
      <ControlLabel>{label}</ControlLabel>
        <Multiselect
            id={id}
            data={list}
            value={field}
            onChange={value => change(value)}
        />
      <FormControl.Feedback />
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
);