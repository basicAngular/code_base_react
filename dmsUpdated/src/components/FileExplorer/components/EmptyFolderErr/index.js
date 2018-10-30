import React from "react";
import {Col} from "react-bootstrap";
import {FormattedMessage} from "react-intl";
import messages from "./messages.js";

const EmptyFolderErr = () => {
    return (
        <Col lg={12}>
            <div className="empty-folder">
                <h3>
                    <i className="fa fa-file grey" />&nbsp;
                    <FormattedMessage {...messages.emptyFolderErr} />
                </h3>
            </div>
        </Col>
    );
};

export default EmptyFolderErr;