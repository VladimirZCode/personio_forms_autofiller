/**
 * @file This is an action script which assigns an event listener for a message
 * sent to the current tab and submits the absence request.
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */
export function getHOStartDate() {
    const date = new Date();
    const firstDay = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    const month = date.getMonth() + 1;
    return firstDay.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + getDateFullYear(date);
}

export function getHOEndDate() {
    const date = new Date();
    const fourthDay = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1) + 3;
    const month = date.getMonth() + 1;
    const secondDate = fourthDay.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + getDateFullYear(date);
    return secondDate;
}

function getDateFullYear(date) {
    return date.getFullYear().toString();
}

function getDateShortYear(date) {
    return date.getFullYear().toString().substr(-2);
}
