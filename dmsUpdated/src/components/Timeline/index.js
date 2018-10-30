import React, { Component } from "react";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import TimelineElement from "./TimelineElement";

class Timeline extends Component {
  render() {
    return (
      <VerticalTimeline>
        <TimelineElement 
          title="title"
          subtitle="subtitle"
          description="description"
          date="15/10/1997"
          color="#fff"
          background="#1ab394"
          icon={<i className="fa fa-briefcase timeline-icon"/>}
        />
        <TimelineElement 
          title="title"
          subtitle="subtitle"
          description="description"
          date="15/10/1998"
          color="#fff"
          background="#1c84c6"
          icon={<i className="fa fa-file-text timeline-icon"/>}
        />
        <TimelineElement 
          title="title"
          subtitle="subtitle"
          description="description"
          date="15/10/1997"
          color="#fff"
          background="#1ab394"
          icon={<i className="fa fa-briefcase timeline-icon"/>}
        />
        <TimelineElement 
          title="title"
          subtitle="subtitle"
          description="description"
          date="15/10/1998"
          color="#fff"
          background="#1c84c6"
          icon={<i className="fa fa-file-text timeline-icon"/>}
        />
      </VerticalTimeline>
    );
  }
}

export default Timeline;
