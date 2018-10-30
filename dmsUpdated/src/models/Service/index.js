import moment from "moment";
import faker from 'faker';
faker.locale = "de";

export default class Service {
    constructor() {
        this.id = "";
        this.service_name = "";
        this.provider_name = "";
        this.contract_start = moment().format('YYYY-MM-DD');
        this.cancellation_date = moment().format('YYYY-MM-DD');
        this.contract_number = "";
        this.customer_number = "";
        this.additional_numbers = "";
        this.annotations = "";
        this.automatic_extension_period = true;
        this.contract_document = "";
    }

    static fromApi(values) {
        let service = new Service();
        service.id = values.id;
        service.service_name = values.service_name;
        service.provider_name = values.provider_name;
        service.contract_start = moment(values.contract_start).format('YYYY-MM-DD');
        service.contract_number = values.contract_number;
        service.customer_number = values.customer_number;
        service.additional_numbers = values.additional_numbers;
        service.annotations = values.annotations;
        service.cancellation_period = values.cancellation_period;
        service.cancellation_date = moment(values.cancellation_date).format('YYYY-MM-DD');
        service.automatic_extension_period = values.automatic_extension_period;
        service.contract_document = values.contract_document;
        return service;
    }

    static fromForm(values) {
        let service = new Service();
        service.id = values.id;
        service.service_name = values.service_name;
        service.provider_name = values.provider_name;
        service.contract_start = values.contract_start;
        service.cancellation_date = values.cancellation_date;
        service.contract_number = values.contract_number;
        service.customer_number = values.customer_number;
        service.additional_numbers = values.additional_numbers;
        service.annotations = values.annotations;
        service.automatic_extension_period = values.automatic_extension_period;
        service.contract_document = values.contract_document;
        return service;
    }

    toForm() {
        return {
            "id": this.id,
            "service_name": this.service_name,
            "provider_name": this.provider_name,
            "contract_start": this.contract_start,
            "cancellation_date": this.cancellation_date,
            "contract_number": this.contract_number,
            "customer_number": this.customer_number,
            "additional_numbers": this.additional_numbers,
            "annotations": this.annotations,
            "automatic_extension_period": this.automatic_extension_period,
            "contract_document": this.contract_document
        };
    }

    static empty() {
        return new Service();
    }

    static random() {
        let service = new Service();
        service.service_name = faker.name.firstName();
        service.provider_name = faker.name.lastName();
        service.contract_start = moment().format('YYYY-MM-DD');
        service.cancellation_date = moment().format('YYYY-MM-DD');
        service.contract_number = faker.phone.phoneNumber();
        service.customer_number = faker.random.number().toString();
        service.additional_numbers = faker.random.number().toString();
        service.annotations = faker.address.streetName();
        service.automatic_extension_period = faker.random.boolean();
        service.contract_document = "";
        return service;
    }
}
