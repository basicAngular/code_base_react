import LoadingSpinner from "components/LoadingSpinner";
import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import DetailField from 'components/DetailField';
import Vaccination from 'models/Vaccination';
import "./style.scss";

@inject("vaccinationStore")
@observer
class VaccunationDetail extends React.Component {

    static propTypes = {
        match: PropTypes.object,
        vaccinationStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.vaccinationStore.loadVaccination(this.props.match.params.id, true);
        }
        this.props.setParentTitle("impfungdetailansicht");
    }

    render() {
        if (this.props.vaccinationStore.isLoading)
            return <LoadingSpinner />;
        const {id} = this.props.match.params;
        const vaccination = this.props.vaccinationStore.getVaccination(id);
        if (!vaccination) return <LoadingSpinner />;
        
        return (
            <Row>
                <Col lg={4} lgOffset={4}>
                    <div className="ibox float-e-margins">
                        <div className="ibox-content">
                            <Row>
                                <Col lg={12}>                            
                                    <h2>Daten</h2>
                                </Col>
                            </Row>
                            <Row>
                                <DetailField col="col-lg-6" label="Impfung">
                                    {vaccination.title}
                                </DetailField>
                            </Row>
                            <Row>
                                <DetailField col="col-lg-6" label="Intervall">
                                    {Vaccination.textInterval(vaccination.interval)}
                                </DetailField>
                                <DetailField col="col-lg-6" label="Priorität">
                                    {Vaccination.priorities[vaccination.priority]}
                                </DetailField>
                            </Row>
                            <hr />
                            <Row>
                                <Col lg={12}>
                                    <h2>Metadaten</h2>                                
                                </Col>
                            </Row>
                            <Row>
                                <DetailField col="col-lg-6" label="Erstellt">
                                    {moment(vaccination.meta.created_at).calendar()}
                                </DetailField>
                                <DetailField col="col-lg-6" label="Aktualisiert">
                                    {moment(vaccination.meta.updated_at).calendar()}
                                </DetailField>
                            </Row>
                        </div>
                        <div className="ibox-footer text-right">
                        <ul className="list-inline" style={{marginBottom: 0, fontSize: "2.0em"}}>
                            <li><Link to={`/vaccination/${id}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link></li>
                            <li><a className="text-danger" onClick={() => this.props.vaccinationStore.deleteVaccination(id)}><i className="fa fa-trash"></i></a></li>
                        </ul>
                        </div>
                    </div>

                </Col>
            </Row>
        );
    }
}

export default VaccunationDetail;
