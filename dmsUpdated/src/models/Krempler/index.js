import Validator from "validatorjs";
import moment from "moment";
import faker from "faker";
faker.locale = "de";

export const validate = data => {
    const rules = {
        firstName: "required",
        lastName: "required",
        email: "required|email",
        age: "min:18"
    };

    const validator = new Validator(data, rules);
    validator.pass();
};

export default class Krempler {
    
    constructor() {
        this.id = "";
        this.email = "";
        this.first_name = "";
        this.last_name = "";
        this.birthday = moment().format("YYYY-MM-DD");
        this.street = "";
        this.city = "";
        this.postal_code = "";
        this.phone = "";
        this.contract_start = moment().format("YYYY-MM-DD");
        this.contract_state = "start";
        this.tax_number = "";
        this.is_turnover_tax_subject = false;
        this.account_holder = "";
        this.account_iban = "";
        this.account_bic = "";
        this.gender = "male";
    }

    static fromApi(values) {
        let krempler = new Krempler();
        krempler.id = values.id.toString();
        krempler.number = values.number;        
        krempler.email = values.email;
        krempler.first_name = values.first_name;
        krempler.last_name = values.last_name;
        krempler.birthday = values.birthday;
        krempler.street = values.street;
        krempler.city = values.city;
        krempler.postal_code = values.postal_code;
        krempler.phone = values.phone;
        krempler.contract_start = values.contract_start;
        krempler.tax_number = values.tax_number;
        krempler.is_turnover_tax_subject = values.is_turnover_tax_subject === 1;
        krempler.account_holder = values.account_holder || "";
        krempler.account_iban = values.account_iban;
        krempler.account_bic = values.account_bic;
        krempler.gender = values.gender;
        return krempler;
    }


    static fromForm(values) {
        let krempler = new Krempler();
        krempler.id = values.id;
        krempler.email = values.email;
        krempler.first_name = values.firstName;
        krempler.last_name = values.lastName;
        krempler.birthday = values.birthday;
        krempler.street = values.street;
        krempler.city = values.city;
        krempler.postal_code = values.postal_code;
        krempler.phone = values.phone;
        krempler.contract_start = values.contract_start;
        krempler.tax_number = values.tax_number;
        krempler.is_turnover_tax_subject = values.is_turnover_tax_subject;
        krempler.account_holder = values.account_holder;
        krempler.account_iban = values.account_iban;
        krempler.account_bic = values.account_bic;
        krempler.gender = values.gender;
        return krempler;
    }

    toForm() {
        return {
            "id": this.id,
            "email": this.email,
            "emailRepeat": this.email,
            "firstName": this.first_name,
            "lastName": this.last_name,
            "birthday": moment(this.birthday, "YYYY-MM-DD").toDate(),
            "street": this.street,
            "city": this.city,
            "postal_code": this.postal_code,
            "phone": this.phone,
            "contract_start": moment(this.contract_start, "YYYY-MM-DD").toDate(),
            "tax_number": this.tax_number,
            "is_turnover_tax_subject": this.is_turnover_tax_subject,
            "account_holder": this.account_holder,
            "account_iban": this.account_iban,
            "account_bic": this.account_bic,
            "gender": this.gender
        };
    }

    static empty() {
        return new Krempler();
    }

    static random() {
        let krempler = new Krempler();
        krempler.email = faker.internet.email();
        krempler.first_name = faker.name.firstName();
        krempler.last_name = faker.name.lastName();
        krempler.birthday = faker.date.past();
        krempler.street = faker.address.streetName();
        krempler.city = faker.address.city();
        krempler.postal_code = faker.address.zipCode();
        krempler.phone = faker.phone.phoneNumber();
        krempler.contract_start = faker.date.future();
        krempler.tax_number = faker.random.number().toString();
        krempler.is_turnover_tax_subject = faker.random.boolean();
        krempler.account_holder = faker.random.boolean() ? "" : faker.name.findName();
        krempler.account_iban = faker.finance.iban();
        krempler.account_bic = faker.finance.bic();
        krempler.gender = faker.random.boolean() ? "male" : "female";
        return krempler;
    }
}
