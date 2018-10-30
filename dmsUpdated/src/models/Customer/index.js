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

export default class Customer {
    constructor() {
        this.id = "";
        this.email = "";
        this.first_name = "";
        this.last_name = "";
        this.krempler = "";
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
        let customer = new Customer();
        customer.id = values.id.toString();
        customer.number = values.number;        
        customer.email = values.email;
        customer.first_name = values.first_name;
        customer.last_name = values.last_name;
        customer.krempler = values.krempler_id.toString();
        customer.birthday = values.birthday;
        customer.street = values.street;
        customer.city = values.city;
        customer.postal_code = values.postal_code;
        customer.phone = values.phone;
        customer.contract_start = values.contract_start;
        customer.tax_number = values.tax_number;
        customer.is_turnover_tax_subject = values.is_turnover_tax_subject === 1;
        customer.account_holder = values.account_holder || "";
        customer.account_iban = values.account_iban;
        customer.account_bic = values.account_bic;
        customer.gender = values.gender;
        customer.has_locker_documents = values.has_locker_documents;
        return customer;
    }


    static fromForm(values) {
        let customer = new Customer();
        customer.id = values.id;
        customer.email = values.email;
        customer.first_name = values.firstName;
        customer.last_name = values.lastName;
        customer.krempler = values.krempler;        
        customer.birthday = values.birthday;
        customer.street = values.street;
        customer.city = values.city;
        customer.postal_code = values.postal_code;
        customer.phone = values.phone;
        customer.contract_start = values.contract_start;
        customer.tax_number = values.tax_number;
        customer.is_turnover_tax_subject = values.is_turnover_tax_subject;
        customer.account_holder = values.account_holder;
        customer.account_iban = values.account_iban;
        customer.account_bic = values.account_bic;
        customer.gender = values.gender;
        return customer;
    }
    toForm() {
        return {
            "id": this.id,
            "email": this.email,
            "emailRepeat": this.email,
            "firstName": this.first_name,
            "lastName": this.last_name,
            "krempler": this.krempler,
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
        return new Customer();
    }

    static random() {
        let customer = new Customer();
        customer.email = faker.internet.email();
        customer.first_name = faker.name.firstName();
        customer.last_name = faker.name.lastName();
        customer.birthday = faker.date.past();
        customer.street = faker.address.streetName();
        customer.city = faker.address.city();
        customer.postal_code = faker.address.zipCode();
        customer.phone = faker.phone.phoneNumber();
        customer.contract_start = faker.date.future();
        customer.tax_number = faker.random.number().toString();
        customer.is_turnover_tax_subject = faker.random.boolean();
        customer.account_holder = faker.random.boolean() ? "" : faker.name.findName();
        customer.account_iban = faker.finance.iban();
        customer.account_bic = faker.finance.bic();
        customer.gender = faker.random.boolean() ? "male" : "female";
        return customer;
    }
}
