import validatorjs from "validatorjs";
import { Form } from "mobx-react-form";

validatorjs.useLang("de");

class VaccinationForm extends Form {
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
                    name: "title",
                    label: "Impfung",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "priority",
                    label: "Priorität",
                },
                {
                    name: "interval",
                    label: "Alle ... Monate",
                    placeholder: "",
                    rules: "required|integer",
                },
                {
                    name: "onetime",
                    type: "checkbox",
                    label: "Eimalig",
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

export default VaccinationForm;

