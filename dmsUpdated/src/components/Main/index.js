import React from "react";
import PropTypes from "prop-types";
import Progress from "components/Pace";
import Navigation from "components/Navigation";
import Footer from "components/Footer";
import TopHeader from "components/TopHeader";
import { correctHeight, detectBody } from "services/inspinia/helpers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import BodyModification from "components/BodyModification";
import $ from "jquery";
import { Switch, Route, withRouter } from "react-router-dom";

import Shop from "scenes/Shop";
import Profile from "scenes/Profile";
import FileBrowser from "scenes/FileBrowser"
import Page404 from "components/404";
import Timeline from "components/Timeline";
import KremplerOverview from "scenes/Krempler";
import KremplerForm from "scenes/Krempler/scenes/KremplerForm";
import KremplerProfilePage from "scenes/Krempler/scenes/KremplerProfilePage";
import CustomerOverview from "scenes/Customer";
import CustomerForm from "scenes/Customer/scenes/CustomerForm";
import CustomerProfilePage from "scenes/Customer/scenes/CustomerProfilePage";

import VaccinationOverview from "scenes/Vaccination";
import VaccinationForm from "scenes/Vaccination/scenes/VaccinationForm";
import VaccinationDetail from "scenes/Vaccination/scenes/VaccinationDetail";

import KrempelShopManagement from "scenes/KrempelShopManagement";
import KrempelShopItemForm from "scenes/KrempelShopManagement/scenes/ItemForm";
import KrempelShopItemDetail from "scenes/KrempelShopManagement/scenes/ItemDetail";

import KressistOverview from "scenes/Kressist";
import KressistForm from "scenes/Kressist/scenes/KressistForm";
import KressistProfilePage from "scenes/Kressist/scenes/KressistProfilePage";

import Locker from "scenes/Locker";
import SearchBrowser from "scenes/SearchBrowser";

import VacPass from "scenes/VacPass";
import Scheduler from "scenes/Scheduler";
import Services from "scenes/Services";

import News from "scenes/News";

@withRouter
class Main extends React.Component {
    state = {
        title: "",
        sweetAlert: null,
    }

    setTitle(title) {
        this.setState({...this.state, title});
    }

    showSweetAlert(sweetAlert) {
        this.setState({...this.state, sweetAlert});
    }

    hideSweetAlert() {
        this.setState({...this.state, sweetAlert: null});
    }

