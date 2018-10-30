import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import PDFViewer from "../PDFViewer";
import messages from "./messages.js";

const PDFModal = ({ show, onHide, document }) => (
  <Modal show={show} bsSize="large" onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{document.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <PDFViewer doc={document} />
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>
        <FormattedMessage {...messages.hide}  />
        
      </Button>
    </Modal.Footer>
  </Modal>
);

export default PDFModal;

PDFModal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  document: PropTypes.array
}