/* eslint-disable import/prefer-default-export */
import { menuDomManipulation } from './domManip';
export const projectsModule = (function projects() {
  const projectsHeaders = document.querySelectorAll(
    '.proj-header-container .show-proj'
  );
  const addProj = document.querySelector('.add-proj-btn');
  const submitNewProj = document.querySelector('[type="submit"]');
  const cancelAddProj = document.querySelector('.cancel-btn');

  projectsHeaders.forEach((element) => {
    element.addEventListener('click', menuDomManipulation.toogleProjects);
  });
  addProj.addEventListener('click', menuDomManipulation.toogleAddProjForm);
  cancelAddProj.addEventListener('click', (e) => {
    e.preventDefault();
    menuDomManipulation.cancelAddProj();
  });
  submitNewProj.addEventListener('click', (e) => {
    e.preventDefault();
    menuDomManipulation.addProject();
    deleteProjectEvent();
    changeProjectEvent();
  });
  function deleteProjectEvent() {
    const deleteProjButton = document.querySelectorAll('.delete-proj-btn');
    deleteProjButton.forEach((deleteButton) => {
      if (deleteButton.getAttribute('listener') !== 'true') {
        deleteButton.addEventListener(
          'click',
          menuDomManipulation.deleteProjectFromEvent
        );
      }
    });
  }
  function changeProjectEvent() {
    const changeProjButton = document.querySelectorAll('.change-proj-btn');
    changeProjButton.forEach((changeButton) => {
      if (changeButton.getAttribute('listener') !== 'true') {
        changeButton.addEventListener(
          'click',
          menuDomManipulation.changeProjName
        );
      }
    });
  }

  function initial() {
    deleteProjectEvent();
    // changeProjectEvent()
  }
  return { initial };
}());
