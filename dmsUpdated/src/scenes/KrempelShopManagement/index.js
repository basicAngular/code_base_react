import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { withRouter, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import classnames from "classnames/bind";
import LoadingSpinner from "components/LoadingSpinner";
import style from "./style.scss";

const cx = classnames.bind(style);

@withRouter
@inject("shopItemStore")
@observer
class KrempelShopManagement extends React.Component {
    
    static propTypes = {
        setParentTitle: PropTypes.func,
        shopItemStore: PropTypes.object
    }

    componentWillMount() {
        this.props.shopItemStore.loadAll();
        this.props.setParentTitle("productsintheshop");
    }

    render() {
        if (this.props.shopItemStore.isLoading)
            return <div><LoadingSpinner /></div>;

        const tableContent = this.props.shopItemStore.all;
        const tableClasses = cx("-striped", "-highlight", "table", "m-b-sm", "rows-middled");

        const columns = [
            {
                id: "enabled",
                Header: "Aktiv",
                accessor: "enabled",
            },
            {
                id: "number",
                Header: "Nummer",
                accessor: "number",
            },
            {
                id: "title",
                Header: "Bezeichnung",
                accessor: "title",
            },
            {
                id: "price",
                Header: "Brutto",
                accessor: "price",
                Cell: ({value}) => value / 100.0                
            },
            {
                id: "available",
                Header: "Verfügbar",
                accessor: "available",
            },
            {
                id: "action",
                Header: "Aktionen",
                accessor: "id",
                width: 120,
                filterable: false,
                sortable: false,
                Cell: ({value}) => (
                    <div className="text-center">
                    <ul className="list-inline" style={{marginBottom: 0, fontSize: "1.5em"}}>
                        <li><Link to={`/shop-administration/${value}/`} className="text-success"><i className="fa fa-search"></i></Link></li>
                        <li><Link to={`/shop-administration/${value}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link></li>
                        <li><a className="text-danger" onClick={() => this.props.shopItemStore.delete(value)}><i className="fa fa-trash"></i></a></li>
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
                        loading={this.props.shopItemStore.isLoading}
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
                    <Link to="/shop-administration/new" className="btn btn-primary m-b-sm">Artikel hinzufügen</Link>
                </div>
            </div>
        );
    }
}


export default KrempelShopManagement;
