import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";
import VaccinationModel from "models/Vaccination";
import { FormattedMessage } from "react-intl";
import messages from "./messages";

class Vaccination extends React.Component {

    static propTypes = {
        vaccination: PropTypes.object.isRequired,
        onClickVaccination: PropTypes.func
    }

    isVaccinated() {
        //TODO: Today > next_shot
        return this.props.vaccination.vaccinated_on 
            && (this.props.vaccination.interval === 0 || moment(this.props.vaccination.vaccinated_on).add(this.props.vaccination.interval, "months").format("YYYY-MM-DD") > moment().format("YYYY-MM-DD"));
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState(nextProps.vaccination);
    // }

    renderIcon() {
        if (!this.isVaccinated())
            return (
                <span className="fa-stack fa-4x">
                    <i className="fa fa-shield fa-stack-1x"></i>
                    <i className="fa fa-ban fa-stack-2x"></i>
                </span>
            );
        else
            return (
                <span className="fa-stack fa-4x">
                    <i className="fa fa-shield fa-stack-1x"></i>
                    <i className="fa fa-stack-2x"></i>
                </span>
            );
            // return (<i className="fa fa-shield fa-4x"></i>);
    }

    render() {
        const {vaccination} = this.props;
        const nextVaccination = (this.props.vaccination.vaccinated_on ? moment(this.props.vaccination.vaccinated_on).add(this.props.vaccination.interval, "months").format("DD.MM.YYYY") : "Sofort");
        return (
            <Col lg={3}>
                <div className={"widget "+ (this.isVaccinated() ? "navy" : "red")+"-bg p-sm text-center"} style={{cursor: "pointer"}} onClick={() => this.props.onClickVaccination(vaccination.id)}>
                    <div className="m-b-md">
                        {this.renderIcon()}
                        <h3 className="m-xs">{vaccination.title}</h3>
                        <p className="m-xs">
                        <span>
                            <b><FormattedMessage {...messages.interval} />:</b> {VaccinationModel.textInterval(vaccination.interval)}<br/>
                        </span>
                        {vaccination.vaccinated_on && 
                        <span>
                            <b><FormattedMessage {...messages.vaccinatedOn} />:</b> {moment(vaccination.vaccinated_on).format("DD.MM.YYYY")}
                        </span>
                        }<br/>
                        {(vaccination.interval > 0 || (vaccination.interval === 0 && !vaccination.vaccinated_on))  &&
                            <span>
                                <b><FormattedMessage {...messages.nextVaccinationOn} />:</b> {nextVaccination}
                            </span>
                        }<br/>
                        </p>
                    </div>
                </div>
            </Col>
        );
    }
}

export default Vaccination;
