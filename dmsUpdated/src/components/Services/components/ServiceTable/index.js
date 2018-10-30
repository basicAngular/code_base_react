import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
//import classNames from "classnames";
import { injectIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "react-bootstrap";
import ReactTable from "react-table";
import "react-table/react-table.css";
import messages from "./messages";

@observer
class ServiceTable extends React.Component {
    static propTypes = {
        fields: PropTypes.array,
        showUpdate: PropTypes.func,
        deleteService: PropTypes.func
    }
    constructor (props) {
        super(props);
        this.state = {};
    }
    handleDelete(id) {
        const { deleteService } = this.props;
        deleteService(id);
    }
    handleUpdate(id) {
        const { showUpdate } = this.props;
        showUpdate(id);
    }
    getDecimal(num) {
        return num - Math.floor(num);
    }
    getDate(date) {
        const countDays = date*7;
        const years = Math.trunc(countDays/365);
        const month = Math.trunc(this.getDecimal(countDays/365)*365/30);
        const days = countDays - (years*365 + month*30);
        return { days, month, years }
    }
    handleViewDocument(id) {
        const { handleViewDocument, fields } = this.props;
        const document = fields.find(document => document.id === id);
        handleViewDocument(document);
    }
    render() {
        const { fields } = this.props;
        const iconSize = { fontSize: '18px', cursor: 'pointer' };

        return (
            <div>
                <Row>
                    <Col lg={12}>
                        <ReactTable
                            data={fields}
                            columns={[
                                {
                                    Header: "",
                                    columns: [
                                        {
                                            Header: this.props.intl.formatMessage({...messages.name}),
                                            accessor: "service_name",
                                            maxWidth: 200
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.provider}),
                                            accessor: "provider_name",
                                            maxWidth: 200
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.contract}),
                                            accessor: "contract_number",
                                            maxWidth: 100
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.customer}),
                                            accessor: "customer_number",
                                            maxWidth: 110
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.contractStart}),
                                            accessor: "contract_start",
                                            maxWidth: 130
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.contractEnd}),
                                            accessor: "cancellation_date",
                                            maxWidth: 150
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.additional}),
                                            accessor: "additional_numbers",
                                            maxWidth: 150
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.cancellationPeriod}),
                                            accessor: "cancellation_period",
                                            Cell: row => {
                                                const date = this.getDate(row.value);
                                                return (
                                                    <div>
                                                        {date.years !== 0 && 
                                                        <span>
                                                            {date.years}&nbsp;
                                                            <FormattedMessage {...messages.year} />
                                                        </span>}
                                                        {date.month !== 0 && 
                                                        <span>
                                                            &nbsp;
                                                            {date.month}&nbsp;
                                                            <FormattedMessage {...messages.month} />
                                                            &nbsp;
                                                        </span>}
                                                        {date.days !== 0 &&
                                                        <span>
                                                            {date.days}&nbsp;
                                                            <FormattedMessage {...messages.day} />
                                                        </span>}
                                                    </div>
                                                )
                                            },
                                            width: 160
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.extensionPeriod}),
                                            accessor: "automatic_extension_period",
                                            Cell: row => {
                                                const date = this.getDate(row.value);
                                                return (
                                                    <div>
                                                        {date.years !== 0 && 
                                                        <span>
                                                            {date.years}&nbsp;
                                                            <FormattedMessage {...messages.year} />
                                                        </span>}
                                                        {date.month !== 0 && 
                                                        <span>
                                                            &nbsp;
                                                            {date.month}&nbsp;
                                                            <FormattedMessage {...messages.month} />
                                                            &nbsp;
                                                        </span>}
                                                        {date.days !== 0 &&
                                                        <span>
                                                            {date.days}&nbsp;
                                                            <FormattedMessage {...messages.day} />
                                                        </span>}
                                                    </div>
                                                )
                                            },
                                            width: 160
                                        },
                                        {
                                            Header: this.props.intl.formatMessage({...messages.annotations}),
                                            accessor: "annotations"
                                        },
                                        {
                                            accessor: "id",
                                            Cell: row => {
                                                return (
                                                    <i className="fa fa-external-link" style={iconSize} onClick={() => this.handleViewDocument(row.value)}></i>
                                                )
                                            },
                                            maxWidth: 80,
                                        },
                                        {
                                            accessor: "id",
                                            Cell: row => (
                                                <i className="fa fa-pencil-square-o" style={iconSize} onClick={() => this.handleUpdate(row.value)}></i>
                                            ),
                                            maxWidth: 45
                                        },
                                        {
                                            accessor: "id",
                                            Cell: row => (
                                                <i className="fa fa-trash-o" style={iconSize} onClick={() => this.handleDelete(row.value)}></i>
                                            ),
                                            maxWidth: 45
                                        }
                                    ]
                                }
                            ]}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default injectIntl(ServiceTable);
