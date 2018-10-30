import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import HTML5Backend from "react-dnd-html5-backend";
import { defineMessages } from 'react-intl';
import { DragDropContext } from "react-dnd";
import { FormattedMessage } from "react-intl";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.less";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import moment from "moment";
import "./styles.css";

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
const DragAndDropCalendar = withDragAndDrop(BigCalendar);
const messages = defineMessages({
    eventAdd: {
        id: "app.components.eventModal.eventAdd",
        defaultMessage: "Add",
    },
    today: {
        id: "app.components.eventModal.today",
        defaultMessage: "Today",
    },
    month: {
        id: "app.components.eventModal.month",
        defaultMessage: "Month",
    },
    week: {
        id: "app.components.eventModal.week",
        defaultMessage: "Week",
    },
    day: {
        id: "app.components.eventModal.day",
        defaultMessage: "Day",
    },
    agenda: {
        id: "app.components.eventModal.agenda",
        defaultMessage: "Agenda",
    },
    all_day: {
        id: "app.components.eventModal.all_day",
        defaultMessage: "All_Day",
    }
});
const calendarMessages = {
    all_day: <FormattedMessage {...messages.all_day} />,
    previous: <i className="fa fa-chevron-left"></i>,
    next: <i className="fa fa-chevron-right"></i>,
    today: <FormattedMessage {...messages.today} />,
    month: <FormattedMessage {...messages.month} />,
    week: <FormattedMessage {...messages.week} />,
    day:  <FormattedMessage {...messages.day} />,
    agenda: <FormattedMessage {...messages.agenda} />,
};
const dndWrapperStyles = {
    padding: "20px",
    minHeight: "600px",
    backgroundColor: "#fff",
    borderRadius: '3px'
};
const addButtonStyles = {
    padding: 0,
    marginBottom: '10px'
};


class Calendar extends Component {

    static propTypes = {
        events: PropTypes.array,
        showModal: PropTypes.func,
        showUpdate: PropTypes.func
    }

    constructor (props) {
        super(props);
        this.state = {
            events: []
        }
        this.moveEvent = this.moveEvent.bind(this);
        this.selectSlot = this.selectSlot.bind(this);
        this.selectEvent = this.selectEvent.bind(this);
    }

    componentDidMount() {
        const { events } = this.props;
        this.setState({ events });
    }

    componentWillReceiveProps(nextProps) {
        const { events } = nextProps;
        this.setState({ events });
    }

    moveEvent({ event, start, end }) {
        const { events } = this.state;

        const idx = events.indexOf(event);
        const updatedEvent = { ...event, start, end };

        const nextEvents = [...events];
        nextEvents.splice(idx, 1, updatedEvent);

        this.setState({
            events: nextEvents
        });
        toast.error("Form has errors!");
    }

    selectEvent(event) {
        const { showUpdate } = this.props;
        showUpdate(event.id);
    }

    selectSlot(event) {
        toast.info(
            "Slot verfübar",
            {
                timeOut: 10000,
                progressBar: false
            }
        )
    }

    render() {
        const { showModal } = this.props;

        return (
            <div>
                <div className="col-lg-12" style={addButtonStyles}>
                    <Button className="btn-primary" onClick={() => showModal()}>
                        <FormattedMessage {...messages.eventAdd} />
                    </Button>
                </div>
                <div className="col-lg-12" style={dndWrapperStyles}>
                    <DragAndDropCalendar
                      selectable
                      events={this.state.events}
                      messages={calendarMessages}
                      defaultView='month'
                      onEventDrop={this.moveEvent}
                      defaultDate={new Date()}
                      onSelectEvent={this.selectEvent}
                      onSelectSlot={this.selectSlot}
                      style={{minHeight: "600px"}}
                    />
                </div>
            </div>
        );
    }

}

export default DragDropContext(HTML5Backend)(Calendar);
