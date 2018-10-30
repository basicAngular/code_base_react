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

export default class Kressist {
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
        this.gender = "male";
    }

    static fromApi(values) {
        let kressist = new Kressist();
        kressist.id = values.id.toString();
        kressist.number = values.number;        
        kressist.email = values.email;
        kressist.first_name = values.first_name;
        kressist.last_name = values.last_name;
        kressist.krempler = values.krempler_id.toString();        
        kressist.birthday = values.birthday;
        kressist.street = values.street;
        kressist.city = values.city;
        kressist.postal_code = values.postal_code;
        kressist.phone = values.phone;
        kressist.gender = values.gender;
        return kressist;
    }


    static fromForm(values) {
        let kressist = new Kressist();
        kressist.id = values.id;
        kressist.email = values.email;
        kressist.first_name = values.firstName;
        kressist.last_name = values.lastName;
        kressist.krempler = values.krempler;        
        kressist.birthday = values.birthday;
        kressist.street = values.street;
        kressist.city = values.city;
        kressist.postal_code = values.postal_code;
        kressist.phone = values.phone;
        kressist.gender = values.gender;
        return kressist;
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
            "gender": this.gender
        };
    }

    static empty() {
        return new Kressist();
    }

    static random() {
        let kressist = new Kressist();
        kressist.email = faker.internet.email();
        kressist.first_name = faker.name.firstName();
        kressist.last_name = faker.name.lastName();
        kressist.birthday = faker.date.past();
        kressist.street = faker.address.streetName();
        kressist.city = faker.address.city();
        kressist.postal_code = faker.address.zipCode();
        kressist.phone = faker.phone.phoneNumber();
        kressist.gender = faker.random.boolean() ? "male" : "female";
        return kressist;
    }
}
