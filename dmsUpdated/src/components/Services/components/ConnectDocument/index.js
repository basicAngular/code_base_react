import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { injectIntl } from "react-intl";
import { Row, Col } from "react-bootstrap";
import MobxReactForm from "mobx-react-form";
import DocumentsList from "./components/DocumentsList";
import MobxFormInput from "../../../Form/components/MobxFormInput";
import PDFViewer from "./../../../FileExplorer/components/PDFViewer";
import messages from "./messages";
import validatorjs from 'validatorjs';

const plugins = {
    dvr: validatorjs
};
const fields = {
    searchDocument: {
        label: '',
        placeholder: 'Name of the document',
        value:''
    }
};
const hooks = {
    onSubmit(form) {
    },
    onError(form) {
      alert("Form has errors!");
    }
};
const form = new MobxReactForm({ fields }, { plugins, hooks });

@observer
class Services extends React.Component {
    static propTypes = {
        folders: PropTypes.array,
        documents: PropTypes.array,
        searchFiles: PropTypes.func,
        updateProperty: PropTypes.func,
        handleConnectedDocuments: PropTypes.func
    }

    state = {
        selectedFileId: null,
        selectedFileName: "",
        viewDocument: false,
        viewDocumentId: null
    }

    handleSelectFile(id) {
        const { documents, updateProperty, handleDocument } = this.props;
        const document = documents.find(document => document.id === id);
        const name = document.name;
        const contractDocumentField = "contract_document";
        const connectDocumentForm = "connect_document_form";
        const connectDocumentName = "connect_document_name";
        this.setState({ selectedFile: id, selectedFileName: name }, () => {
            updateProperty(contractDocumentField, id);
            handleDocument(connectDocumentForm, false);
            handleDocument(connectDocumentName, name);
        });
    }

    handleSearch(event) {
        const { searchFiles } = this.props;
        const fileName = event.target.value;
        form.$("searchDocument").value = fileName;
        searchFiles(fileName);
    }

    handleViewDocument(id) {
        this.setState({
            viewDocument: true,
            viewDocumentId: id
        });
    }

    handleHideDocument() {
        this.setState({
            viewDocument: false,
            viewDocumentId: null
        });
    }

    render() {
        const { selectedFileId, viewDocument, viewDocumentId } = this.state;
        const { documents, handleConnectedDocuments } = this.props;
        const iconStyle = {fontSize: "20px", marginTop: "30px", cursor: "pointer"};
        let document;

        if(viewDocument) {
            document = documents.find(document => document.id === viewDocumentId);
        }

        const text = this.props.intl.formatMessage({...messages.searchDocument});
        form.$("searchDocument").set("label", text);
        form.$("searchDocument").set("placeholder", text);

        Object.keys(messages).map(
            key => {
                if (fields[key] !== undefined) {
                    fields[key].label = this.props.intl.formatMessage({...messages[key]});
                }
            }
        );

        return (
            <div>
                {!viewDocument ? (
                    <div>
                        <Row>
                            <Col lg={11}>
                                <MobxFormInput field={form.$("searchDocument")} change={this.handleSearch.bind(this)} />
                            </Col>
                            <Col lg={1}>
                                <i className="fa fa-times-circle-o" onClick={() => handleConnectedDocuments()} style={iconStyle} />
                            </Col>
                        </Row>
                        <Row>
                            <DocumentsList
                                documents={documents}
                                selectedFileId={selectedFileId}
                                handleSelectFile={this.handleSelectFile.bind(this)}
                                handleViewDocument={this.handleViewDocument.bind(this)}
                            />
                        </Row>
                    </div>
                ) : (
                    <div>
                        <i className="fa fa-times-circle-o" onClick={this.handleHideDocument.bind(this)} />
                        <PDFViewer doc={document} />
                    </div>
                )}
            </div>
        );
    }
}

export default injectIntl(Services);
