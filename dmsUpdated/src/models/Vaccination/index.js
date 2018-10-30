import Validator from "validatorjs";
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

export default class Vaccination {
    constructor() {
        this.id = "";
        this.title = "";
        this.interval = "";
        this.priority = "";
        this.meta = {};
    }

    static priorities = {
        "0": "Notwendig",
        "1":"Empfehlenswert",
        "2":"Wahlweise"
    }

    static textInterval(interval) {
        if (interval === 0)
            return "Einmalig";
        else if (interval === 12)
            return "JÃ¤hrlich";
        else if (interval % 12 === 0)
            return `Alle ${interval / 12} Jahre`;
        else
            return `Alle ${interval} Monate`;

    }

    static fromApi(values) {
        let vaccination = new Vaccination();
        vaccination.id = values.id.toString();
        vaccination.title = values.title;
        vaccination.interval = values.interval;
        vaccination.priority = values.priority;
        vaccination.meta = {
            "deleted_at": values.deleted_at,
            "created_at": values.created_at,
            "updated_at": values.updated_at
        };
        return vaccination;
    }


    static fromForm(values) {
        let result = {};
        result.id = values.id;
        result.title = values.title;
        result.interval = values.onetime ? 0 : values.interval;
        result.priority = values.priority;
        return result;
    }

    toForm() {
        return {
            "id": this.id,
            "title": this.title,
            "interval": this.interval,
            "priority": this.priority,
            "onetime": this.interval === 0,
        };
    }

    static empty() {
        return new Vaccination();
    }

    static random() {
        let vaccination = new Vaccination();
        vaccination.title = faker.lorem.words();
        vaccination.interval = faker.random.boolean() ? 0 : faker.random.number({ min: 6, max: 12 });
        vaccination.priority = faker.random.number({ min: 0, max: 2 });
        return vaccination;
    }
}
