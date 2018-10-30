import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";
import momentLocalizer from "react-widgets/lib/localizers/moment";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { IntlProvider } from "react-intl";
import { addLocaleData } from "react-intl";
import locale_en from "react-intl/locale-data/en";
import locale_de from "react-intl/locale-data/de";
import messages_de from "../translations/locales/de.json";
import messages_en from "../translations/locales/en.json";
import promiseFinally from "promise.prototype.finally";
import store from "./stores";
import App from "./components/Root";
import jQuery from "jquery";
window.$ = jQuery;
window.jQuery = jQuery;
require("jquery");
require("metismenu");
require("bootstrap");

import "./style/app.scss";

moment.locale("en");
//moment.lang("de").format('LLL');
momentLocalizer(moment);

promiseFinally.shim();
addLocaleData([...locale_en, ...locale_de]);

const messages = {
    "de": messages_de,
    "en": messages_en
};
const language = navigator.language.split(/[-_]/)[0];  // language without region code;

ReactDOM.render(
    <IntlProvider locale={language} messages={messages[language]}>
        <Provider {...store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </IntlProvider>
    , document.getElementById("root")); 
registerServiceWorker();

