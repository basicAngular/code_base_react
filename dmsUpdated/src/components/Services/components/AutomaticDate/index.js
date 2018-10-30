import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { injectIntl } from "react-intl";
import ExtensionForm from "../ExtensionDateForm";
import messages from "./../ServiceModal/messages";

const dates = [
    {
        title: "month",
        value: 4
    },
    {
        title: "year",
        value: 48
    }
];

@observer
class AutomaticExtension extends React.Component {
    static propTypes = {
        form: PropTypes.object,
        change: PropTypes.func
    }

    render() {
        const { form, change } = this.props;
        const value = form.$("automatic_extension_period").$value;
        const text = this.props.intl.formatMessage({...messages.automatic_extension_period});
        return (
            <div>
                <ExtensionForm
                    label={text}
                    title={text}
                    dates={dates}
                    value={value}
                    updateProperty={change}
                    name="automatic_extension_period"
                />
            </div>
        );
    }
}

export default injectIntl(AutomaticExtension);
