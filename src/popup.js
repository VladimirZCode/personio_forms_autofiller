/**
 * @file This is an initial script of the extension which assigns event listeners to the buttons
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */
import {init} from './init.js';

init();

document.getElementById('requestWFH').addEventListener('click', async () => {
    const requestAbsenceButtonClass = document.querySelector('#requestAbsenceButtonClassInput').value;
    const requestAbsenceButtonAttrName = document.querySelector('#requestAbsenceButtonAttrInput').value;
    const requestAbsenceButtonAttrVal = document.querySelector('#requestAbsenceButtonAttrValInput').value;
    const requestHOStartDate = document.querySelector('#requestHOStartDate').value;
    const requestHOEndDate = document.querySelector('#requestHOEndDate').value;

    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    await chrome.tabs.sendMessage(tab.id, {
        action: "ADD_WFH_FOR_THIS_WEEK",
        requestAbsenceButtonClass: requestAbsenceButtonClass,
        requestAbsenceButtonAttrName: requestAbsenceButtonAttrName,
        requestAbsenceButtonAttrVal: requestAbsenceButtonAttrVal,
        requestHOStartDate: requestHOStartDate,
        requestHOEndDate: requestHOEndDate
    });
});
