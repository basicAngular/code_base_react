import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { observer, inject } from "mobx-react";
import $ from "jquery";
import messages from "./messages";
import dummyMan from "data/img/dummy_man.png";
import plogo from "data/img/p-logo.png";

@inject("authStore")
@observer
class Navigation extends Component {

    static propTypes = {
        authStore: PropTypes.object,
        location: PropTypes.object
    }

    componentDidMount() {
        const { menu } = this.refs;
        $(menu).metisMenu();
    }

    activeRoute(routeName, exact = false) {
        if (exact)
            return this.props.location.pathname === routeName ? "active" : "";
        else
            return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }

    secondLevelActive(routeNames) {
        return routeNames.filter(v => this.props.location.pathname === v).length > 0 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
    }

    translateRole(role) {
        const roles = {
            "admin": "Administrator",
            "kressist": "Krempler Assistent",
            "krempler": "Krempler",
            "customer": "Kunde",
        };
        return roles[role];
    }

    renderNavigationHeader() {
        return (
            <li className="nav-header">
                <div className="dropdown profile-element">
                    <span>
                        <img alt="profile" style={{ height: "48px", width: "48px", backgroundColor: "#fff" }} className="img-circle" src={dummyMan} />
                    </span>
                    <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                        <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">{this.props.authStore.user.first_name} {this.props.authStore.user.last_name}</strong>
                        </span> <span className="text-muted text-xs block">{this.props.authStore.user.role}<b className="caret"></b></span> </span> </a>
                    <ul className="dropdown-menu animated m-t-xs">
                        <li><a onClick={() => this.props.authStore.logout()}> Abmelden</a></li>
                    </ul>
                </div>
                <div className="logo-element">
                    <img alt="logo" style={{ height: "48px", width: "48px" }} className="img-circle" src={plogo} />
                </div>
            </li>
        );
    }

    renderAdminNavigation() {

        return (
            <nav className="navbar-default navbar-static-side" role="navigation">
                <ul className="nav metismenu" id="side-menu" ref="menu">
                    {this.renderNavigationHeader()}
                    <li className={this.activeRoute("/", true)}>
                        <Link to="/"><i className="fa fa-dashboard"></i> <span className="nav-label">Dashboard</span></Link>
                    </li>
                    <li className={this.activeRoute("/profile", true)}>
                        <Link to="/profile">
                            <i className="fa fa-user"></i>
                            <span className="nav-label">
                                <FormattedMessage
                                    {...messages.profileTitle}
                                />
                            </span>
                        </Link>
                    </li>
                    <li className={this.activeRoute("/krempler") || this.activeRoute("/kressist")}>
                        <Link to="/krempler"><i className="fa fa-users"></i> <span className="nav-label">Krempler</span></Link>
                        <ul className={this.secondLevelActive(["/krempler", "/kressist"])}>
                            <li className={this.activeRoute("/krempler")}>
                                <Link to="/krempler"><i className="fa fa-users"></i> <span className="nav-label">
                                    <FormattedMessage
                                        {...messages.overview}
                                    />
                                </span></Link>
                            </li>
                            <li className={this.activeRoute("/kressist")}>
                                <Link to="/kressist"><i className="fa fa-users"></i> <span className="nav-label">
                                    <FormattedMessage
                                        {...messages.assistant}
                                    />
                                </span></Link>
                            </li>
                        </ul>
                    </li>
                    <li className={this.activeRoute("/customer")}>
                        <Link to="/customer"><i className="fa fa-users"></i> <span className="nav-label">
                            <FormattedMessage
                                {...messages.customer}
                            />
                        </span></Link>
                    </li>
                    <li className={this.activeRoute("/vaccination")}>
                        <Link to="/vaccination"><i className="fa fa-stethoscope"></i> <span className="nav-label">
                            <FormattedMessage
                                {...messages.vaccinations}
                            />
                        </span></Link>
                    </li>
                    <li className={this.activeRoute("/shop")}>
                        <Link to="/shop-administration"><i className="fa fa-shopping-cart"></i> <span className="nav-label">
                            <FormattedMessage
                                {...messages.services}
                            />
                        </span></Link>
                    </li>
                    <li className={this.activeRoute("/news")}>
                        <Link to="/news"><i className="fa fa-file-text-o"></i> <span className="nav-label">
                            <FormattedMessage
                                {...messages.news}
                            />
                        </span></Link>
                    </li>
                </ul>
            </nav>
        );
    }

