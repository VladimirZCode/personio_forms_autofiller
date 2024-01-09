/**
 * @file This is an action script which assigns an event listener for a message
 * sent to the current tab and submits the absence request.
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */
import { addWFHForThisWeek } from './module/WorkFromHomeRequest.js';

chrome.runtime.onMessage.addListener(async (request, sender, response) => {
    if (request.action == "ADD_WFH_FOR_THIS_WEEK") {
        if (
            request?.requestAbsenceButtonAttrName &&
            request?.requestAbsenceButtonAttrVal &&
            request?.requestHOStartDate &&
            request?.requestHOEndDate
        ) {
            addWFHForThisWeek(
                request.requestAbsenceButtonAttrName,
                request.requestAbsenceButtonAttrVal,
                request.requestHOStartDate,
                request.requestHOEndDate
            );
        } else {
            throw new Error('Parameters are not correctly passed.');
        }
    }
});
