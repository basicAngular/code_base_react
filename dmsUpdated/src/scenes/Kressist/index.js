import dummyMan from "data/img/dummy_man.png";
import dummyWoman from "data/img/dummy_man.png";
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
@inject("kressistStore")
@observer
class KressistPage extends React.Component {

    static propTypes = {
        setParentTitle: PropTypes.func,
        kressistStore: PropTypes.object
    }
    
    componentWillMount() {
        this.props.kressistStore.loadKressists();
        this.props.setParentTitle("kremplerassistantoverview");
    }

    render() {
        if (this.props.kressistStore.isLoading) return <div><LoadingSpinner /></div>;

        // const tableContent = this.props.kressistStore.kressists.map(v => console.log(v));
        const tableContent = this.props.kressistStore.kressists;
        const tableClasses = cx("-striped", "-highlight", "table", "m-b-sm", "rows-middled");

        const columns = [
            {
                id: "avatar",
                Header: "",
                accessor: "gender",
                width: 50,
                filterable: false,
                sortable: false,
                Cell: ({value}) => <div><img src={value === "male" ? dummyMan : dummyWoman} role="presentation" className="img-circle img-responsive" /></div>
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
                width: 100,
                filterable: false,
                sortable: false,
                Cell: ({value}) => (
                    <div className="text-center">
                    <ul className="list-inline" style={{marginBottom: 0, fontSize: "1.5em"}}>
                        <li><Link to={`/kressist/${value}/`} className="text-success"><i className="fa fa-search"></i></Link></li>
                        <li><Link to={`/kressist/${value}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link></li>
                        <li><a className="text-danger" onClick={() => this.props.kressistStore.deleteKressist(value)}><i className="fa fa-trash"></i></a></li>
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
                        loading={this.props.kressistStore.isLoading}
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
                    <Link to="/kressist/new" className="btn btn-primary m-b-sm">Krempler Assistent hinzufügen</Link>
                </div>
            </div>
        );
    }
}


export default KressistPage;
