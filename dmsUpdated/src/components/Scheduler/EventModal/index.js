import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import MobxReactForm from "mobx-react-form";
import { FormattedMessage, injectIntl } from "react-intl";
import { fields, plugins } from "../EventForm";
import Event from "../Event";
import messages from "./messages";

const EventModal = ({
  show,
  intl,
  onHide,
  updateId,
  getEvent,
  isUpdate,
  addEvent,
  updateEvent,
  deleteEvent
}) => {
  const hooks = {
      onSuccess(form) {
        const values = form.values();
        if(isUpdate) {
          values.id = updateId;
          updateEvent(values);
        } else {
          addEvent(values);
        }
        onHide();
      },
      onError(form) {
        // toast.error("Form has errors!");
        // get all form errors
      }
  }
  Object.keys(messages).map(
    key => {
      if (fields[key] !== undefined) {
        fields[key].label = intl.formatMessage({...messages[key]});
      }
    }
  );
  if(isUpdate) {
    let fieldsFromStore = getEvent(updateId);
    Object.keys(fieldsFromStore).map(
      key =>
        fields[key] !== undefined
          ? (fields[key].value = fieldsFromStore[key])
          : ""
    );
  }
  const form = new MobxReactForm({ fields }, { plugins, hooks });
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage {...messages.eventTitle} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Event
            form={form}
            onHide={onHide}
            updateId={updateId}
            isUpdate={isUpdate}
            deleteEvent={deleteEvent}
          />
      </Modal.Body>
    </Modal>
  );
}

export default injectIntl(EventModal);

EventModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  updateId: PropTypes.number,
  getEvent: PropTypes.func,
  isUpdate: PropTypes.bool,
  addEvent: PropTypes.func,
  updateEvent: PropTypes.func,
  deleteEvent: PropTypes.func
}