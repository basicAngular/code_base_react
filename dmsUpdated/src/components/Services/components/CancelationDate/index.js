import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { injectIntl } from "react-intl";
import ExtensionForm from "../ExtensionDateForm";
import messages from "./../ServiceModal/messages";

const dates = [
    {
        title: "weeks",
        value: 1
    },
    {
        title: "month",
        value: 4
    }
];

@observer
class CancelationDate extends React.Component {
    static propTypes = {
        form: PropTypes.object,
        change: PropTypes.func
    }

    render() {
        const { form, change } = this.props;
        const value = form.$("cancellation_period").$value;
        const text = this.props.intl.formatMessage({...messages.cancellation_period});
        return (
            <div>
                <ExtensionForm
                    label={text}
                    title={text}
                    dates={dates}
                    value={value}
                    updateProperty={change}
                    name="cancellation_period"
                />
            </div>
        );
    }
}

export default injectIntl(CancelationDate);
