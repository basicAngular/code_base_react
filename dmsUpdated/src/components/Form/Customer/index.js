import validatorjs from "validatorjs";
import { Form } from "mobx-react-form";
import moment from "moment";

validatorjs.useLang("de");

// function shouldBeEqualTo(target) {
//     return ({ field, form }) => {
//         const fieldsAreEquals = (form.$(target).value === field.value);
//         return [fieldsAreEquals, `The ${field.label} should be equals to ${form.$(target).label}`];
//     };
// }

// @inject("customerStore")
class CustomerForm extends Form {
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
                    name: "email",
                    label: "E-Mail",
                    placeholder: "",
                    rules: "required|email",
                }, 
                {
                    name: "emailRepeat",
                    label: "E-Mail wiederholen",
                    placeholder: "",
                    validators: [({ field, form }) => {
                        const fieldsAreEquals = (form.$("email").value === field.value);
                        return [fieldsAreEquals, "Die E-Mails müssen übereinstimmen."];
                    }],
                    rules: "required",
                }, 
                {
                    name: "firstName",
                    label: "Vorname",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "lastName",
                    label: "Nachname",
                    placeholder: "",
                    rules: "required|string",
                },
                {
                    name: "krempler",
                    label: "Krempler",
                },
                {
                    name: "birthday",
                    label: "Geburtstag",
                    placeholder: "",
                    rules: "required",
                    input: value => {
                        return (value && moment(value, "YYYY-MM-DD").toDate()) || moment().toDate();
                    },
                    output: value => {
                        return moment(value).format("YYYY-MM-DD");
                    }
                }, 
                {
                    name: "gender",
                    label: "Geschlecht",
                    placeholder: "",
                    rules: "required",
                    extra: [
                        { value: "male", label: "männlich" },
                        { value: "female", label: "weiblich" },
                    ]
                },
                {
                    name: "street",
                    label: "Straße",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "postal_code",
                    label: "Postleitzahl",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "city",
                    label: "Stadt",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "phone",
                    label: "Telefonnummer",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "contract_start",
                    label: "Vertragsstart",
                    placeholder: "",
                    rules: "required",
                    input: value => (value && moment(value, "YYYY-MM-DD").toDate()) || moment().toDate(),
                    output: value => moment(value).format("YYYY-MM-DD"),
                },                 
                {
                    name: "account_holder",
                    label: "Kontoinhaber",
                    placeholder: "Freilassen, wenn gleich identisch mit Vertragsinhaber",
                    rules: "string",
                }, 
                {
                    name: "account_iban",
                    label: "IBAN",
                    placeholder: "",
                    rules: "required|string",
                }, 
                {
                    name: "account_bic",
                    label: "BIC",
                    placeholder: "",
                    rules: "required|string",
                }, 
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

export default CustomerForm;

