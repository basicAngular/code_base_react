import React from "react";
import PropTypes from "prop-types";
import styles from "./style.scss";
import Dropzone from "react-dropzone";
import { inject, observer } from "mobx-react";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import messages from "../../components/DigitalBox/messages";

@inject("uploadStore", "authStore")
@observer
class Locker extends React.Component {
    static propTypes = {
        authStore: PropTypes.object,
        uploadStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    componentWillMount() {
        this.props.setParentTitle("digitalbox");
    }
    
    onDrop(files) {
        files.forEach(file => {
            this.props.uploadStore.uploadFile(file, this.props.authStore.user.id)
                .then((file) => {
                    toast.success("Datei " + file.name + " erfolgreich hochgeladen!");
                })
                .catch((err) => {
                    toast.error("Beim Dateiupload ist ein Fehler aufgetreten.");
                });
        });


    }
    onOpenClick() {
        this.dropzone.open();
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <p>
                        <FormattedMessage {...messages.titleUp} />
                    </p>
                    <Dropzone disableClick={false} ref={node => {
                        this.dropzone = node;
                    }} onDrop={this.onDrop.bind(this)} style={{
                        display: "inline-block"
                    }}>
                        {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                            if (isDragActive) {
                                return (
                                   <span className="locker locker-hover fa-stack" style={{
                                        fontSize: "150pt",
                                        transform: "scale(1.1)"
                                    }}>
                                        <i className="fa fa-circle fa-stack-2x"></i>
                                        <i className="fa fa-archive fa-stack-1x fa-inverse"></i>
                                    </span>
                                );
                            }

                            if (isDragReject) {
                                return (
                                    <span className="locker fa-stack text-danger" styleName={styles.locker} style={{
                                        fontSize: "150pt"
                                    }}>
                                        <i className="fa fa-circle fa-stack-2x"></i>
                                        <i className="fa fa-archive fa-stack-1x fa-inverse"></i>
                                    </span>
                                );
                            }

                            return acceptedFiles.length || rejectedFiles.length
                                ? ( 
                                    <span className="fa-stack text-success" style={{
                                        fontSize: "150pt"
                                    }}>
                                        <i className="fa fa-circle fa-stack-2x"></i>
                                        <i className="fa fa-archive fa-stack-1x fa-inverse"></i>
                                    </span>
                                )
                                : (
                                    <span className="fa-stack" style={{
                                        fontSize: "150pt"
                                    }}>
                                        <i className="fa fa-circle fa-stack-2x"></i>
                                        <i className="fa fa-archive fa-stack-1x fa-inverse"></i>
                                    </span>
                                );

                        }}
                    </Dropzone>
                    <p>
                        <FormattedMessage {...messages.titleDown} />
                    </p>
                    <p>
                        <FormattedMessage {...messages.or} />
                    </p>
                    <button className="btn btn-primary m-b-md" onClick={this.onOpenClick.bind(this)}>
                        <FormattedMessage {...messages.uploadButton} />
                    </button>
                </div>
            </div>

        );
    }
}

export default Locker;