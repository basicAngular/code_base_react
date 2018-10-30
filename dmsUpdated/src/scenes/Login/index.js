import React, {Component} from "react";
import PropTypes from "prop-types";
import BodyModification from "./../../components/BodyModification";
import {observer} from "mobx-react";
import { inject } from "mobx-react";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import logo from "data/img/p-logo.png";

@inject("authStore")
@withRouter
@observer
class Login extends Component {

    rolebasedRedirectRoute(role) {
        switch (role) {
        // case "admin":
        //     return "/a";
        // case "krempler":
        //     return "/k";
        // case "customer":
        //     return "/c";
        default:
            return "/";    
        }
    }

    rolebasedRedirect(redirect) {
        this.props.history.replace(redirect);
    }

    // componentWillReact() {
    //     if (this.props.authStore.isAuthenticated) {
    //         const redirect = browserHistory.getCurrentLocation().query.redirect || "/";
    //         this.rolebasedRedirect(redirect, this.props.authStore.user);
    //     }
    // }

    componentWillMount() {
        const {isAuthenticated} = this.props.authStore;
        const redirect = qs.parse(this.props.location.search)["redirect"] || "/";
        if (isAuthenticated) {
            this.rolebasedRedirect(redirect, this.props.authStore.user);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isAuthenticated: wasAuthenticated} = this.props.authStore;
        const redirect = qs.parse(this.props.location.search)["redirect"] || "/";
        if (!wasAuthenticated) {
            this.rolebasedRedirect(redirect, this.props.authStore.user);
        }
    }

    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handleSubmitForm = (e) => {
        e.preventDefault();
        this.props.authStore.login()
        .then(() => this.props.history.replace("/"));
    };
  
    render() {
        const isAuthenticated = this.props.authStore.isAuthenticated;
        const { loginForm, errors, inProgress } = this.props.authStore;
        return (
            <BodyModification isWhite={true}>
                <div className="middle-box text-center loginscreen animated fadeInDown">
                    <div>
                        <div className="text-center">
                            <img alt="" style={{}} className="img-circle" src={logo} />
                        </div>
                        <h3>Papierkrempel</h3>
                        <p>Werden Sie <strong>Papierglücklich!</strong></p>
                        {errors && <div className="alert alert-danger"> {errors} </div>}
                            
                        <form className="m-t" role="form" onSubmit={this.handleSubmitForm}>
                            <div className="form-group">
                                <input type="email" className="form-control" value={loginForm.email} onChange={this.handleEmailChange} placeholder="E-Mail" required=""/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" value={loginForm.password} onChange={this.handlePasswordChange} placeholder="Password" required=""/>
                            </div>
                            <button type="submit" disabled={inProgress} className="btn btn-primary block full-width m-b">Login</button>

                            <a href="#">
                                <small>Passwort vergessen?</small>
                            </a>
                        </form>

                        <p className="m-t">
                            <small>Papierkrempel &copy; 2017</small>
                        </p>
                    </div>
                </div>
            </BodyModification>
        );

    }

}


export default Login;

Login.propTypes = {
  authStore: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
}