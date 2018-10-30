import React from "react";
import PropTypes from "prop-types";
//import classNames from "classnames";
import { observer } from "mobx-react";
import messages from "./messages";
import { FormattedMessage } from "react-intl";
import { Row, Button } from "react-bootstrap";
import ServiceModal from "./components/ServiceModal";
import ServiceTable from "./components/ServiceTable";
import PDFModal from "../FileExplorer/components/PDFModal";

@observer
class Services extends React.Component {
    static propTypes = {
        services: PropTypes.array,
        documents: PropTypes.array,
        getService: PropTypes.func,
        addService: PropTypes.func,
        searchFiles: PropTypes.func,
        deleteService: PropTypes.func,
        updateService: PropTypes.func
    }
    constructor (props) {
        super(props);
        this.state = {
            updateId: null,
            showModal: false,
            updateModal: false,
            viewDocument: false,
            viewDocumentObj: null
        }
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showUpdate = this.showUpdate.bind(this);
        this.handleViewDocument = this.handleViewDocument.bind(this);
        this.handleHideDocument = this.handleHideDocument.bind(this);
    }
    showModal() {
        this.setState({ ...this.state, showModal: true });
    }
    closeModal() {
        this.setState({ ...this.state, showModal: false, updateModal: false, updateId: null });
    }
    showUpdate(id) {
        this.setState({ ...this.state, showModal: true, updateModal: true, updateId: id });
    }
    handleViewDocument(document) {
        this.setState({
            viewDocument: true,
            viewDocumentObj: document
        });
    }
    handleHideDocument() {
        this.setState({
            viewDocument: false,
            viewDocumentObj: null
        });
    }
    render() {
        const { showModal, updateModal, updateId, viewDocument, viewDocumentObj } = this.state;
        const { services, getService, addService, updateService, deleteService, documents, searchFiles } = this.props;

        return (
            <div>
                <ServiceModal
                    show={showModal}
                    updateId={updateId}
                    documents={documents}
                    isUpdate={updateModal}
                    getService={getService}
                    addService={addService}
                    searchFiles={searchFiles}
                    updateService={updateService}
                    onHide={() => this.closeModal()}
                />
                <Row>
                    <Button className="btn-primary" onClick={this.showModal}>
                        <FormattedMessage {...messages.serviceAdd} />
                    </Button>
                </Row>
                <Row>
                    <ServiceTable
                        fields={services}
                        showUpdate={this.showUpdate}
                        deleteService={deleteService}
                        updateService={this.updateServiceModal}
                        handleHideDocument={this.handleHideDocument}
                        handleViewDocument={this.handleViewDocument}
                    />
                </Row>
                {viewDocument &&
                    <PDFModal
                        show={viewDocument}
                        document={viewDocumentObj}
                        onHide={this.handleHideDocument}
                    />
                }
            </div>
        );
    }
}

export default Services;
