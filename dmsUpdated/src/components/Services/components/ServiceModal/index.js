import React from "react";
import PropTypes from "prop-types";
//import toast from "react-toastify";
import { Modal } from "react-bootstrap";
import MobxReactForm from "mobx-react-form";
import { FormattedMessage, injectIntl, } from "react-intl";
import { fields, plugins } from "../ServiceForm";
import Service from "../Service";
import messages from "./messages.js";

const ServiceModal = ({
  intl,
  show,
  onHide,
  documents,
  getService,
  addService,
  searchFiles,
  updateService, 
  updateId = null,
  isUpdate = false,
}) => {
  const hooks = {
    onSuccess(form) {
      const values = form.values();
      delete values.connect_document_form;
      delete values.automatic_extension_form;
      if(isUpdate) {
        values.id = updateId;
        updateService(values);
      } else {
        addService(values);
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
    let fieldsFromStore = getService(updateId);
    Object.keys(fieldsFromStore).map(
      (key) => {
        if (fields[key] !== undefined) {
          fields[key].value = fieldsFromStore[key];
        }
      }
    );
  }
  const form = new MobxReactForm({ fields }, { plugins, hooks });
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
            <FormattedMessage {...messages.serviceTitle} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Service form={form} documents={documents} searchFiles={searchFiles} />
      </Modal.Body>
    </Modal>
  );
}

export default injectIntl(ServiceModal);

ServiceModal.propTypes = {
  show: PropTypes.bool,
  files: PropTypes.array,
  onHide: PropTypes.func,
  folders: PropTypes.array,
  isUpdate: PropTypes.bool,
  documents: PropTypes.array,
  updateId: PropTypes.number,
  getService: PropTypes.func,
  addService: PropTypes.func,
  searchFiles: PropTypes.func,
  updateService: PropTypes.func,
}