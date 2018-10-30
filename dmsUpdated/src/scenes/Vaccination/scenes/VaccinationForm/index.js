import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import VaccinationForm from "components/Form/Vaccination";
import { observer, inject } from "mobx-react";
import {DefaultInput, DefaultSelect, DefaultHidden, DefaultCheckbox} from "components/Form/components/MobxFormHelpers";
import Vaccination from "models/Vaccination";
import LoadingSpinner from "components/LoadingSpinner";
import {toast} from "react-toastify";


@inject("vaccinationStore")
@withRouter
@observer
class VaccinationFormContainer extends React.Component {

    static propTypes = {
        history: PropTypes.object,
        match: PropTypes.object,
        vaccinationStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.form = new VaccinationForm(this.onSubmit.bind(this), this.onError.bind(this));
    }

    componentWillMount() {
        let priorities = [];
        for (let i = 0; i <= 2; i++) {
            priorities.push({value: i, label: Vaccination.priorities[i]});
        }
        this.form.$("priority").set("extra", priorities);
        if (this.props.match.params.id) {
            this.props.vaccinationStore.loadVaccination(this.props.match.params.id).then(vaccination => {
                this.form.set(vaccination.toForm());

                this.form.validate();
            });
            this.props.setParentTitle("impfungbearbeiten");        
        } else {
            this.form.set(Vaccination.random().toForm());     
            this.form.validate();            
            this.props.setParentTitle("impfunghinzufügen");        
        }
        
    }

    onSubmit(form) {
        const vaccination = Vaccination.fromForm(form.values());
        if (!vaccination.id) 
            return this.props.vaccinationStore.createVaccination(vaccination)
            .then(
                (vaccination) => {
                    toast.success("Impfung "+vaccination.title+" erfolgreich erstellt!");
                    this.props.history.replace(`/vaccination/${vaccination.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
        else 
            return this.props.vaccinationStore.updateVaccination(vaccination)
            .then(
                (vaccination) => {
                    toast.success("Impfung "+vaccination.title+" erfolgreich bearbeitet!");
                    this.props.history.replace(`/vaccination/${vaccination.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
    }

    onError(form) {
        toast.error("Bitte Eingabe prüfen.");
    }

    render() {
        if (this.props.vaccinationStore.isLoading) {
            return <LoadingSpinner />;            
        }

        return (
            <div className="container">
            <form className="col-lg-8 col-lg-offset-2" onSubmit={this.form.onSubmit}>
                                <div className="row">
                </div>
                <DefaultHidden field={this.form.$("id")} />
                <div className="row">
                    <DefaultInput field={this.form.$("title")} className="col-lg-6" />
                    <DefaultSelect field={this.form.$("priority")} className="col-lg-6" />                                        
                </div>
                <div className="row">
                    <DefaultCheckbox field={this.form.$("onetime")} className="col-lg-6" />                    
                </div>
                {this.form.$("onetime").value ||
                <div className="row">
                    <DefaultInput field={this.form.$("interval")} className="col-lg-6" />                
                </div>
                }
              <div className="row">
                <div className="col-lg-12">
                    <button className="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit" disabled={false && (this.form.submitting || !this.form.isValid)}>Speichern</button>
                    <button className="btn btn-sm button  m-t-n-xs" type="button" disabled={this.form.isDirty} onClick={this.form.onReset}>Formular zurücksetzen</button>
                </div>
            </div>
              <p>{this.form.error}</p>
            </form>
            </div>
        );
    }   
    
};
export default VaccinationFormContainer;
