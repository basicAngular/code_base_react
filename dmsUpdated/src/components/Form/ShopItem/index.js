import validatorjs from "validatorjs";
import { Form } from "mobx-react-form";

validatorjs.useLang("de");

class ShopItemForm extends Form {
    constructor(successCallback = () => {}, errorCallback = () => {}) {
        super();
        this.successCallback = successCallback;
        this.errorCallback = errorCallback;
    }

      /*
        Below we are returning a `plugins` object using the `validatorjs` package
        to enable `DVR` functionalities (Declarative Validation Rules).
      */
    plugins() {
        return { dvr: validatorjs };
    }
    
      /*
        Return the `fields` as a collection into the `setup()` method
        with a `rules` property for the validation.
      */
    setup() {
        return {
            fields: [
                {
                    name: "id",
                    rules: "string",
                    type: "hidden"
                },
                {
                    name: "number",
                    label: "Nummer",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "title",
                    label: "Bezeichnung",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "description",
                    label: "Beschreibung",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "price",
                    label: "Preis",
                    rules: "required|numeric",
                },
                {
                    name: "enabled",
                    type: "checkbox",
                    label: "Im Shop zeigen",
                    rules: "boolean"
                },
                {
                    name: "available",
                    type: "checkbox",
                    label: "Verfügbar",
                    rules: "boolean"
                }
            ],
        };
    }
      /*
        Event Hooks
      */
    hooks() {
        return {
            /*
                Success Validation Hook
            */
            onSuccess(form) {
                return this.successCallback(form);
            },

            onError(form) {
                return this.errorCallback(form);                
            }
        };
    }
}

export default ShopItemForm;

