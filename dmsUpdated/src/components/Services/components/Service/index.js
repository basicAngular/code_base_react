import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import messages from "./messages";
import { FormattedMessage, injectIntl } from "react-intl";
import { Row, Col, Button } from "react-bootstrap";
import ConnectDocument from "../ConnectDocument";
import CancelationDate from "../CancelationDate";
import AutomaticDate from "../AutomaticDate";
import FormInput from "../../../Form/components/FormInput";
import MobxFormInput from "../../../Form/components/MobxFormInput";
import MobxFormCheckbox from "../../../Form/components/MobxFormCheckbox";
import MobxFormTextArea from "../../../Form/components/MobxFormTextArea";
import MobxFormDatePicker from "../../../Form/components/MobxFormDatePicker";

const connectDocsButton = { marginTop: "22px", width: "100%" };

const initialState = {
    connect_document_name: "",
    connect_document_form: false,
    automatic_extension_form: false,
};

@observer
class Services extends React.Component {
    static propTypes = {
        form: PropTypes.object,
        files: PropTypes.array,
        folders: PropTypes.array,
        documents: PropTypes.array
    }
    constructor (props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.handleConnectedDocuments = this.handleConnectedDocuments.bind(this);
    }
    updateProperty (key, value) {
        const { form } = this.props;
        form.$(key).value = value;
    }
    onChange (event) {
        this.updateProperty(event.target.name, event.target.value);
    }
    onSubmit() {
        const { form } = this.props;
        form.submit();
    }
    handleCheckBox(key, value) {
        let state = this.state;
        state[key] = value;
        this.setState(state);
    }
    handleConnectedDocuments() {
        const { connect_document_form } = this.state;
        this.setState({
            connect_document_form: !connect_document_form
        });
    }
    componentWillReceiveProps(nextProps) {
        const { form, documents } = this.props;
        const id = form.$("contract_document").$value;
        if(id !== undefined && id.length !== 0) {
            const document = documents.find(document => document.id === id);
            this.setState({
                connect_document_name: document.name
            });
        }
    }
    render() {
        let contract_document;
        const connectDocumentLabel = this.props.intl.formatMessage({...messages.connectLabel});
        const { automatic_extension_form, connect_document_form, connect_document_name } = this.state;
        const { form, documents, searchFiles } = this.props;

        return (
            <div>
                {!connect_document_form ? (
                    <div>
                        <Row>
                            <Col lg={6}>
                                <MobxFormInput field={form.$("service_name")} change={this.onChange} />
                            </Col>
                            <Col lg={6}>
                                <MobxFormInput field={form.$("provider_name")} change={this.onChange} />
                            </Col>
                        </Row>
                        <Row>
                            <CancelationDate form={form} change={this.updateProperty} />
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <MobxFormInput field={form.$("customer_number")} change={this.onChange} />
                            </Col>
                            <Col lg={6}>
                                <MobxFormInput field={form.$("contract_number")} change={this.onChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <MobxFormTextArea field={form.$("additional_numbers")} change={this.onChange} />
                            </Col>
                            <Col lg={12}>
                                <MobxFormTextArea field={form.$("annotations")} change={this.onChange} />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} className='no-padding'>
                                <MobxFormDatePicker field={form.$("contract_start")} change={this.updateProperty} />
                            </Col>
                            <Col lg={6} className='no-padding'>
                                <MobxFormDatePicker field={form.$("cancellation_date")} change={this.updateProperty} />
                            </Col>
                        </Row>
                        <Row>
                            {connect_document_name.length !== 0 &&
                                <Col lg={9}>
                                    <FormInput field={connect_document_name} edit={false} label={connectDocumentLabel} />
                                </Col>
                            }
                            <Col lg={3}>
                                <Button className="btn-primary" onClick={this.handleConnectedDocuments} style={connectDocsButton}>
                                    <FormattedMessage {...messages.connect} />
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <MobxFormCheckbox field={form.$("automatic_extension_form")} change={this.handleCheckBox} />
                            </Col>
                        </Row>
                        {(automatic_extension_form && !connect_document_form) ? (
                            <Row>
                                <AutomaticDate form={form} change={this.updateProperty} />
                            </Row>
                        ) : null}
                        <Button className="btn-primary" onClick={this.onSubmit}>
                            <FormattedMessage {...messages.connect} />
                        </Button>
                    </div>
                ) : (
                    <ConnectDocument
                        form={form}
                        documents={documents}
                        searchFiles={searchFiles}
                        handleDocument={this.handleCheckBox}
                        updateProperty={this.updateProperty}
                        handleConnectedDocuments={this.handleConnectedDocuments}
                    />
                )}
            </div>
        );
    }
}

export default injectIntl(Services);
