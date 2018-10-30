import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import Login from "./../../scenes/Login";
import Main from "./../../components/Main";
@inject("authStore", "commonStore")
@withRouter
@observer
export default class Root extends Component {
    componentWillMount() {
        if (!this.props.commonStore.token) {
            this.props.commonStore.setAppLoaded();
        }
    }
    
    componentDidMount() {
        if (this.props.commonStore.token) {
            this.props.authStore.pullUser()
                .finally(() => this.props.commonStore.setAppLoaded());  
        }
    }
    
    render() {
        if (this.props.commonStore.appLoaded) {
            return (
                <div>
                    <Switch>
                        <Route name="Login" path="/login" component={Login} />
                        {this.props.authStore.isAuthenticated && <Route name="App" path="/" component={Main} />}
                        {!this.props.authStore.isAuthenticated && <Redirect to="/login" push />}
                        {/* <IndexRedirect to="dashboard"/> */}
                    </Switch>
                    
                </div>
            );
        }
        return (
            <div>Loading...</div>
        );
    }
}

Root.propTypes = {
    authStore: React.PropTypes.object,
    commonStore: React.PropTypes.object,
};
