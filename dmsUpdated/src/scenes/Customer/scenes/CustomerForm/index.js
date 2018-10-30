import { withRouter } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import CustomerForm from "components/Form/Customer";
import { observer, inject } from "mobx-react";
import { DefaultInput, DatePicker, DefaultSelect, DefaultHidden } from "components/Form/components/MobxFormHelpers";
import Customer from "models/Customer";
import LoadingSpinner from "components/LoadingSpinner";
import { toast } from "react-toastify";


@inject("customerStore", "authStore", "kremplerStore")
@withRouter
@observer
class CustomerFormContainer extends React.Component {

    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
        authStore: PropTypes.object,
        kremplerStore: PropTypes.object,
        customerStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.form = new CustomerForm(this.onSubmit.bind(this), this.onError.bind(this));
    }

    componentWillMount() {
        this.props.kremplerStore.loadKremplers();
        if (this.props.match.params.id) {
            this.props.customerStore.loadCustomer(this.props.match.params.id).then(customer => {
                this.form.set(customer.toForm());

                this.form.validate();
            });
            this.props.setParentTitle("kundebearbeiten");        
        } else {
            this.form.set(Customer.random().toForm());     
            this.form.validate();            
            this.props.setParentTitle("kundehinzufügen");        
        }
        
    }

    onSubmit(form) {
        const customer = Customer.fromForm(form.values());
        if (!customer.id) 
            return this.props.customerStore.createCustomer(customer)
            .then(
                (customer) => {
                    toast.success("Customer "+customer.first_name+" "+customer.last_name+" erfolgreich erstellt!");
                    this.props.history.push(`/customer/${customer.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
        else 
            return this.props.customerStore.updateCustomer(customer)
            .then(
                (customer) => {
                    toast.success("Kunde "+customer.first_name+" "+customer.last_name+" erfolgreich bearbeitet!");
                    this.props.history.push(`/customer/${customer.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
    }

    onError(form) {
        toast.error("Bitte Eingabe prüfen.");
    }

    render() {
        if (this.props.customerStore.isLoading || this.props.kremplerStore.isLoading) {
            return <LoadingSpinner />;            
        }
        const kremplers = [];
        this.props.kremplerStore.kremplers.forEach(v => {
            kremplers.push({value: v.id, label: `${v.number} - ${v.first_name} ${v.last_name}`});
        });
        this.form.$("krempler").set("extra", kremplers);
        if (this.props.authStore.user.role === "kressist")
            this.form.$("krempler").set("value", this.props.authStore.user.krempler_id);
        
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
                {this.props.authStore.user.role === "kressist" && <DefaultHidden field={this.form.$("krempler")} />}
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
                  <button className="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit" disabled={false && (this.form.submitting || !this.form.isValid)}>
                    Speichern
                  </button>
                  <button className="btn btn-sm button  m-t-n-xs" type="button" disabled={this.form.isDirty} onClick={this.form.onReset}>
                    Formular zurücksetzen
                  </button>
                </div>
              </div>
              <p>{this.form.error}</p>
            </form>
          </div>
        );
    }   
    
};
export default CustomerFormContainer;
