import React from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";
import { observer } from "mobx-react";
export default observer(({ change, field, edit = true, type = "text", placeholder = null, showField = true }) => (
    <FormGroup validationState={field.error?"error":null}>
      <ControlLabel>{field.label}</ControlLabel>
      {edit &&
        <FormControl {...field.bind()} onChange={e => change(e)} />
      }
      {(!edit && showField) && 
        <FormControl {...field.bind()} disabled={true} />
      }
      {(field.type === "password" && !edit) && 
        <FormControl {...field.bind()} disabled={true} value={field.type} onChange={e => change(e)} />
      }
      <FormControl.Feedback />
      <HelpBlock>{field.error}</HelpBlock>
    </FormGroup>
));