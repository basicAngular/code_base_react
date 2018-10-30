import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import classnames from "classnames/bind";
import LoadingSpinner from "components/LoadingSpinner";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import Vaccination from "models/Vaccination";
import style from "./style.scss";

const cx = classnames.bind(style);

@withRouter
@inject("vaccinationStore")
@observer
class VaccinationPage extends React.Component {

    static propTypes = {
        customerStore: PropTypes.object,
        vaccinationStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    componentWillMount() {
        this.props.vaccinationStore.loadVaccinations();
        this.props.setParentTitle("vaccinations");
    }

    render() {
        if (this.props.vaccinationStore.isLoading)
            return <div><LoadingSpinner /></div>;

        const tableContent = this.props.vaccinationStore.vaccinations;
        const tableClasses = cx("-striped", "-highlight", "table", "m-b-sm", "rows-middled");

        const columns = [
            {
                id: "vaccination",
                Header: "Impfung",
                accessor: "title",
            },
            {
                id: "interval",
                Header: "Intervall",
                accessor: "interval",
                Cell: ({value}) => <span>{Vaccination.textInterval(value)}</span>                
            },
            {
                id: "priority",
                Header: "Priorität",
                accessor: "priority",
                Cell: ({value}) => <span>{Vaccination.priorities[value]}</span>
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
                        <li><Link to={`/vaccination/${value}/`} className="text-success"><i className="fa fa-search"></i></Link></li>
                        <li><Link to={`/vaccination/${value}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link></li>
                        <li><a className="text-danger" onClick={() => this.props.vaccinationStore.deleteVaccination(value)}><i className="fa fa-trash"></i></a></li>
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
                        loading={this.props.vaccinationStore.isLoading}
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
                    <Link to="/vaccination/new" className="btn btn-primary m-b-sm">Impfung hinzufügen</Link>
                </div>
            </div>
        );
    }
}


export default VaccinationPage;
