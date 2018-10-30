import React, { Component } from "react";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import Notification from "components/Notification";
import LoadingSpinner from "components/LoadingSpinner";
import SchedulerPage from "components/Scheduler";

@inject("scheduleStore", "authStore")
@observer
class Scheduler extends Component {
    static propTypes = {
        setParentTitle: PropTypes.func,
        scheduleStore: PropTypes.object,
        authStore: PropTypes.object
    }

    constructor (props) {
        super(props);
        this.state = {};
        this.addEvent = this.addEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    componentWillMount() {
        this.props.setParentTitle("scheduler");
        this.props.scheduleStore.loadEvents();
        this.props.authStore.pullUser();
    }

    addEvent(service) {
        this.props.scheduleStore.createEvent(service);
    }

    updateEvent(service) {
        this.props.scheduleStore.updateEvent(service);
    }

    deleteEvent(id) {
        this.props.scheduleStore.deleteEvent(id);
    }

    render() {
        const { events, getEvent } = this.props.scheduleStore;

        if (this.props.authStore.isLoading) {
            return (
                <div>
                    <LoadingSpinner />
                </div>
            );
        }
        return (
            <div className="row">
                <Notification />
                <SchedulerPage
                    events={events}
                    getEvent={getEvent}
                    addEvent={this.addEvent}
                    updateEvent={this.updateEvent}
                    deleteEvent={this.deleteEvent}
                />
            </div>
        );
    }

}

export default Scheduler;
