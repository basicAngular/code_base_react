import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";


class IboxTools extends React.Component {
    static propTypes = {
        actions: PropTypes.array
    }
    static defaultProps = {
        actions: []
    }

    collapsePanel(e) {
        e.preventDefault();
        var element = $(e.target);
        var ibox = element.closest("div.ibox");
        var button = element.closest("i");
        var content = ibox.find("div.ibox-content");
        content.slideToggle(200);
        button.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");
        ibox.toggleClass("").toggleClass("border-bottom");
        setTimeout(function () {
            ibox.resize();
            ibox.find("[id^=map-]").resize();
        }, 50);
    }

    closePanel(e) {
        e.preventDefault();
        var element = $(e.target);
        var content = element.closest("div.ibox");
        content.remove();
    }

    renderDropdownAction(action, index) {
        return (
            <li  key={index}>
                <a onClick={action.onClick}>{action.name}</a>
            </li>
        );
    }

    render() {
        return (
            <div className="ibox-tools">
                <a className="collapse-link" onClick={this.collapsePanel}>
                    <i className="fa fa-chevron-up"></i>
                </a>
                {this.props.actions.length > 0 && [
                    <a key="toggle" className="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i className="fa fa-wrench"></i>
                    </a>,
                    <ul key="dropdown" className="dropdown-menu dropdown-user">
                        {this.props.actions.map(this.renderDropdownAction)}
                    </ul>
                ]}
                <a className="close-link" onClick={this.closePanel}>
                    <i className="fa fa-times"></i>
                </a>
            </div>
        );
    }
}

export default IboxTools;
