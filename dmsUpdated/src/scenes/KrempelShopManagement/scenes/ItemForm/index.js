import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import ShopItemForm from "components/Form/ShopItem";
import { observer, inject } from "mobx-react";
import {DefaultInput, DefaultSelect, DefaultHidden, DefaultCheckbox, DefaultTextArea} from "components/Form/components/MobxFormHelpers";
import LoadingSpinner from "components/LoadingSpinner";
import {toast} from "react-toastify";
import ShopItem from "models/ShopItem";

@inject("shopItemStore")
@withRouter
@observer
class ItemFormContainer extends React.Component {
        
    static propTypes = {
        match: PropTypes.object,
        history: PropTypes.object,
        shopItemStore: PropTypes.object,
        setParentTitle: PropTypes.func
    }
    
    constructor(props) {
        super(props);
        this.form = new ShopItemForm(this.onSubmit.bind(this), this.onError.bind(this));
    }

    componentWillMount() {
        if (this.props.match.params.id) {
            this.props.shopItemStore.load(this.props.match.params.id).then(shop_item => {
                this.form.set(shop_item.toForm());

                this.form.validate();
            });
            this.props.setParentTitle("shopbearbeiten");        
        } else {
            this.form.set(ShopItem.random().toForm());     
            this.form.validate();            
            this.props.setParentTitle("shophinzufügen");        
        }
    }

    onSubmit(form) {
        const shop_item = ShopItem.fromForm(form.values());
        if (!shop_item.id) 
            return this.props.shopItemStore.create(shop_item)
            .then(
                (shop_item) => {
                    toast.success("Artikel "+shop_item.title+" erfolgreich erstellt!");
                    this.props.history.replace(`/shop-administration/${shop_item.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
        else 
            return this.props.shopItemStore.update(shop_item)
            .then(
                (shop_item) => {
                    toast.success("Artikel "+shop_item.title+" erfolgreich bearbeitet!");
                    this.props.history.replace(`/shop-administration/${shop_item.id}`);
                })
            .catch((err) => {
                toast.error("Beim Übermitteln der Daten ist ein Fehler aufgetreten.");
            });
    }

    onError(form) {
        toast.error("Bitte Eingabe prüfen.");
    }

    render() {
        if (this.props.shopItemStore.isLoading) {
            return <LoadingSpinner />;            
        }

        return (
            <div className="container">
            <form className="col-lg-8 col-lg-offset-2" onSubmit={this.form.onSubmit}>
                                <div className="row">
                </div>
                <DefaultHidden field={this.form.$("id")} />
                <div className="row">
                    <DefaultInput field={this.form.$("number")} className="col-lg-6" />
                    <DefaultInput field={this.form.$("title")} className="col-lg-6" />                                        
                </div>
                <div className="row">
                    <DefaultInput field={this.form.$("price")} className="col-lg-6" />
                </div>
                <div className="row">
                    <DefaultTextArea field={this.form.$("description")} className="col-lg-12" rows="5" />                    
                </div>
                <div className="row">
                    <DefaultCheckbox field={this.form.$("enabled")} className="col-lg-6" />   
                </div>
                <div className="row">                                     
                    <DefaultCheckbox field={this.form.$("available")} className="col-lg-6" />                
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
export default ItemFormContainer;
