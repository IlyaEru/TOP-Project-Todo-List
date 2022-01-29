/* eslint-disable no-restricted-globals */
import { projectsModule } from './projects';
import { toDosContent } from './toDos';
export const menuDomManipulation = (function pageProjectDomManipulation() {
  let projects;
  const localProjects = window.localStorage.getItem('MyProjects');
  if (localProjects === null) {
    projects = ['Example project'];
  } else projects = JSON.parse(localProjects);
  const projHeaderImg = document.querySelector('.proj-direction-img');
  const projCotent = document.querySelector('.projects-content');
  const addProjForm = document.querySelector('.new-proj-form');
  const projectDiv = document.querySelector('.projects-content');

  function toogleProjects() {
    if (projHeaderImg.classList.contains('direc-right')) {
      projHeaderImg.src = './img/down.png';
      projHeaderImg.classList.remove('direc-right');
      projCotent.classList.remove('projects-close');
    } else {
      projHeaderImg.src = './img/right.png';
      projHeaderImg.classList.add('direc-right');
      projCotent.classList.add('projects-close');
    }
  }
  function toogleAddProjForm() {
    addProjForm.classList.toggle('hidden');
    if (
      projHeaderImg.classList.contains('direc-right')
      && !addProjForm.classList.contains('hidden')
    ) {
      toogleProjects();
    }
  }
  function cancelAddProj() {
    const addProjName = document.querySelector('#proj-name');
    addProjName.value = '';
    addProjForm.classList.toggle('hidden');
  }
  function deleteProject(liNode) {
    liNode.remove();
  }
  let called = false;
  function renderProjects() {
    const allProject = document.querySelectorAll('ul li');
    allProject.forEach((project) => {
      deleteProject(project);
    });
    if (!projects.length) {
      return;
    }
    for (const project of projects) {
      const liNode = document.createElement('li');
      const projectNameMode = document.createElement('button');
      const nameNode = document.createTextNode(project);
      projectNameMode.classList.add('btn', 'project-name-node');

      const projectImg = document.createElement('img');
      projectImg.classList.add('proj-img');
      projectImg.src = './img/projects.png';
      projectImg.alt = 'project icon';

      projectNameMode.append(nameNode);

      const changeProjNode = document.createElement('button');
      changeProjNode.classList.add('btn', 'change-proj-btn');
      changeProjNode.title = "Change this project's name";
      const changeProjImg = document.createElement('img');
      changeProjImg.classList.add('proj-img', 'change-proj-img');
      changeProjImg.src = './img/change.png';
      changeProjImg.alt = 'change project icon';
      changeProjNode.appendChild(changeProjImg);

      const todoCountNode = document.createElement('span');
      todoCountNode.classList.add('todo-count');

      todoCountNode.textContent = toDosContent.checkTodoProjectCount(project);

      const deleteProjNode = document.createElement('button');
      deleteProjNode.classList.add('btn', 'delete-proj-btn');
      deleteProjNode.title = 'Delete this project';
      const deleteProjImg = document.createElement('img');
      deleteProjImg.classList.add('proj-img', 'delete-proj-img');
      deleteProjImg.src = './img/delete.png';
      deleteProjImg.alt = 'delete project icon';
      deleteProjNode.appendChild(deleteProjImg);

      liNode.append(
        projectImg,
        projectNameMode,
        todoCountNode,
        changeProjNode,
        deleteProjNode
      );
      projectDiv.appendChild(liNode);
    }
    window.localStorage.setItem('MyProjects', JSON.stringify(projects));

    if (called) {
      toDosContent.initialTodos();
    }
    called = true;
  }
  function addProject() {
    const addProjName = document.querySelector('#proj-name');
    if (addProjName.value.trim() === '') {
      return;
    }
    projects.push(addProjName.value);
    renderProjects();
    cancelAddProj();
  }
  function deleteProjectFromEvent() {
    const projName =
      this.parentNode.querySelector('.project-name-node').textContent;
    // eslint-disable-next-line no-alert
    const confirmDelete = confirm(
      `Are you sure you want to delete ${projName} ?`,
    );
    if (!confirmDelete) {
      return;
    }
    const projIndex = projects.indexOf(projName);
    projects.splice(projIndex, 1);
    renderProjects();
    projectsModule.initial();
  }
  /*
  function changeProjName() {
      const projNameNode = this.parentNode.querySelector('.project-name-node');
      const projName = this.parentNode.querySelector('.project-name-node').textContent;
      projNameNode.childNodes[0].textContent = '';

      if (!projNameNode.querySelector('input')) {
          const newNameInputNode = document.createElement('input');
          newNameInputNode.type = 'text';
          newNameInputNode.value = projName;
          newNameInputNode.classList.add('new-proj-name');
          projNameNode.appendChild(newNameInputNode);
      }

      const oldChangeButton = projNameNode.parentNode.querySelector('.change-proj-btn');
      const newChangeButton = oldChangeButton.cloneNode(true);
      newChangeButton.classList.add('accept-proj-change');
      const newChangeButtonImg = newChangeButton.querySelector('.change-proj-img');
      newChangeButtonImg.src = './img/check.png';
      newChangeButtonImg.title = 'Confirm name change';
      oldChangeButton.classList.add('hidden');
      oldChangeButton.parentNode.appendChild(newChangeButton);

      const oldDeleteButton = projNameNode.parentNode.querySelector('.delete-proj-btn');
      const newCancelButton = oldDeleteButton.cloneNode(true);
      newCancelButton.classList.add('cancel-proj-name-change')
      const newCancelButtonImg = newCancelButton.querySelector('.delete-proj-img');
      newCancelButtonImg.src = './img/close.png';
      newCancelButtonImg.title = 'Cancel name change';
      oldDeleteButton.classList.add('hidden');
      oldDeleteButton.parentNode.appendChild(newCancelButton);

      const acceptChangeButton = projNameNode.parentNode.querySelector('.accept-proj-change');
      acceptChangeButton.addEventListener('click', () => {
          const newNameInput = projNameNode.parentNode.querySelector('input');
          const projIndex = projects.indexOf(projName);
          projects[projIndex] = newNameInput.value;
          renderProjects()
          projectsModule.initial()
      })
      const acceptChange = projNameNode.parentNode.querySelector('.cancel-proj-name-change');
      acceptChange.addEventListener('click', () => {
          renderProjects()
          projectsModule.initial()
      })
  } */
  function resetHomeTodoCount() {
    const homeTodoCount = document.querySelector('.todo-count-home');
    homeTodoCount.textContent = 0;
  }
  function updateHomeTodoCount() {
    const homeTodoCount = document.querySelector('.todo-count-home');
    homeTodoCount.textContent = +homeTodoCount.textContent + 1;
  }
  function resetProjTodoCount() {
    const currentProj = document.querySelector('.content-header h2').textContent;
    const projectsInMenu = document.querySelectorAll('.projects-content li');
    projectsInMenu.forEach((project) => {
      if (
        project.querySelector('.project-name-node').textContent === currentProj
      ) {
        const projTodoCount = project.querySelector('.todo-count');
        projTodoCount.textContent = 0;
      }
    });
  }
  function updateProjTodoCount(todo) {
    const currentProj = document.querySelector('.content-header h2').textContent;
    if (currentProj !== 'Home' && currentProj === todo.project) {
      const projectsInMenu = document.querySelectorAll('.projects-content li');
      projectsInMenu.forEach((project) => {
        if (
          project.querySelector('.project-name-node').textContent
          === currentProj
        ) {
          const projTodoCount = project.querySelector('.todo-count');
          projTodoCount.textContent = +projTodoCount.textContent + 1;
        }
      });
    }
  }

  renderProjects();
  return {
    resetHomeTodoCount,
    updateHomeTodoCount,
    resetProjTodoCount,
    updateProjTodoCount,
    toogleProjects,
    toogleAddProjForm,
    cancelAddProj,
    addProject,
    deleteProjectFromEvent,
    // changeProjName,
  };
}());

