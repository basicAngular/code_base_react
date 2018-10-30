import dummyMan from "data/img/dummy_man.png";
import dummyWoman from "data/img/dummy_woman.png";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import classnames from "classnames/bind";
import LoadingSpinner from "components/LoadingSpinner";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

import style from "./style.scss";

const cx = classnames.bind(style);

@withRouter
@inject("customerStore", "documentStore", "authStore")
@observer
class CustomerPage extends React.Component {

    static propTypes = {
        authStore: PropTypes.object,
        customerStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }
    componentWillMount() {
        this.props.customerStore.loadCustomers();
        this.props.setParentTitle("customeroverview");
    }

    render() {
        if (this.props.customerStore.isLoading)
            return <div><LoadingSpinner /></div>;

        // const tableContent = this.props.customerStore.customers.map(v => console.log(v));
        const tableContent = this.props.customerStore.customers;
        const tableClasses = cx("-striped", "-highlight", "table", "m-b-sm", "rows-middled");

        const columns = [
            {
                id: "avatar",
                Header: "",
                accessor: "gender",
                width: 50,
                filterable: false,
                sortable: false,
                Cell: ({ value }) => {
                    return <div><img src={value === "male" ? dummyMan : dummyWoman} role="presentation" className="img-circle img-responsive" /></div>;
                }
            },
            {
                id: "has_locker",
                Header: "Box voll",
                accessor: "has_locker_documents",
                filterable: false,
                sortable: false,
                width: 63,
                Cell: ({ value }) => <div className="text-center">{(value && <i className="text-danger fa fa-exclamation-circle"></i>) || <span></span>}</div>
            },
            {
                id: "number",
                Header: "Nummer",
                accessor: "number",
                width: 150,
            },
            {
                id: "email",
                Header: "E-Mail",
                accessor: "email",
            },
            {
                id: "firstName",
                Header: "Vorname",
                accessor: "first_name",
            },
            {
                id: "lastName",
                Header: "Name",
                accessor: "last_name",
            },
            {
                id: "action",
                Header: "Aktionen",
                accessor: "id",
                width: 120,
                filterable: false,
                sortable: false,
                Cell: ({ value }) => (
                    <div className="text-center">
                        <ul className="list-inline" style={{ marginBottom: 0, fontSize: "1.5em" }}>
                            <li><Link to={`/customer/${value}/`} className="text-success"><i className="fa fa-search"></i></Link></li>
                            {this.props.authStore.user.role !== "admin" && <li><Link to={`/customer/${value}/files`} className="text-info"><i className="fa fa-archive"></i></Link></li>}
                            <li><Link to={`/customer/${value}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link></li>
                            <li><a className="text-danger" onClick={() => this.props.customerStore.deleteCustomer(value)}><i className="fa fa-trash"></i></a></li>
                        </ul>
                    </div>

                )
            },
        ];

        return (
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2">
                    <ReactTable
                        className={tableClasses}
                        data={tableContent}
                        columns={columns}
                        showPagination={true}
                        loading={this.props.customerStore.isLoading}
                        filterable={true}
                        showFilters={true}
                        defaultFilterMethod={(filter, row) => (String(row[filter.id]).includes(filter.value))}
                        defaultPageSize={10}
                        noDataText='Keine Einträge vorhanden'
                        previousText='Vorherige'
                        nextText='Nächste'
                        loadingText='Lade...'
                        pageText='Seite'
                        ofText='von'
                        rowsText='Zeilen'
                    />
                    <Link to="/customer/new" className="btn btn-primary m-b-sm">Kunde hinzufügen</Link>
                </div>
            </div>
        );
    }
}


export default CustomerPage;
