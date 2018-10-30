import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import KremplerForm from "components/Form/Krempler";
import { observer, inject } from "mobx-react";
import { DefaultInput, DatePicker, DefaultSelect, DefaultCheckbox, DefaultHidden } from "components/Form/components/MobxFormHelpers";
import Krempler from "models/Krempler";
import LoadingSpinner from "components/LoadingSpinner";
import { toast } from "react-toastify";


@inject("kremplerStore")
@withRouter
@observer
class KremplerFormContainer extends React.Component {

    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
        kremplerStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.form = new KremplerForm(this.onSubmit.bind(this), this.onError.bind(this));
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.kremplerStore.loadKrempler(this.props.match.params.id).then(krempler => {
                this.form.set(krempler.toForm());
                this.form.validate();
            });
            this.props.setParentTitle("kremplerbearbeiten");        
        } else {
            this.form.set(Krempler.random().toForm());     
            this.form.validate();            
            this.props.setParentTitle("kremplerhinzufügen");        
        }
        
    }

    onSubmit(form) {
        const krempler = Krempler.fromForm(form.values());
        if (!krempler.id) 
            return this.props.kremplerStore.createKrempler(krempler)
            .then(
                (krempler) => {
                    toast.success("Krempler "+krempler.first_name+" "+krempler.last_name+" erfolgreich erstellt!");
                    this.props.history.push(`/krempler/${krempler.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
        else 
            return this.props.kremplerStore.updateKrempler(krempler)
            .then(
                (krempler) => {
                    toast.success("Krempler "+krempler.first_name+" "+krempler.last_name+" erfolgreich bearbeitet!");
                    this.props.history.push(`/krempler/${krempler.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
    }

    onError(form) {
        toast.error("Bitte Eingabe prüfen.");
    }

    render() {
        if (this.props.kremplerStore.isLoading) {
            return <LoadingSpinner />;            
        }

        return (
            <div className="container">
                <form className="col-lg-8 col-lg-offset-2" onSubmit={this.form.onSubmit}>
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Allgemein</h3>
                        </div>
                    </div>
                    <DefaultHidden field={this.form.$("id")} />
                    <div className="row">
                        <DefaultInput field={this.form.$("email")} className="col-lg-6" />
                        <DefaultInput field={this.form.$("emailRepeat")} className="col-lg-6" />
                    </div>
                    <div className="row">
                        <DefaultInput field={this.form.$("firstName")} className="col-lg-6" />
                        <DefaultInput field={this.form.$("lastName")} className="col-lg-6" />
                    </div>
                    <div className="row">
                        <DefaultSelect field={this.form.$("gender")} className="col-lg-6" />
                        <DatePicker field={this.form.$("birthday")} className="col-lg-6" />
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Kontaktdaten</h3>
                        </div>
                    </div>
                    <div className="row">
                        <DefaultInput field={this.form.$("street")} className="col-lg-12" />
                    </div>
                    <div className="row">
                        <DefaultInput field={this.form.$("postal_code")} className="col-lg-4" />
                        <DefaultInput field={this.form.$("city")} className="col-lg-8" />
                    </div>
                    <div className="row">
                        <DefaultInput field={this.form.$("phone")} className="col-lg-6" />
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Vertragsinformationen</h3>
                        </div>
                    </div>
                    <div className="row">
                        <DatePicker field={this.form.$("contract_start")} className="col-lg-6" />
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-12">
                        <label className="control-label" htmlFor={this.form.$("tax_number").id}>{this.form.$("tax_number").label}</label>
                            <div className="row">
                                <DefaultInput field={this.form.$("tax_number")} className="col-lg-6" nolabel/>
                                <DefaultCheckbox field={this.form.$("is_turnover_tax_subject")} className="col-lg-6" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <h3>Kontoinformationen</h3>
                        </div>
                    </div>
                    <div className="row">
                        <DefaultInput field={this.form.$("account_holder")} className="col-lg-6" />
                    </div>
                    <div className="row">
                        <DefaultInput field={this.form.$("account_iban")} className="col-lg-6" />
                        <DefaultInput field={this.form.$("account_bic")} className="col-lg-6" />
                    </div>
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
export default KremplerFormContainer;