export const contentDomManipulation = (function todosDomManipulation() {
  const contentHeader = document.querySelector('.content h2');
  function changeHeader() {
    if (this.parentNode.querySelector('button').classList.contains('active')) {
      return;
    }
    if (this.querySelector('input')) {
      return;
    }
    const currentActive = document.querySelector('.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }

    this.parentNode.querySelector('button').classList.add('active');
    contentHeader.textContent = this.parentNode.querySelector('button').textContent;
    toDosContent.changedProject(
      this.parentNode.querySelector('button').textContent
    );
  }
  function cleanTodoNodes() {
    const currentTodos = document.querySelectorAll('.to-dos li');
    currentTodos.forEach((todo) => {
      todo.remove();
    });
  }
  function renderTodo(todo) {
    const projectName = document.querySelector('.content h2').textContent;
    if (todo.project !== projectName && projectName !== 'Home') {
      return;
    }
    const todoContainer = document.querySelector('div.to-dos');
    const todoNode = document.createElement('li');
    todoNode.setAttribute('id', todo.id);

    const completeButton = document.createElement('button');
    completeButton.classList.add('todo-checkbox');

    const todoText = document.createElement('p');
    todoText.classList.add('todo-text');
    todoText.textContent = todo.text;

    const todoDate = document.createElement('input');
    todoDate.classList.add('todo-date');
    todoDate.type = 'date';
    todoDate.value = todo.date;

    const changeTodoButton = document.createElement('button');
    changeTodoButton.classList.add('btn', 'change-todo-btn');
    changeTodoButton.title = 'Change this todo';
    const changeTodoButtonImg = document.createElement('img');
    changeTodoButtonImg.classList.add('todo-img');
    changeTodoButtonImg.setAttribute('src', './img/change.png');
    changeTodoButtonImg.alt = 'change todo imgage';
    changeTodoButton.appendChild(changeTodoButtonImg);

    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.classList.add('btn', 'delete-todo-btn');
    deleteTodoButton.title = 'Delete this todo';
    const deleteTodoButtonImg = document.createElement('img');
    deleteTodoButtonImg.classList.add('todo-img');
    deleteTodoButtonImg.setAttribute('src', './img/delete.png');
    deleteTodoButtonImg.alt = 'delete todo imgage';
    deleteTodoButton.appendChild(deleteTodoButtonImg);

    if (todo.completed === true) {
      completeButton.classList.add('completed-todo');
      todoText.classList.add('completed-todo-text');
    }

    todoNode.append(
      completeButton,
      todoText,
      todoDate,
      changeTodoButton,
      deleteTodoButton,
    );
    todoContainer.appendChild(todoNode);
    todoCompletedEvent();
    toDosContent.deleteTodoEvent();
    toDosContent.changeTodoEvent();
    dateChangeEvent();
  }
  function dateChangeEvent() {
    const dates = document.querySelectorAll('.todo-date');
    dates.forEach((date) => {
      if (date.getAttribute('listener') !== 'true') {
        date.setAttribute('listener', 'true');
        date.addEventListener('input', () => {
          toDosContent.updateDate(
            date.parentNode.getAttribute('id'),
            date.value
          );
        });
      }
    });
  }
  function todoCompletedEvent() {
    const todosCheckbox = document.querySelectorAll('.todo-checkbox');
    todosCheckbox.forEach((checkbox) => {
      if (checkbox.getAttribute('listener') !== 'true') {
        checkbox.setAttribute('listener', 'true');
        checkbox.addEventListener('click', (e) => {
          if (!e.target.parentNode.querySelector('.todo-text')) {
            return;
          }
          checkbox.classList.toggle('completed-todo');

          if (checkbox.classList.contains('completed-todo')) {
            const toDoId = e.target.parentNode.getAttribute('id');
            toDosContent.updateCompleted(toDoId);
          } else {
            const toDoId = e.target.parentNode.getAttribute('id');
            toDosContent.updateUnCompleted(toDoId);
          }
          e.target.parentNode
            .querySelector('.todo-text')
            .classList.toggle('completed-todo-text');
        });
      }
    });
  }
  function changeTodo() {
    const oldDescriptionNode = this.parentNode
      .querySelector('p')
      .cloneNode(true);
    const oldDescription = this.parentNode.querySelector('p').textContent;
    const newDescInput = document.createElement('input');
    newDescInput.type = 'text';
    newDescInput.value = oldDescription;
    newDescInput.classList.add('new-proj-name');
    this.parentNode.querySelector('p').replaceWith(newDescInput);

    const oldChangeButton = this.parentNode.querySelector('.change-todo-btn');
    const newAcceptButton = oldChangeButton.cloneNode(true);
    oldChangeButton.classList.toggle('hidden');
    newAcceptButton.querySelector('img').src = './img/check.png';
    newAcceptButton.classList.add('accept-desc-change');

    const oldDeleteButton = this.parentNode.querySelector('.delete-todo-btn');
    const newCancelButton = oldDeleteButton.cloneNode(true);
    oldDeleteButton.classList.toggle('hidden');
    newCancelButton.querySelector('img').src = './img/close.png';
    newCancelButton.classList.add('cancel-desc-change');
    this.parentNode.append(newAcceptButton, newCancelButton);

    newAcceptButton.addEventListener('click', () => {
      if (newDescInput.value === '') {
        return;
      }
      const changedTodoId = this.parentNode.getAttribute('id');
      const newDescription = newDescInput.value;
      toDosContent.updateTodoDesc(changedTodoId, newDescription);
    });
    newCancelButton.addEventListener('click', () => {
      newDescInput.replaceWith(oldDescriptionNode);
      oldChangeButton.classList.toggle('hidden');
      oldDeleteButton.classList.toggle('hidden');
      newAcceptButton.remove();
      newCancelButton.remove();
    });
  }
  function toogleAddTodo() {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('hidden');
    if (modal.getAttribute('listener') !== 'true') {
      modal.setAttribute('listener', 'true');
      modal.addEventListener('click', (e) => {
        if (e.target !== modal) {
          return;
        }
        toogleAddTodo();
      });
    }
  }
  function cancelAddTodo() {
    const descrInput = document.querySelector('#new-todo-name');
    const dateInput = document.querySelector('#new-todo-date');
    descrInput.value = '';
    dateInput.value = '2022-01-01';
    toogleAddTodo();
  }
  function addNewTodo() {
    const text = document.querySelector('#new-todo-name').value;
    const date = document.querySelector('#new-todo-date').value;
    const project = document.querySelector('.content-header h2').textContent;
    if (text === '' || date === '') {
      return;
    }
    cancelAddTodo();
    const id = Math.random().toString(16).slice(2);
    return { text, date, id, project };
  }
  function initial() {
    todoCompletedEvent();
  }
  return {
    changeHeader,
    cleanTodoNodes,
    initial,
    addNewTodo,
    changeTodo,
    renderTodo,
    toogleAddTodo,
    cancelAddTodo,
  };
}());
contentDomManipulation.initial();
