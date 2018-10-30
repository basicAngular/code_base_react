import React from "react";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import classNames from "classnames";

const listHeader = ({ showInfo = true }) => {
    return (
        <Col lg={12} className="hide-on-phone">
            <div className="vote-item">
                <div className="row">
                    {!showInfo ? (
                        <div className="col-md-5 col-xs-10 hide-on-tablet">
                            <a href="#" className="vote-info vote-info1">Name</a>
                        </div>
                    ) : (
                        <div>
                            <div className="col-md-2 col-xs-6 text-center hide-on-phone">
                                <span className="vote-info vote-info1">Name</span>
                            </div>
                            <div className="col-md-2 col-xs-6 text-center hide-on-phone">
                                <span className="vote-info vote-info1">Author</span>
                            </div>
                        </div>
                    )}
                    <div className={classNames("col-md-2 col-xs-4 no-padding-xs",{"text-right": !showInfo}, {"text-center": showInfo})}>
                        <span className="vote-info vote-info1">Created At</span>
                    </div>
                    <div className={classNames("col-md-2 col-xs-6 no-padding-xs",{"text-right": !showInfo}, {"text-center": showInfo})}>
                        <span className="vote-info vote-info1">Size</span>
                    </div>
                    {showInfo &&
                        <div>
                            <div className="col-md-2 col-xs-6 text-center hide-on-phone">
                                <span className="vote-info vote-info1">Tags</span>
                            </div>
                            <div className="col-md-1 col-xs-6 text-center hide-on-phone">
                                <span className="vote-info vote-info1">Date</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </Col>
    );
};

export default listHeader;

listHeader.propTypes = {
    showInfo: PropTypes.bool
}