/// <reference types="react" />
import * as React from "react";
import { LocaleStore } from "./LocaleStore";
export declare const MobxIntlProvider: React.ClassicComponentClass<{
    locale: LocaleStore;
    children: any;
}> & {
    wrappedComponent: React.StatelessComponent<{}> | React.ComponentClass<{}>;
    wrappedInstance: void | React.ReactElement<{}>;
};
