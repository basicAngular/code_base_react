import validatorjs from 'validatorjs';
import moment from 'moment';
export const plugins = {
    dvr: validatorjs
};

export const fields = {
    title: {
        label: 'Title',
        placeholder: 'title',
        rules: 'required|string',
        value:''
    },
    is_all_day_event: {
        label: 'all day',
        placeholder: 'is all day event',
        value: false
    },
    start: {
        label: 'Start date',
        placeholder: 'start date',
        rules: 'required',
        value: moment().format('YYYY-MM-DD')
    },
    end: {
        label: 'End date',
        placeholder: 'end date',
        rules: 'required',
        value: moment().format('YYYY-MM-DD')
    },
    description: {
        label: 'Description',
        placeholder: 'description',
        value:''
    },
};