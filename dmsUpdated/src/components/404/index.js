import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

export default class Page404 extends React.Component {
    static propTypes = {
        setParentTitle: PropTypes.func
    }
    componentWillMount() {
        this.props.setParentTitle("scheduler");
    }
    //Page was not found
    render() {
        return (
            <h2 className="text-center">
                <FormattedMessage {...messages.error} />
            </h2>
        );
    }
}