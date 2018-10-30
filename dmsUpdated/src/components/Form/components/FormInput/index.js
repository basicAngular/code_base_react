import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";

export default ({ change, field, edit = true, type = "text", placeholder = null, showField = true, label = "", error = false }) => (
    <FormGroup validationState={error?"error":null}>
      <ControlLabel>{label}</ControlLabel>
      {edit &&
        <FormControl value={field} onChange={e => change(e)} />
      }
      {(!edit && showField) && 
        <FormControl value={field} disabled={true} />
      }
      <FormControl.Feedback />
      <HelpBlock>{error}</HelpBlock>
    </FormGroup>
);