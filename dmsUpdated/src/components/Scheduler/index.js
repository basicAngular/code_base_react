import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import EventModal from "./EventModal";
import Calendar from "./Calendar";

@observer
class Services extends React.Component {
    static propTypes = {
        events: PropTypes.array,
        getEvent: PropTypes.func,
        addEvent: PropTypes.func,
        updateEvent: PropTypes.func,
        deleteEvent: PropTypes.func
    }
    constructor (props) {
        super(props);
        this.state = {
            showModal: false,
            updateModal: false,
            updateId: null
        }
        this.closeModal = this.closeModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showUpdate = this.showUpdate.bind(this);
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
    render() {
        const { showModal, updateModal, updateId } = this.state;
        const { events, getEvent, addEvent, updateEvent, deleteEvent } = this.props;

        return (
            <div>
                <EventModal
                    events={events}
                    show={showModal}
                    updateId={updateId}
                    getEvent={getEvent}
                    addEvent={addEvent}
                    isUpdate={updateModal}
                    updateEvent={updateEvent}
                    deleteEvent={deleteEvent}
                    onHide={() => this.closeModal()}
                />
                <Calendar
                    events={events}
                    showModal={this.showModal}
                    showUpdate={this.showUpdate}
                />
            </div>
        );
    }
}

export default Services;
