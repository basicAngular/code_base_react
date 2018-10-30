import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { FormattedMessage } from "react-intl";
import { Row, Col, Button } from "react-bootstrap";
import MobxFormInput from "../../Form/components/MobxFormInput";
import MobxFormCheckbox from "../../Form/components/MobxFormCheckbox";
import MobxFormDatePicker from "../../Form/components/MobxFormDatePicker";
import messages from "./messages.js";
import MobxFormTextArea from "../../Form/components/MobxFormTextArea/index";

@observer
class Event extends React.Component {
    static propTypes = {
        form: PropTypes.object,
        onHide: PropTypes.func,
        isUpdate: PropTypes.bool,
        updateId: PropTypes.number,
        deleteEvent: PropTypes.func,
    }
    constructor (props) {
        super(props);
        this.state = {};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updateProperty = this.updateProperty.bind(this);
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
    onDelete() {
        const { deleteEvent, onHide, updateId } = this.props;
        deleteEvent(updateId);
        onHide();
    }
    render() {
        const { form,  isUpdate } = this.props;

        return (
            <div>
                <Row>
                    <Col lg={12}>
                        <MobxFormInput field={form.$("title")} change={this.onChange} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <MobxFormTextArea field={form.$("description")} change={this.onChange} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={6} className="no-padding">
                        <MobxFormDatePicker field={form.$("start")} change={this.updateProperty}/>
                    </Col>
                    <Col lg={6} className="no-padding">
                        <MobxFormDatePicker field={form.$("end")} change={this.updateProperty}/>
                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <div className="d-flex flex-between flex-align-center">
                            <MobxFormCheckbox field={form.$("is_all_day_event")} change={this.updateProperty} />
                            <div className="pull-right">
                                {isUpdate &&
                                    <Button className="btn-primary" onClick={this.onDelete}>
                                        <FormattedMessage {...messages.eventDelete} />
                                    </Button>
                                }
                                &nbsp;
                                <Button className="btn-primary pull-right" onClick={this.onSubmit}>
                                    <FormattedMessage {...messages.eventSave} />
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Event;
