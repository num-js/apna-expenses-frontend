import moment from 'moment';
export const getDate = (date) => {
    return moment(date).format('Do MMM');
}