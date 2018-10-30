import React, { Component } from "react";
import PropTypes from "prop-types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

class TimelineElement extends Component {
    static propTypes = {
        date: PropTypes.string,
        icon: PropTypes.object,
        color: PropTypes.string,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        background: PropTypes.string,
        description: PropTypes.string
    }
    render() {
        const { title, subtitle, description, icon, background, color, date } = this.props;
        return (
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: background, color: color }}
                icon={icon}
                date={date}
            >
                <h3 className="vertical-timeline-element-title">{title}</h3>
                <h4 className="vertical-timeline-element-subtitle">{subtitle}</h4>
                <p>{description}</p>
                <p>
                    <a href="#" className="btn btn-sm btn-primary"> More info</a>
                </p>
            </VerticalTimelineElement>
        );
    }
}

export default TimelineElement;
