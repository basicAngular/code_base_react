import numeral from "numeral";
import moment from "moment";

export const randomInt = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

export const bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
};

export const formatPrice = (price) => {
    return numeral(price).format('0,0[.]00');
}

export const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
}