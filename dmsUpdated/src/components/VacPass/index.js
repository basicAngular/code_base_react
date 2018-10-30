import React from "react";
import PropTypes from "prop-types";
import Vaccination from "./components/Vaccination";
import VaccinationModel from "models/Vaccination";
import { Row, Col } from "react-bootstrap";

class VacPass extends React.Component {

    static propTypes = {
        vaccinations:  PropTypes.array,
        updateVaccinationDate: PropTypes.func
    }

    updateVac(id) {
        this.props.updateVaccinationDate(id);
    }

    renderVaccinationGroup(groupName, vaccinations) {
        if (vaccinations.length === 0)
            return "";
        return (
            <Row key={groupName}>
                <Col lg={12}><h2>{groupName}</h2></Col>
                {vaccinations.map(vaccination => <Vaccination key={vaccination.id} vaccination={vaccination} onClickVaccination={(id) => this.updateVac(id)}/>)}
            </Row>
        )
    }

    render() {
        return (
            <div>
                {Object.keys(VaccinationModel.priorities).map(priority => 
                    this.renderVaccinationGroup(VaccinationModel.priorities[priority],  this.props.vaccinations.filter(vaccination => parseInt(vaccination.priority, 10) === parseInt(priority, 10)))
                )}
            </div>);
    }
}

export default VacPass;