    renderCustomerNavigation() {

        return (
            <div>
                <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        {this.renderNavigationHeader()}
                        <li className={this.activeRoute("/", true)}>
                            <Link to="/"><i className="fa fa-dashboard"></i> <span className="nav-label">Dashboard</span></Link>
                        </li>
                        <li className={this.activeRoute("/profile", true)}>
                            <Link to="/profile">
                                <i className="fa fa-user"></i>
                                <span className="nav-label">
                                    <FormattedMessage
                                        {...messages.profileTitle}
                                    />
                                </span>
                            </Link>
                        </li>
                        <li className={this.activeRoute("/documents") || this.activeRoute("/locker")}>
                            <Link to="/browser">
                                {/* <i className="fa fa-archive"></i>  */}
                                <i className="fa fa-archive"></i><span className="nav-label">
                                    <FormattedMessage
                                        {...messages.documents}
                                    />
                                </span></Link>
                            <ul className={this.secondLevelActive(["/browser", "/locker"])}>
                                <li className={this.activeRoute("/browser", true)}>
                                    <Link to="/browser">
                                        <i className="fa fa-files-o"></i>
                                        <span className="nav-label">
                                            <FormattedMessage
                                                {...messages.filebrowserTitle}
                                            />
                                        </span>
                                    </Link>
                                </li>
                                {/* <li className={this.activeRoute("/company_documents")}>
                                <Link to="/c/company_documents">
                                    <i className="fa fa-building"></i> <span className="nav-label">Firmendokumente</span></Link>
                            </li>
                            <li className={this.activeRoute("/documents/sos")}>
                                <Link to="/c/documents/sos"><i className="fa fa-ambulance"></i> <span className="nav-label">SOS-Dokumente</span></Link>
                            </li>
                            <li className={this.activeRoute("/gmbhdocuments")}>
                                <Link to="/c/gmbhdocuments"><i className="fa fa-inbox"></i> <span className="nav-label">Briefkasten</span></Link>
                            </li> */}
                                <li className={this.activeRoute("/locker")}>
                                    <Link to="/locker"><i className="fa fa-cloud-upload"></i> <span className="nav-label">
                                        <FormattedMessage
                                            {...messages.digitalBox}
                                        />
                                    </span></Link>
                                </li>
                            </ul>
                        </li>

                        <li className={this.activeRoute("/scheduler")}>
                            <Link to="/scheduler"><i className="fa fa-calendar"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.events}
                                />
                            </span></Link>
                        </li>
                        <li className={this.activeRoute("/vac")}>
                            <Link to="/vac"><i className="fa fa-stethoscope"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.vaccinationCertificate}
                                />
                            </span></Link>
                        </li>
                        <li className={this.activeRoute("/meds")}>
                            <Link to="/meds"><i className="fa fa-medkit"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.drugsPlan}
                                />
                            </span></Link>
                        </li>
                        <li className={this.activeRoute("/services")}>
                            <Link to="/services"><i className="fa fa-file-text-o"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.whatDoIHaveWhere}
                                />
                            </span></Link>
                        </li>
                        <li className={this.activeRoute("/news")}>
                            <Link to="/news"><i className="fa fa-file-text-o"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.news}
                                />
                            </span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    renderKremplerNavigation() {
        return (
            <div>
                <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        {this.renderNavigationHeader()}
                        <li className={this.activeRoute("/", true)}>
                            <Link to="/"><i className="fa fa-dashboard"></i> <span className="nav-label">Dashboard</span></Link>
                        </li>
                        <li className={this.activeRoute("/profile", true)}>
                            <Link to="/profile">
                                <i className="fa fa-user"></i>
                                <span className="nav-label">
                                    <FormattedMessage
                                        {...messages.profileTitle}
                                    />
                                </span>
                            </Link>
                        </li>
                        <li className={this.activeRoute("/customer")}>
                            <Link to="/customer"><i className="fa fa-users"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.customer}
                                />
                            </span></Link>
                        </li>
                        <li className={this.activeRoute("/kressist")}>
                            <Link to="/kressist"><i className="fa fa-users"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.assistant}
                                />
                            </span></Link>
                        </li>
                        <li className={this.activeRoute("/search")}>
                            <Link to="/search"><i className="fa fa-binoculars"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.searchdocuments}
                                />
                                </span></Link>
                        </li>
                        <li className={this.activeRoute("/shop", true)}>
                            <Link to="/shop">
                                <i className="fa fa-shopping-cart"></i>
                                <span className="nav-label">
                                    <FormattedMessage
                                        {...messages.shopTitle}
                                    />
                                </span>
                            </Link>
                        </li>
                        <li className={this.activeRoute("/news")}>
                            <Link to="/news"><i className="fa fa-file-text-o"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.news}
                                />
                            </span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    renderKressistNavigation() {
        return (
            <div>
                <nav className="navbar-default navbar-static-side" role="navigation">
                    <ul className="nav metismenu" id="side-menu" ref="menu">
                        {this.renderNavigationHeader()}
                        <li className={this.activeRoute("/", true)}>
                            <Link to="/"><i className="fa fa-dashboard"></i> <span className="nav-label">Dashboard</span></Link>
                        </li>
                        <li className={this.activeRoute("/profile", true)}>
                            <Link to="/profile">
                                <i className="fa fa-user"></i>
                                <span className="nav-label">
                                    <FormattedMessage
                                        {...messages.profileTitle}
                                    />
                                </span>
                            </Link>
                        </li>
                        <li className={this.activeRoute("/customer")}>
                            <Link to="/customer"><i className="fa fa-users"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.customer}
                                />
                            </span></Link>
                        </li>
                        <li className={this.activeRoute("/news")}>
                            <Link to="/news"><i className="fa fa-file-text-o"></i> <span className="nav-label">
                                <FormattedMessage
                                    {...messages.news}
                                />
                            </span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

    render() {
        const { user } = this.props.authStore;
        if (!user || !user.role) return <div />;
        if (user.role === "admin") return this.renderAdminNavigation();
        if (user.role === "krempler") return this.renderKremplerNavigation();
        if (user.role === "kressist") return this.renderKressistNavigation();
        if (user.role === "customer") return this.renderCustomerNavigation();

    }
}

export default Navigation;
