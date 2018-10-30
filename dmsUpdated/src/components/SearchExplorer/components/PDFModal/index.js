import PDFViewer from "components/PDFViewer";
import React from "react";
import { Modal, Button } from "react-bootstrap";


export default ({show, onHide, pdf, fileName}) => 
    <Modal show={show} bsSize="large" onHide={onHide}>
        <Modal.Header closeButton>
        <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <PDFViewer pdf={pdf} />
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Schließen</Button>
        </Modal.Footer>
    </Modal>;