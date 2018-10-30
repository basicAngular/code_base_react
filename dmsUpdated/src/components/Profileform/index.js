import validatorjs from 'validatorjs';
import {
    shouldBeEqualTo,
  } from '../validations'
export const plugins = {
    dvr: validatorjs
};

export const fields = {
    id: {   
        label: 'id',
        type:'hidden',
        value:''
    },
    first_name: {
        label: 'First Name',
        placeholder: 'Enter first name',
        rules: 'required',
        value:''
    },
    last_name: {
        label: 'last name',
        placeholder: 'Enter last name',
        value:'',
        rules: 'required'
    },
    email: {
        label: 'email',
        placeholder: 'Enter email',
        type: "email",
        value:'',
        rules: 'required|email',
    },
    tax_number: {
        label: 'tax number',
        placeholder: 'Enter tax number',
        value:'',
        rules: 'required'
    },
    is_turnover_tax_subject: {
        label: 'Turnover Tax Subject',
        placeholder: 'Enter Tax Subject',
        type: "checkbox",
        options: {
          validateOnChange: true,
        },
        value:'',
        rules: 'required'
    },
    phone: {
        label: 'phone',
        placeholder: 'Enter phone',
        value:'',
        rules: 'required'
    },
    account_iban: {
        label: 'Account IBAN',
        placeholder: 'Enter IBAN',
        value:'',
        rules: 'required|min:10'
    },
    account_bic: {
        label: 'BIC',
        placeholder: 'Enter BIC',
        value:'',
        rules: 'required|min:8'
    },
    account_holder: {
        label: 'Account Holder',
        placeholder: 'Enter Account Holder',
        value:'',
        rules: 'required'
    },
    old_password: {
        label: 'Old Password ',
        placeholder: 'Enter Old password',
        type: "password",
        value:'',
        rules: 'required',
    },
    new_password: {
        label: 'new Password ',
        placeholder: 'Enter new password',
        type: "password",
        value:'',
        rules: 'required',
    },
    re_type_password: {
        label: 'retype new Password ',
        placeholder: 'Enter retype new password',
        type: "password",
        validators: [shouldBeEqualTo('new_password')],
        rules: 'required',
        value:''
    },
    street: {
        label: 'street',
        placeholder: 'Enter Street',
        value:'',
        rules: 'required'
    },
    postal_code: {
        label: 'postal code',
        placeholder: 'Enter Postal Code',
        value:'',
        rules: 'required'
    },
    city: {
        label: 'City',
        placeholder: 'Enter City',
        value:'',
        rules: 'required'
    },

};