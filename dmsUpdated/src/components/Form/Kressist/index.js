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

// @inject("kressistStore")
class KressistForm extends Form {
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
                    name: "krempler",
                    label: "Krempler",
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

// export default new KressistForm();
export default KressistForm;

// export default new KressistForm();

// class KressistForm extends React.Component {
//     render() {
//         return (
//             <Form
//                 defaultValues={{
//                     subscribe: true,
//                     adult: false,
//                     birthday: "2017-04-01",
//                 }}
//             >
//                 {({ handleSubmit, values, dirty, touched, resetForm }) => {
//                     return (
//                         <form onSubmit={handleSubmit}>
//                             <div className="row">
//                                 <div className="col-xs-12">
//                                     <h3>Allgemein</h3>
//                                 </div>
//                             </div>

//                             <div className="row">
//                                 <TextField label="E-Mail" field="email" className="form-control" type="text" col="col-lg-6" />
//                                 <TextField label="E-Mail wiederholen" field="email_repeat" className="form-control" type="text" col="col-lg-6" />
//                             </div>
//                             <div className="row">
//                                 <TextField label="Vorname" field="first_name" className="form-control" type="text" col="col-lg-6" />
//                                 <TextField label="Nachname" field="last_name" className="form-control" type="text" col="col-lg-6" />
//                             </div>
//                             <div className="row">
//                                 <div className="form-group col-lg-6">
//                                     <label className="control-label">Geschlecht</label>
//                                     <div>

//                                     </div>
//                                 </div>
//                                 <DateTimePickerInput label="Geburtstag" field="birthday" className="form-control" showTime={false} col="col-lg-6" />
//                             </div>
//                             <div className="row">
//                                 <div className="col-xs-12">
//                                     <h3>Kontaktdaten</h3>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <TextField label="Straße" field="street" className="form-control" type="text" col="col-lg-12" />
//                             </div>
//                             <div className="row">
//                                 <TextField label="Postleitzahl" field="postal_code" className="form-control" type="text" col="col-lg-4" />
//                                 <TextField label="Ort" field="city" className="form-control" type="text" col="col-lg-8" />
//                             </div>
//                             <div className="row">
//                                 <TextField label="Telefon" field="phone" className="form-control" type="text" col="col-lg-6" />
//                             </div>
//                             <div className="row">
//                                 <div className="col-xs-12">
//                                     <h3>Vertragsinformationen</h3>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="form-group col-lg-6">
//                                     <label className="control-label">Vertragsstart</label>
//                                     <div>
//                                         {/* <Field field="contract_start" className="form-control" component={dateTimePicker} showTime={false} /> */}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="form-group col-lg-12">
//                                     <label className="control-label">Steuernummer</label>
//                                     <div className="row">
//                                         <div className="col-lg-6">
//                                             <TextField label="Steuernummer" field="tax_number" className="form-control" placeholder="Steuernummer"/>
//                                         </div>
//                                         <div className="col-lg-6">
//                                             <label className="checkbox">
//                                                 <Checkbox field="is_turnover_tax_subject" /> Umsatzsteuerpflichtig
//                                             </label>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-xs-12">
//                                     <h3>Kontoinformationen</h3>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <TextField label="Kontoinhaber" field="account_holder" type="text" col="col-lg-6" help="Freilassen, wenn identisch mit Kunde" placeholder="" />
//                             </div>
//                             <div className="row">
//                                 <TextField label="IBAN" field="account_iban" type="text" col="col-lg-6" />
//                                 <TextField label="BIC" field="account_bic" type="text" col="col-lg-6" />
//                             </div>
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <button className="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit" disabled={touched && dirty}>Speichern</button>
//                                     <button className="btn btn-sm button  m-t-n-xs" type="button" disabled={touched && dirty} onClick={resetForm}>Formular zurücksetzen</button>
//                                 </div>
//                             </div>
//                         </form>

//                     );
//                 }}
//             </Form>
//         );
//     }
// }

// export default KressistForm;
