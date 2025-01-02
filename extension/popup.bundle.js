/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _utils_HomeOfficeUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/HomeOfficeUtils.js */ "./src/utils/HomeOfficeUtils.js");
/**
 * @file This is an initial script of the extension which assigns event listeners to the buttons
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */

function init() {
  // document.querySelector('#requestHOStartDate').value = getHOStartDate();
  // document.querySelector('#requestHOEndDate').value = getHOEndDate();
  // Debug: set fixed dates
  document.querySelector('#requestHOStartDate').value = '05/11/2024';
  document.querySelector('#requestHOEndDate').value = '08/11/2024';
}

/***/ }),

/***/ "./src/utils/HomeOfficeUtils.js":
/*!**************************************!*\
  !*** ./src/utils/HomeOfficeUtils.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHOEndDate: () => (/* binding */ getHOEndDate),
/* harmony export */   getHOStartDate: () => (/* binding */ getHOStartDate)
/* harmony export */ });
/**
 * @file This is an action script which assigns an event listener for a message
 * sent to the current tab and submits the absence request.
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */
function getHOStartDate() {
  const date = new Date();
  const firstDay = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const month = date.getMonth() + 1;
  return firstDay.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + getDateFullYear(date);
}
function getHOEndDate() {
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init.js */ "./src/init.js");
/**
 * @file This is an initial script of the extension which assigns event listeners to the buttons
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */

(0,_init_js__WEBPACK_IMPORTED_MODULE_0__.init)();
document.getElementById('requestWFH').addEventListener('click', async () => {
  const requestAbsenceButtonClass = document.querySelector('#requestAbsenceButtonClassInput').value;
  const requestAbsenceButtonAttrName = document.querySelector('#requestAbsenceButtonAttrInput').value;
  const requestAbsenceButtonAttrVal = document.querySelector('#requestAbsenceButtonAttrValInput').value;
  const requestHOStartDate = document.querySelector('#requestHOStartDate').value;
  const requestHOEndDate = document.querySelector('#requestHOEndDate').value;
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
  });
  await chrome.tabs.sendMessage(tab.id, {
    action: "ADD_WFH_FOR_THIS_WEEK",
    requestAbsenceButtonClass: requestAbsenceButtonClass,
    requestAbsenceButtonAttrName: requestAbsenceButtonAttrName,
    requestAbsenceButtonAttrVal: requestAbsenceButtonAttrVal,
    requestHOStartDate: requestHOStartDate,
    requestHOEndDate: requestHOEndDate
  });
});
})();

/******/ })()
;
//# sourceMappingURL=popup.bundle.js.map