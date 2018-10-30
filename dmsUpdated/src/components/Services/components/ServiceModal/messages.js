import {defineMessages} from 'react-intl';

export default defineMessages({
    serviceTitle: {
        id: "app.components.serviceModal.serviceTitle",
        defaultMessage: "Service",
    },
    service_name: {
        id: "app.components.serviceForm.serviceName",
        defaultMessage: "Service Name",
    },
    provider_name: {
        id: "app.components.serviceForm.providerName",
        defaultMessage: "Provider Name",
    },
    cancellation_period: {
        id: "app.components.serviceForm.cancellationPeriod",
        defaultMessage: "Cancellation period",
    },
    customer_number: {
        id: "app.components.serviceForm.customerNumber",
        defaultMessage: "Customer number",
    },
    contract_number: {
        id: "app.components.serviceForm.contractNumber",
        defaultMessage: "Contract number",
    },
    additional_numbers: {
        id: "app.components.serviceForm.additionalNumbers",
        defaultMessage: "additional numbers (free text field)",
    },
    annotations: {
        id: "app.components.serviceForm.annotations",
        defaultMessage: "annotations (free text field)",
    },
    contract_start: {
        id: "app.components.serviceForm.contractStart",
        defaultMessage: "contract start date",
    },
    cancellation_date: {
        id: "app.components.serviceForm.contractEnd",
        defaultMessage: "contract end date",
    },
    connect_contract: {
        id: "app.components.serviceForm.connectContract",
        defaultMessage: "connect it to the contract document stored in the system",
    },
    automatic_extension_period: {
        id: "app.components.serviceForm.automaticExtensionPeriod",
        defaultMessage: "is it automatically extended if it is not canceled and if so, how long is it extended (a year, etc. etc.)",
    },
    automatic_extension_form: {
        id: "app.components.serviceForm.automaticExtensionForm",
        defaultMessage: "is automatically extended ?",
    }
});