    render() {
        let wrapperClass = "gray-bg " + this.props.location.pathname;
        const childRenderer = (Component, routerProps) => <Component 
                                                            setParentTitle={this.setTitle.bind(this)} 
                                                            showSweetAlert={this.showSweetAlert.bind(this)} 
                                                            hideSweetAlert={this.hideSweetAlert.bind(this)} 
                                                            {...routerProps}/>;
        
        return (
            <BodyModification isWhite={false}>
                <div id="wrapper">
                    {this.state.sweetAlert}
                    <ToastContainer 
                        position="bottom-right"
                        type="default"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        pauseOnHover
                    />
                    <Progress modification="progress-bar-success"/>
                    <Navigation location={this.props.location}/>
                    <div id="page-wrapper" className={wrapperClass}>
                        <TopHeader title={this.state.title} />
                        <div className="animated fadeInDown">
                            <div className="wrapper wrapper-content ">
                                <Switch>
                                    <Route name="Shop" exact path="/shop" render={(props) => (childRenderer(Shop, props))} />
                                    <Route name="Profile" exact path="/profile" render={(props) => (childRenderer(Profile, props))} />
                                    <Route name="FileBrowser" exact path="/browser" render={(props) => (childRenderer(FileBrowser, props))} />

                                    <Route name="Dashboard" exact path="/" render={(props) => (childRenderer(Timeline, props))} />
                                    <Route name="Krempler" exact path="/krempler" render={(props) => (childRenderer(KremplerOverview, props))} />
                                    <Route name="Krempler hinzufügen" exact path="/krempler/new" render={(props) => (childRenderer(KremplerForm, props))} />
                                    <Route name="Krempler bearbeiten" exact path="/krempler/:id/edit" render={(props) => (childRenderer(KremplerForm, props))} />
                                    <Route name="Krempler anzeigen" exact path="/krempler/:id/" render={(props) => (childRenderer(KremplerProfilePage, props))} />
                                    
                                    <Route name="Kunden" exact path="/customer" render={(props) => (childRenderer(CustomerOverview, props))} />
                                    <Route name="Kunde hinzufügen" exact path="/customer/new" render={(props) => (childRenderer(CustomerForm, props))} />
                                    <Route name="Kunde bearbeiten" exact path="/customer/:id/edit" render={(props) => (childRenderer(CustomerForm, props))} />
                                    <Route name="Kunde anzeigen" exact path="/customer/:id/" render={(props) => (childRenderer(CustomerProfilePage, props))} />
                                    <Route name="FileBrowser" exact path="/customer/:id/files" render={(props) => (childRenderer(FileBrowser, props))} />
                                    
                                    <Route name="Krempler Assistenten" exact path="/kressist" render={(props) => (childRenderer(KressistOverview, props))} />
                                    <Route name="Krempler Assistent hinzufügen" exact path="/kressist/new" render={(props) => (childRenderer(KressistForm, props))} />
                                    <Route name="Krempler Assistent bearbeiten" exact path="/kressist/:id/edit" render={(props) => (childRenderer(KressistForm, props))} />
                                    <Route name="Krempler Assistent anzeigen" exact path="/kressist/:id/" render={(props) => (childRenderer(KressistProfilePage, props))} />

                                    <Route name="Impfungen" exact path="/vaccination" render={(props) => (childRenderer(VaccinationOverview, props))} />
                                    <Route name="Impfung hinzufügen" exact path="/vaccination/new" render={(props) => (childRenderer(VaccinationForm, props))} />
                                    <Route name="Impfung bearbeiten" exact path="/vaccination/:id/edit" render={(props) => (childRenderer(VaccinationForm, props))} />
                                    <Route name="Impfung anzeigen" exact path="/vaccination/:id/" render={(props) => (childRenderer(VaccinationDetail, props))} />
                                
                                    <Route name="Krempelladenverwaltung" exact path="/shop-administration" render={(props) => (childRenderer(KrempelShopManagement, props))} />
                                    <Route name="Artikel hinzufügen" exact path="/shop-administration/new" render={(props) => (childRenderer(KrempelShopItemForm, props))} />
                                    <Route name="Artikel bearbeiten" exact path="/shop-administration/:id/edit" render={(props) => (childRenderer(KrempelShopItemForm, props))} />
                                    <Route name="Artikel anzeigen" exact path="/shop-administration/:id/" render={(props) => (childRenderer(KrempelShopItemDetail, props))} />
                                

                                    <Route name="Schließfach" exact path="/locker" render={(props) => (childRenderer(Locker, props))} />
                                    <Route name="Termine" exact path="/scheduler" render={(props) => (childRenderer(Scheduler, props))} />
                                    <Route name="Impfpass" exact path="/vac" render={(props) => (childRenderer(VacPass, props))} />

                                    <Route name="Suche" exact path="/search" render={(props) => (childRenderer(SearchBrowser, props))} />
                                    <Route name="Service" exact path="/services" render={(props) => (childRenderer(Services, props))} />
                                    <Route name="News" exact path="/news" render={(props) => (childRenderer(News, props))} />

                                    <Route render={(props) => (childRenderer(Page404, props))} />
                                </Switch>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BodyModification>
        );
    }

    componentDidMount() {

        // Run correctHeight function on load and resize window event
        $(window).bind("load resize", function() {
            correctHeight();
            detectBody();
        });

        // Correct height of wrapper after metisMenu animation.
        $(".metismenu a").click(() => {
            setTimeout(() => {
                correctHeight();
            }, 300);
        });
    }
}

export default Main;

Main.propTypes = {
    location: PropTypes.object,
}