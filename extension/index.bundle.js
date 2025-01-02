/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/module/WorkFromHomeRequest.js":
/*!*******************************************!*\
  !*** ./src/module/WorkFromHomeRequest.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addWFHForThisWeek: () => (/* binding */ addWFHForThisWeek)
/* harmony export */ });
/**
 * @file This is an action script which assigns an event listener for a message
 * sent to the current tab and submits the absence request.
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */
function addWFHForThisWeek(requestAbsenceButtonClass, requestAbsenceButtonAttrName, requestAbsenceButtonAttrVal, requestHOStartDate, requestHOEndDate) {
  openRequestAbsenceDialog(requestAbsenceButtonClass, requestAbsenceButtonAttrName, requestAbsenceButtonAttrVal);
  fillRequestAbsenceDialogForThisWeek(requestHOStartDate, requestHOEndDate);
}
function openRequestAbsenceDialog(requestAbsenceButtonClass, requestAbsenceButtonAttrName, requestAbsenceButtonAttrVal) {
  const buttonClass = `.${requestAbsenceButtonClass}`;
  const buttons = document.querySelectorAll(buttonClass);
  let absenceButton = Array.from(buttons).find(button => {
    const nestedDiv = button.querySelector('div');
    return nestedDiv && nestedDiv.querySelector('span')?.textContent.trim() === "Request Absence";
  });
  if (!absenceButton) {
    const attr = `[${requestAbsenceButtonAttrName}="${requestAbsenceButtonAttrVal}"]`;
    absenceButton = document.querySelector(attr);
    if (!absenceButton) {
      throw new Error(`Incorrect selector for the request absence button: ${attr}`);
    }
  }
  absenceButton.click();
}
function fillRequestAbsenceDialogForThisWeek(requestHOStartDate, requestHOEndDate) {
  const uiComponentsContainer = document.getElementById('ui-components-portals-container');

  // Callback function which is executed when the configured mutations are observed.
  // In this case when the dialog is opened, children of the container are changed.
  let absenceTypeSelectClicked = false;
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "childList") {
        const targetContainerClass = mutation?.target?.className;
        if (targetContainerClass === 'Dialog-module__PE94udd0__v9-2-2') {
          const absenceTypeSelect = document.querySelector('[data-action-name="absence-type-select"]');
          if (absenceTypeSelect && !absenceTypeSelectClicked) {
            const button = document.querySelector('button[id="absence-type-select"]');
            if (!button) {
              throw new Error('There is no element button[id="absence-type-select"]. HTML structure is changed.');
            }
            absenceTypeSelectClicked = true;
            button.click();
            selectHOForAbsenceTypeSelect(absenceTypeSelect);
            setHODates(requestHOStartDate, requestHOEndDate);
          }
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  const config = {
    childList: true,
    subtree: true
  };
  observer.observe(uiComponentsContainer, config);
}
function selectHOForAbsenceTypeSelect(absenceTypeSelect) {
  const callback = (mutationList, observer) => {
    let hoOptionClicked = false;
    for (const mutation of mutationList) {
      if (mutation.type === "attributes") {
        const ul = mutation?.target?.children?.[0];
        if (ul && ul?.attributes?.[0]?.name === 'role' && ul?.attributes?.[0]?.nodeValue === 'listbox') {
          const li = ul?.children?.[3];
          if (li && !hoOptionClicked) {
            hoOptionClicked = true;
            li.click();
          }
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  const config = {
    attributes: true,
    subtree: true
  };
  observer.observe(absenceTypeSelect, config);
}
function setHODates(requestHOStartDate, requestHOEndDate) {
  setHOStartDate(requestHOStartDate, requestHOEndDate);
}
function setHOStartDate(requestHOStartDate, requestHOEndDate) {
  setTimeout(() => {
    const startDateInput = document.querySelector('#absencePeriod-start-date-input');
    if (!startDateInput) {
      throw new Error('There is no element for startDateInput. HTML structure is changed.');
    }

    // The event listener callback should be triggered only once
    startDateInput.addEventListener('click', () => {
      setTimeout(() => {
        setHODateInputValue(startDateInput, requestHOStartDate);
        setHOEndDate(requestHOEndDate);
      }, 200);
    }, {
      once: true
    });
    startDateInput.click();
  }, 200);
}
function setHODateInputValue(dateInput, dateValue) {
  // Insert the date into the input using focus event and running a command.
  // This way it works like a real user.
  dateInput.focus();
  document.execCommand('insertText', false, dateValue);
  dateInput.dispatchEvent(new Event('change', {
    bubbles: true
  }));

  // Also select the input and change its value.
  dateInput.select();
  dateInput.value = dateValue;
  dateInput.dispatchEvent(new Event('change', {
    bubbles: true
  }));
}
function setHOEndDate(requestHOEndDate) {
  setTimeout(() => {
    const endDateInput = document.querySelector('#absencePeriod-end-date-input');
    if (!endDateInput) {
      throw new Error('There is no element for endDateInput. HTML structure is changed.');
    }
    endDateInput.addEventListener('click', () => {
      setTimeout(() => {
        setHODateInputValue(endDateInput, requestHOEndDate);
        moveFocusToCloseDatePicker();
      }, 200);
    }, {
      once: true
    });
    endDateInput.click();
  }, 200);
}
function moveFocusToCloseDatePicker() {
  setTimeout(() => {
    const dateInput = document.querySelector('#absencePeriod-end-date-input');
    if (!dateInput) {
      throw new Error('There is no element for end date input. HTML structure is changed.');
    }
    const rangeDatePicker = dateInput.closest('[data-test-id="end-datepicker"]');
    if (!rangeDatePicker) {
      throw new Error('There is no element for rangeDatePicker. HTML structure is changed.');
    }
    const rangeDatePickerLabel = rangeDatePicker.parentElement?.parentElement?.previousElementSibling;
    // Move focus to close the date popup
    if (rangeDatePickerLabel) {
      rangeDatePickerLabel.click();
    } else {
      throw new Error('rangeDatePickerLabel is not reached. The HTML structure is changed.');
    }
    submitHORequest();
  }, 200);
}
function submitHORequest() {
  setTimeout(() => {
    const form = document.querySelector('[data-test-id="absence-form"]');
    if (!form) {
      throw new Error('There is no element for absence form. HTML structure is changed.');
    }
    const submitRequest = form.querySelector('[data-action-name="submit-request-button"]');
    if (!submitRequest) {
      throw new Error('There is no element for form submit request button. HTML structure is changed.');
    }
    // TODO: Uncomment the line. Commented for now to not submit the request.
    // submitRequest.click();

    openAbsenceCalendarPage();
  }, 200);
}
function openAbsenceCalendarPage() {
  setTimeout(() => {
    const link = document.querySelector('[data-action-name="dbv2-my-profile-absence"]');
    if (!link) {
      console.error('There is no "Absence Calendar Link" element. HTML structure is changed.');
      return;
    }
    link.target = "_blank";
    link.click();
  }, 1000);
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
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _module_WorkFromHomeRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module/WorkFromHomeRequest.js */ "./src/module/WorkFromHomeRequest.js");
/**
 * @file This is an action script which assigns an event listener for a message
 * sent to the current tab and submits the absence request.
 * @copyright 2024 Vladimir Zhitkov
 * @license MIT
 */

chrome.runtime.onMessage.addListener(async (request, sender, response) => {
  if (request.action == "ADD_WFH_FOR_THIS_WEEK") {
    if (request?.requestAbsenceButtonClass && request?.requestAbsenceButtonAttrName && request?.requestAbsenceButtonAttrVal && request?.requestHOStartDate && request?.requestHOEndDate) {
      (0,_module_WorkFromHomeRequest_js__WEBPACK_IMPORTED_MODULE_0__.addWFHForThisWeek)(request.requestAbsenceButtonClass, request.requestAbsenceButtonAttrName, request.requestAbsenceButtonAttrVal, request.requestHOStartDate, request.requestHOEndDate);
    } else {
      throw new Error('Parameters are not correctly passed.');
    }
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.bundle.js.map