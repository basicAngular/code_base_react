import LoadingSpinner from 'components/LoadingSpinner';
import React, { Component } from "react";
import PropTypes from "prop-types";
import VacPass from "components/VacPass";
import { observer, inject } from "mobx-react";
import { DatePrompt } from "components/SweetAlertHandler";
import { toast } from "react-toastify";
import toastError from "components/DefaultToastError";
import moment from "moment";

@inject("vaccinationStatusStore")
@observer
class VacPassPage extends Component {
    
    static propTypes = {
        vaccinationStatusStore: PropTypes.object,
        setParentTitle: PropTypes.func,
        showSweetAlert: PropTypes.func,
        hideSweetAlert: PropTypes.func
    }

    componentWillMount() {
        this.props.setParentTitle("VaccinationCertificate");
        this.props.vaccinationStatusStore.loadAll();
    }
    //Vaccination Certificate
    updateVaccinationDate(id, date) {
        this.props.vaccinationStatusStore.update({id, vaccinated_on: moment(date).format("YYYY-MM-DD")})
        .then((vaccination) => {
            toast.success("Klasse - Der Impfschutz wurde erneuert!");
        }).catch(() => {
            toastError();
        });
    }

    showDatePicker(id) {
        this.props.showSweetAlert(
            <DatePrompt 
                close={this.props.hideSweetAlert.bind(this)}
                onCancel={() => {}}
                onConfirm={(date) => this.updateVaccinationDate(id, date)}
            />
        );
    }

    render() {
        if (this.props.vaccinationStatusStore.isLoading) {
            return (
                <div className="row">
                    <div className="col-lg-12">
                        <LoadingSpinner />
                    </div>
                </div>
            )
        }
        
        return (
            <div className="row">
                <div className="col-lg-12">
                    <VacPass vaccinations={this.props.vaccinationStatusStore.all} updateVaccinationDate={(id) => this.showDatePicker(id)}/>
                </div>
            </div>
        );
    }

}

export default VacPassPage;
