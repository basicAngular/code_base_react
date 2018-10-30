import validatorjs from 'validatorjs';
import moment from 'moment';
export const plugins = {
    dvr: validatorjs
};

export const fields = {
    id: {   
        label: 'id',
        type:'hidden',
        value: ''
    },
    service_name: {
        label: 'service_name',
        placeholder: 'name of the service',
        rules: 'required|string',
        value: ''
    },
    provider_name: {
        label: 'provider_name',
        placeholder: 'name of the provider',
        rules: 'required|string',
        value: ''
    },
    contract_start: {
        label: 'contract_start',
        placeholder: 'contract start date',
        rules: 'required',
        value: moment().format('YYYY-MM-DD')
    },
    cancellation_date: {
        label: 'cancellation_date',
        placeholder: 'contract end date',
        rules: 'required',
        value: moment().format('YYYY-MM-DD')
    },
    cancellation_period: {
        label: 'cancellation_period',
        placeholder: 'Cancellation period',
        value: ''
    },
    customer_number: {
        label: 'customer_number',
        placeholder: 'Customer number',
        rules: 'required|string',
        value: ''
    },
    contract_number: {
        label: 'contract_number',
        placeholder: 'Contract number',
        rules: 'required|string',
        value: ''
    },
    additional_numbers: {
        label: 'additional_numbers',
        placeholder: 'Additional numbers',
        rules: 'required|string',
        value: ''
    },
    annotations: {
        label: 'annotations',
        placeholder: 'Annotations',
        rules: 'required|string',
        value: ''
    },
    automatic_extension_period: {
        label: 'automatic_extension_period',
        placeholder: 'Is automatically extended',
        value: ''
    },
    contract_document: {
        label: 'contract_document',
        placeholder: 'connect it to the contract document',
        value: ''
    },
    automatic_extension_form: {
        label: 'automatic_extension_form',
        placeholder: 'is automatically extended ?',
        value: false
    }
};