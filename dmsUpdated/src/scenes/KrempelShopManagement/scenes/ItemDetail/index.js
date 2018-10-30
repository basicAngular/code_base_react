// import React from "react";
// import PropTypes from "prop-types";
// import LoadingSpinner from "components/LoadingSpinner";
// import { inject, observer } from "mobx-react";
// import { Link } from "react-router-dom";
// import { Col, Row } from "react-bootstrap";
// import DetailField from 'components/DetailField';
// import Vaccination from 'models/Vaccination';
// import moment from "moment";
// import "./style.scss";

// @inject("shopItemStore")
// @observer
// class ItemDetail extends React.Component {

//     static propTypes = {
//         match: PropTypes.object,
//         history: PropTypes.object,
//         shopItemStore: PropTypes.object,
//         setParentTitle: PropTypes.func,
//         vaccinationStore: PropTypes.func
//     }
    
//     componentWillMount() {
//         if (this.props.match.params.id) {
//             this.props.shopItemStore.load(this.props.match.params.id, true);
//         }
//         this.props.setParentTitle("shopdetailansicht");
//     }

//     render() {
//         if (this.props.shopItemStore.isLoading) return <LoadingSpinner />;
//         const {id} = this.props.match.params;
//         const vaccination = this.props.vaccinationStore.getVaccination(id);
//         if (!vaccination) return <LoadingSpinner />;
//         // if (this.props.vaccinationStore.isLoading) return <LoadingSpinner />;
//         // const {id} = this.props.match.params;
//         // const vaccination = this.props.vaccinationStore.getVaccination(id);
//         // if (!vaccination) return <LoadingSpinner />;
        
//         return (
//             <Row>
//                 <Col lg={4} lgOffset={4}>
//                     <div className="ibox float-e-margins">
//                         <div className="ibox-content">
//                             <Row>
//                                 <Col lg={12}>                            
//                                     <h2>Daten</h2>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <DetailField col="col-lg-6" label="Impfung">
//                                     {vaccination.title}
//                                 </DetailField>
//                             </Row>
//                             <Row>
//                                 <DetailField col="col-lg-6" label="Intervall">
//                                     {Vaccination.textInterval(vaccination.interval)}
//                                 </DetailField>
//                                 <DetailField col="col-lg-6" label="Priorität">
//                                     {Vaccination.priorities[vaccination.priority]}
//                                 </DetailField>
//                             </Row>
//                             <hr />
//                             <Row>
//                                 <Col lg={12}>
//                                     <h2>Metadaten</h2>                                
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <DetailField col="col-lg-6" label="Erstellt">
//                                     {moment(vaccination.meta.created_at).calendar()}
//                                 </DetailField>
//                                 <DetailField col="col-lg-6" label="Aktualisiert">
//                                     {moment(vaccination.meta.updated_at).calendar()}
//                                 </DetailField>
//                             </Row>
//                         </div>
//                         <div className="ibox-footer text-right">
//                         <ul className="list-inline" style={{marginBottom: 0, fontSize: "2.0em"}}>
//                             <li><Link to={`/vaccination/${id}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link></li>
//                             <li><a className="text-danger" onClick={() => this.props.vaccinationStore.deleteVaccination(id)}><i className="fa fa-trash"></i></a></li>
//                         </ul>
//                         </div>
//                     </div>

//                 </Col>
//             </Row>
//         );
//     }
// }

// export default ItemDetail;


import React from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "components/LoadingSpinner";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import DetailField from 'components/DetailField';
// import Vaccination from 'models/Vaccination';
import moment from "moment";
import "./style.scss";

@inject("shopItemStore")
@observer
class ItemDetail extends React.Component {

    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
        shopItemStore: PropTypes.object,
        setParentTitle: PropTypes.func,
        vaccinationStore: PropTypes.func
    }
    
    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.shopItemStore.load(this.props.match.params.id, true);
        }
        this.props.setParentTitle("shopdetailansicht");
    }

    render() {
        if (this.props.shopItemStore.isLoading) return <LoadingSpinner />;
        const {id} = this.props.match.params;
        const shop_item = this.props.shopItemStore.get(id);
        if (!shop_item) return <LoadingSpinner />;
        
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
                                    {shop_item.title}
                                </DetailField>
                            </Row>
                            <Row>
                                <DetailField col="col-lg-6" label="Bezeichnung">
                                    {shop_item.description}
                                </DetailField>
                                <DetailField col="col-lg-6" label="Brutto">
                                    {shop_item.price}
                                </DetailField>
                            </Row>
                            <Row>
                                <DetailField col="col-lg-6" label="Verfügbar">
                                    {shop_item.available}
                                </DetailField>
                                <DetailField col="col-lg-6" label="Aktiviert">
                                    {shop_item.enabled}
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
                                    {moment(shop_item.meta.created_at).calendar()}
                                </DetailField>
                                <DetailField col="col-lg-6" label="Aktualisiert">
                                    {moment(shop_item.meta.updated_at).calendar()}
                                </DetailField>
                                <DetailField col="col-lg-6" label="Gelöscht">
                                    {moment(shop_item.meta.deleted_at).calendar()}
                                </DetailField>
                            </Row>
                        </div>
                        <div className="ibox-footer text-right">
                        <ul className="list-inline" style={{marginBottom: 0, fontSize: "2.0em"}}>
                            <li><Link to={`/shop-administration/${id}/edit`} className="text-warning"><i className="fa fa-pencil"></i></Link></li>
                            <li><a className="text-danger" onClick={() => this.props.shopItemStore.delete(id)}><i className="fa fa-trash"></i></a></li>
                        </ul>
                        </div>
                    </div>

                </Col>
            </Row>
        );
    }
}

export default ItemDetail;

