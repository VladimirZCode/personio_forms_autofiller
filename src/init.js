/**
 * @file This is an initial script of the extension which assigns event listeners to the buttons
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */
import {getHOStartDate, getHOEndDate} from './utils/HomeOfficeUtils.js';

export function init() {
    document.querySelector('#requestHOStartDate').value = getHOStartDate();
    document.querySelector('#requestHOEndDate').value = getHOEndDate();
}
