import moment from "moment";
import faker from 'faker';
faker.locale = "de";

export default class User {
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
        this.tax_number = "";
        this.is_turnover_tax_subject = false;
        this.account_holder = "";
        this.account_iban = "";
        this.account_bic = "";
        this.role = "user";
        this.gender = "male";
    }

    static fromApi(values) {
        let user = new User();
        user.id = values.id.toString();
        user.email = values.email;
        user.first_name = values.first_name;
        user.last_name = values.last_name;
        user.birthday = values.birthday;
        user.street = values.street;
        user.city = values.city;
        user.postal_code = values.postal_code;
        user.phone = values.phone;
        user.tax_number = values.tax_number;
        user.is_turnover_tax_subject = values.is_turnover_tax_subject === 1;
        user.account_holder = values.account_holder || "";
        user.account_iban = values.account_iban;
        user.account_bic = values.account_bic;
        user.gender = values.gender;
        return user;
    }


    static fromForm(values) {
        let user = new User();
        user.id = values.id;
        user.email = values.email;
        user.first_name = values.firstName;
        user.last_name = values.lastName;
        user.birthday = values.birthday;
        user.street = values.street;
        user.city = values.city;
        user.postal_code = values.postal_code;
        user.phone = values.phone;
        user.contract_start = values.contract_start;
        user.tax_number = values.tax_number;
        user.is_turnover_tax_subject = values.is_turnover_tax_subject;
        user.account_holder = values.account_holder;
        user.account_iban = values.account_iban;
        user.account_bic = values.account_bic;
        user.gender = values.gender;
        return user;
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
            "tax_number": this.tax_number,
            "is_turnover_tax_subject": this.is_turnover_tax_subject,
            "account_holder": this.account_holder,
            "account_iban": this.account_iban,
            "account_bic": this.account_bic,
            "gender": this.gender
        };
    }

    static empty() {
        return new User();
    }

    static random() {
        let user = new User();
        user.email = faker.internet.email();
        user.first_name = faker.name.firstName();
        user.last_name = faker.name.lastName();
        user.birthday = faker.date.past();
        user.street = faker.address.streetName();
        user.city = faker.address.city();
        user.postal_code = faker.address.zipCode();
        user.phone = faker.phone.phoneNumber();
        user.tax_number = faker.random.number().toString();
        user.account_holder = faker.random.boolean() ? "" : faker.name.findName();
        user.account_iban = faker.finance.iban();
        user.account_bic = faker.finance.bic();
        user.gender = faker.random.boolean() ? "male" : "female";
        user.role = faker.random.boolean ? "user" : "manager";
        return user;
    }
}
