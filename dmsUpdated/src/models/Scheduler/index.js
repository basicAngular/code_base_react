import moment from "moment";
import faker from 'faker';
faker.locale = "de";

export default class Event {
    constructor() {
        this.id = "";
        this.title = "";
        this.all_day = false;
        this.start = moment().format('YYYY-MM-DD');
        this.end = moment().format('YYYY-MM-DD');
    }

    static fromApi(values) {
        let event = new Event();
        event.id = values.id;
        event.title = values.title;
        event.all_day = values.all_day;
        event.start = moment(values.start).format('YYYY-MM-DD');
        event.end = moment(values.end).format('YYYY-MM-DD');
        return event;
    }


    static fromForm(values) {
        let event = new Event();
        event.id = values.id;
        event.title = values.title;
        event.all_day = values.all_day;
        event.start = moment(values.start).format('YYYY-MM-DD');
        event.end = moment(values.end).format('YYYY-MM-DD');
        return event;
    }

    toForm() {
        return {
            "id": this.id,
            "title": this.title,
            "all_day": this.all_day,
            "start": moment(this.start).format('YYYY-MM-DD'),
            "end": moment(this.end).format('YYYY-MM-DD')
        };
    }

    static empty() {
        return new Event();
    }

    static random() {
        let event = new Event();
        event.id = 0;
        event.title = "";
        event.all_day = false;
        event.start = moment().format('YYYY-MM-DD');
        event.end = moment().format('YYYY-MM-DD');
        return event;
    }
}
