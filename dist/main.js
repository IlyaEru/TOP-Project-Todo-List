/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/domManip.js":
/*!*************************!*\
  !*** ./src/domManip.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"menuDomManipulation\": () => (/* binding */ menuDomManipulation),\n/* harmony export */   \"contentDomManipulation\": () => (/* binding */ contentDomManipulation)\n/* harmony export */ });\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n\nconst menuDomManipulation = (function (){\n    const projHeaderImg = document.querySelector('.proj-direction-img');\n    const projCotent = document.querySelector('.projects-content');\n    const addProjForm = document.querySelector('.new-proj-form');\n    const projectDiv = document.querySelector('.projects-content');\n    let projects = ['Example project']\n    function toogleProjects() {\n        if(projHeaderImg.classList.contains('direc-right')){\n            projHeaderImg.src = './img/down.png';\n            projHeaderImg.classList.remove('direc-right');\n            projCotent.classList.remove('projects-close');\n        }\n        else {\n            projHeaderImg.src = './img/right.png';\n            projHeaderImg.classList.add('direc-right');\n            projCotent.classList.add('projects-close');\n        }\n    }\n    function toogleAddProjForm() {\n        addProjForm.classList.toggle('hidden');\n        if(projHeaderImg.classList.contains('direc-right') && !addProjForm.classList.contains('hidden')){\n            toogleProjects()\n        }\n    }\n    function cancelAddProj() {\n        const addProjName = document.querySelector('#proj-name');\n        addProjName.value = '';\n        addProjForm.classList.toggle('hidden');\n    }\n    function deleteProject(liNode) {\n        liNode.remove()\n    }\n    function renderProjects() {\n        const allProject = document.querySelectorAll('ul li');\n        allProject.forEach((project) => {\n            deleteProject(project);\n        })\n        if(!projects.length){return}\n        for (const project of projects) {\n            const liNode = document.createElement('li');\n            const projectNameMode = document.createElement('button');\n            const nameNode = document.createTextNode(project);\n            projectNameMode.classList.add('btn', 'project-name-node');\n\n            const projectImg = document.createElement('img');\n            projectImg.classList.add('proj-img');\n            projectImg.src = './img/projects.png';\n            projectImg.alt = 'project icon';\n\n            projectNameMode.append(projectImg, nameNode);\n\n            const changeProjNode = document.createElement('button');\n            changeProjNode.classList.add('btn', 'change-proj-btn');\n            changeProjNode.title = \"Change this project's name\";\n            const changeProjImg = document.createElement('img');\n            changeProjImg.classList.add('proj-img', 'change-proj-img');\n            changeProjImg.src = './img/change.png';\n            changeProjImg.alt = 'change project icon';\n            changeProjNode.appendChild(changeProjImg);\n\n            const deleteProjNode = document.createElement('button');\n            deleteProjNode.classList.add('btn', 'delete-proj-btn');\n            deleteProjNode.title = \"Delete this project\";\n            const deleteProjImg = document.createElement('img');\n            deleteProjImg.classList.add('proj-img', 'delete-proj-img');\n            deleteProjImg.src = './img/delete.png';\n            deleteProjImg.alt = 'delete project icon';\n            deleteProjNode.appendChild(deleteProjImg);\n\n            liNode.append(projectNameMode, changeProjNode, deleteProjNode);\n            projectDiv.appendChild(liNode);\n        }\n        \n    }\n    function addProject() {\n        const addProjName = document.querySelector('#proj-name');\n        if (addProjName.value.trim() === '') {return}\n        projects.push(addProjName.value);\n        renderProjects()\n        cancelAddProj()\n    }\n    function deleteProjectFromEvent() {\n        const projName = this.parentNode.querySelector('.project-name-node').textContent;\n        const confirmDelete = confirm(`Are you sure you want to delete ${projName} ?`);\n        if (!confirmDelete) {return}\n        const projIndex = projects.indexOf(projName);\n        projects.splice(projIndex, 1);\n        renderProjects();\n        _projects__WEBPACK_IMPORTED_MODULE_0__.projectsModule.initial()\n    }\n    function changeProjName() {\n        const projNameNode = this.parentNode.querySelector('.project-name-node');\n        const projName = this.parentNode.querySelector('.project-name-node').textContent;\n        projNameNode.childNodes[1].textContent = '';\n\n        if (!projNameNode.querySelector('input')) {\n        const newNameInputNode = document.createElement('input');\n        newNameInputNode.type = 'text';\n        newNameInputNode.value = projName;\n        newNameInputNode.classList.add('new-proj-name');\n        projNameNode.appendChild(newNameInputNode);\n        }\n\n        const oldChangeButton = projNameNode.parentNode.querySelector('.change-proj-btn');\n        const newChangeButton = oldChangeButton.cloneNode(true);\n        newChangeButton.classList.add('accept-proj-change');\n        const newChangeButtonImg = newChangeButton.querySelector('.change-proj-img');\n        newChangeButtonImg.src = './img/check.png';\n        newChangeButtonImg.title = 'Confirm name change';\n        oldChangeButton.classList.add('hidden');\n        oldChangeButton.parentNode.appendChild(newChangeButton);\n\n        const oldDeleteButton = projNameNode.parentNode.querySelector('.delete-proj-btn');\n        const newCancelButton = oldDeleteButton.cloneNode(true);\n        newCancelButton.classList.add('cancel-proj-name-change')\n        const newCancelButtonImg = newCancelButton.querySelector('.delete-proj-img');\n        newCancelButtonImg.src = './img/close.png';\n        newCancelButtonImg.title = 'Cancel name change';\n        oldDeleteButton.classList.add('hidden');\n        oldDeleteButton.parentNode.appendChild(newCancelButton);\n        \n        const acceptChangeButton = projNameNode.parentNode.querySelector('.accept-proj-change');\n        acceptChangeButton.addEventListener('click', () => {\n            const newNameInput = projNameNode.parentNode.querySelector('input');\n            const projIndex = projects.indexOf(projName);\n            projects[projIndex] = newNameInput.value;\n            renderProjects()\n            _projects__WEBPACK_IMPORTED_MODULE_0__.projectsModule.initial()\n        })\n        const acceptChange = projNameNode.parentNode.querySelector('.cancel-proj-name-change');\n        acceptChange.addEventListener('click', () => {\n            renderProjects()\n            _projects__WEBPACK_IMPORTED_MODULE_0__.projectsModule.initial()\n        })\n    }\n    renderProjects()\n    return {toogleProjects, toogleAddProjForm, cancelAddProj, addProject, deleteProjectFromEvent, changeProjName}\n})()\n\nconst contentDomManipulation = (function () {\n    const contentHeader = document.querySelector('.content h2');\n    function changeHeader(){\n       console.log(this);\n    }\n    return {changeHeader}\n})()\n\n\n//# sourceURL=webpack://todo-list/./src/domManip.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ \"./src/projects.js\");\n\n_projects__WEBPACK_IMPORTED_MODULE_0__.projectsModule.initial()\n \n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectsModule\": () => (/* binding */ projectsModule)\n/* harmony export */ });\n/* harmony import */ var _domManip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManip */ \"./src/domManip.js\");\n\nconst projectsModule =  (function projects() {\n    const projectsHeaders = document.querySelectorAll('.proj-header-container .show-proj');\n    const addProj = document.querySelector('.add-proj-btn');\n    const submitNewProj = document.querySelector('[type=\"submit\"]');\n    const cancelAddProj = document.querySelector('.cancel-btn');\n    \n    projectsHeaders.forEach(element => {\n        element.addEventListener('click', _domManip__WEBPACK_IMPORTED_MODULE_0__.menuDomManipulation.toogleProjects)\n    })\n    addProj.addEventListener('click', _domManip__WEBPACK_IMPORTED_MODULE_0__.menuDomManipulation.toogleAddProjForm)\n    cancelAddProj.addEventListener('click', (e) => {\n        e.preventDefault();\n        _domManip__WEBPACK_IMPORTED_MODULE_0__.menuDomManipulation.cancelAddProj();\n    })\n    submitNewProj.addEventListener('click', (e) => {\n        e.preventDefault();\n        _domManip__WEBPACK_IMPORTED_MODULE_0__.menuDomManipulation.addProject();\n        deleteProjectEvent();\n        changeProjectEvent();\n    })\n    function deleteProjectEvent() {\n        const deleteProjButton = document.querySelectorAll('.delete-proj-btn');\n        deleteProjButton.forEach((deleteButton) => {\n            if(deleteButton.getAttribute('listener') !== 'true'){\n                deleteButton.addEventListener('click', _domManip__WEBPACK_IMPORTED_MODULE_0__.menuDomManipulation.deleteProjectFromEvent)\n            }\n        })\n    }\n    function changeProjectEvent() {\n        const changeProjButton = document.querySelectorAll('.change-proj-btn');\n        changeProjButton.forEach((changeButton) => {\n            if(changeButton.getAttribute('listener') !== 'true'){\n                changeButton.addEventListener('click', _domManip__WEBPACK_IMPORTED_MODULE_0__.menuDomManipulation.changeProjName)\n            }\n        })\n    }\n\n    function initial() {\n        deleteProjectEvent()\n        changeProjectEvent()\n    }\n    return{initial}\n})()\n\n\n//# sourceURL=webpack://todo-list/./src/projects.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;