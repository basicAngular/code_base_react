import { withRouter } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import KressistForm from "components/Form/Kressist";
import { observer, inject } from "mobx-react";
import {DefaultInput, DatePicker, DefaultSelect, DefaultHidden} from "components/Form/components/MobxFormHelpers";
import Kressist from "models/Kressist";
import LoadingSpinner from "components/LoadingSpinner";
import { toast } from "react-toastify";


@inject("kressistStore", "kremplerStore", "authStore")
@withRouter
@observer
class KressistFormContainer extends React.Component {
    
    static propTypes = {
        history: PropTypes.object,
        match: PropTypes.object,
        kremplerStore: PropTypes.object,
        setParentTitle: PropTypes.func,
        kressistStore: PropTypes.object,
        authStore: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.form = new KressistForm(this.onSubmit.bind(this), this.onError.bind(this));
    }

    componentWillMount() {
        this.props.kremplerStore.loadKremplers();        
        if (this.props.match.params.id) {
            this.props.kressistStore.loadKressist(this.props.match.params.id).then(kressist => {
                this.form.set(kressist.toForm());
                this.form.validate();
            });
            this.props.setParentTitle("kremplerassistentbearbeiten");        
        } else {
            this.form.set(Kressist.random().toForm());     
            this.form.validate();            
            this.props.setParentTitle("kremplerassistenthinzufügen");        
        }
        
    }

    onSubmit(form) {
        const kressist = Kressist.fromForm(form.values());
        if (!kressist.id) 
            return this.props.kressistStore.createKressist(kressist)
            .then(
                (kressist) => {
                    toast.success("Krempler Assistent "+kressist.first_name+" "+kressist.last_name+" erfolgreich erstellt!");
                    this.props.history.push(`/kressist/${kressist.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
        else 
            return this.props.kressistStore.updateKressist(kressist)
            .then(
                (kressist) => {
                    toast.success("Krempler Assistent "+kressist.first_name+" "+kressist.last_name+" erfolgreich bearbeitet!");
                    this.props.history.push(`/kressist/${kressist.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
    }

    onError(form) {
        toast.error("Bitte Eingabe prüfen.");
    }

    render() {
        if (this.props.kressistStore.isLoading || this.props.kremplerStore.isLoading) {
            return <LoadingSpinner />;            
        }
        const kremplers = [];
        this.props.kremplerStore.kremplers.forEach(v => {
            kremplers.push({value: v.id, label: `${v.number} - ${v.first_name} ${v.last_name}`});
        });
        this.form.$("krempler").set("extra", kremplers);
        if (this.props.authStore.user.role === "krempler")
            this.form.$("krempler").set("value", this.props.authStore.user.id);
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
                        {this.props.authStore.user.role === "admin" && <DefaultSelect field={this.form.$("krempler")} className="col-lg-6" />}
                        {this.props.authStore.user.role === "krempler" && <DefaultHidden field={this.form.$("krempler")} />}
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
export default KressistFormContainer;
