// import { styles } from 'components/Common/ReactSweetAlert/styles/SweetAlertStyles';
import React from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import { DateTimePicker } from 'react-widgets';

export const Prompt = ({
        onConfirm, 
        onCancel,
        close,
        title = "Aktion bestätigen", 
        message = "Möchten Sie die Aktion wirklich ausführen?",
        confirmText = "Ja",
        cancelText = "Nein",
        type = "danger"
    }) => 
    <SweetAlert 
        type={type}
        showCancel
        confirmBtnText={confirmText}
        cancelBtnText={cancelText}
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title={title}
        onConfirm={() => {onConfirm(); close();}}
        onCancel={() => {onCancel(); close();}}
    >
        {message}
    </SweetAlert>;

export class DatePrompt extends React.Component {
    static defaultProps = {
        title: "Impfdatum angeben", 
        message: "",
        confirmText: "Aktualisieren",
        cancelText: "Abbrechen"
    }

    state = {
        date: new Date()   
    }

    render() {
        const { onConfirm, onCancel, close, title, message, confirmText, cancelText } = this.props;
        return (
        <SweetAlert 
            type={"default"}
            showCancel
            confirmBtnText={confirmText}
            cancelBtnText={cancelText}
            confirmBtnBsStyle="primary"
            cancelBtnBsStyle="default"
            closeOnClickOutside={true}
            title={title}
            onConfirm={() => {onConfirm(this.state.date); close();}}
            onCancel={() => {onCancel(); close();}}
            style={{overflow: "visible"}}
        >
            {message}
            <div style={{fontSize: "12pt"}}>
            <DateTimePicker
                onChange={(date) => {this.setState({date})}}
                defaultValue={this.state.date}
                time={false}
            />
            </div>
        </SweetAlert>
        );
    }
}

Prompt.propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    close: PropTypes.func,
    title: PropTypes.string, 
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    type: PropTypes.string
};

DatePrompt.propTypes = {
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    message: PropTypes.string,
    close: PropTypes.func,
    title: PropTypes.string
};

