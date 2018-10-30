import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { smoothlyMenu } from "services/inspinia/helpers";
import $ from "jquery";
import classNames from "classnames";
import messages from "./messages.js";
import { inject } from "mobx-react";

@inject("authStore")
class TopHeader extends React.Component {
    
    static propTypes = {
        authStore: PropTypes.object,
        title: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            navbarActive: false,
        }
    }

    toggleNavigation(e) {
        e.preventDefault();
        $("body").toggleClass("mini-navbar");
        smoothlyMenu();
        const {navbarActive} = this.state;
        this.setState({navbarActive: !navbarActive});
    }

    render() {
        const {navbarActive} = this.state;
        const title = this.props.title.toLowerCase();
        return (
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2" onClick={this.toggleNavigation.bind(this)} href="#">
                            <i className={classNames("fa", {"fa-bars": !navbarActive,"fa-times": navbarActive})}></i>
                        </a>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <a href="" onClick={() => this.props.authStore.logout()}>
                                <i className="fa fa-sign-out"></i>
                                <span className="logout">
                                    <FormattedMessage  {...messages.logout} />
                                </span>
                            </a>
                        </li>
                    </ul>
                    <ul className="nav navbar-top-links text-center">
                        <li>
                            <h2>
                                {(title && title.length !== 0) && <FormattedMessage {...messages[title]} />}
                            </h2>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default TopHeader;
