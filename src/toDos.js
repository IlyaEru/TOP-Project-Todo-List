/* eslint-disable import/prefer-default-export */
import { contentDomManipulation, menuDomManipulation } from './domManip';
export const toDosContent = (function () {
  let localTodos = window.localStorage.getItem('MyTodos');

  let todos;
  if (localTodos === null) {
    todos = [
      {
        text: 'Example',
        date: '2022-01-27',
        id: '3214412d',
        completed: false,
        project: 'Home',
      },
    ];
  } else todos = JSON.parse(localTodos);
  const cancelNewTodoBtn = document.querySelector('.cancel-new-todo');
  const addNewTodoBtn = document.querySelector('.add-new-todo');
  const sortButton = document.querySelector('.sort-btn');

  sortButton.addEventListener('click', () => {
    if (sortButton.querySelector('img').getAttribute('src').includes('down')) {
      sortButton.querySelector('img').src = './img/up.png';
      todos.sort((a, b) => new Date(b.date) - new Date(a.date));
      contentDomManipulation.cleanTodoNodes();
      todos.forEach((todo) => {
        contentDomManipulation.renderTodo(todo);
      });
    } else {
      sortButton.querySelector('img').src = './img/down.png';
      todos.sort((a, b) => new Date(a.date) - new Date(b.date));
      contentDomManipulation.cleanTodoNodes();
      todos.forEach((todo) => {
        contentDomManipulation.renderTodo(todo);
      });
    }
  });
  function changeTodoEvent() {
    const changeTodoBtns = document.querySelectorAll('.change-todo-btn');
    changeTodoBtns.forEach((changeButton) => {
      if (changeButton.getAttribute('listener') !== 'true') {
        changeButton.setAttribute('listener', 'true');
        changeButton.addEventListener(
          'click',
          contentDomManipulation.changeTodo
        );
      }
    });
  }
  function updateTodoDesc(todoId, newDescr) {
    const todoIndex = todos.findIndex((element) => element.id === todoId);
    todos[todoIndex].text = newDescr;
    contentDomManipulation.cleanTodoNodes();
    todos.forEach((todo) => {
      contentDomManipulation.renderTodo(todo);
    });
    window.localStorage.setItem('MyTodos', JSON.stringify(todos));
  }
  function updateDate(todoId, dateValue) {
    const todoIndex = todos.findIndex((element) => element.id === todoId);
    todos[todoIndex].date = dateValue;
    window.localStorage.setItem('MyTodos', JSON.stringify(todos));
  }
  function updateCompleted(todoId) {
    const todoIndex = todos.findIndex((element) => element.id === todoId);
    todos[todoIndex].completed = true;
    window.localStorage.setItem('MyTodos', JSON.stringify(todos));
  }
  function updateUnCompleted(todoId) {
    const todoIndex = todos.findIndex((element) => element.id === todoId);
    todos[todoIndex].completed = false;
    window.localStorage.setItem('MyTodos', JSON.stringify(todos));
  }

  function deleteTodoEvent() {
    const deleteTodoBtns = document.querySelectorAll('.delete-todo-btn');
    deleteTodoBtns.forEach((deleteBtn) => {
      if (deleteBtn.getAttribute('listener') !== 'true') {
        deleteBtn.setAttribute('listener', 'true');
        deleteBtn.addEventListener('click', (e) => {
          let todoId = e.target.parentNode.getAttribute('id');
          if (todoId === null) {
            todoId = e.target.parentNode.parentNode.getAttribute('id');
          }
          const todoIndex = todos.findIndex((element) => element.id === todoId);
          todos.splice(todoIndex, 1);
          contentDomManipulation.cleanTodoNodes();
          menuDomManipulation.resetHomeTodoCount();
          menuDomManipulation.resetProjTodoCount();
          todos.forEach((todo) => {
            contentDomManipulation.renderTodo(todo);
            menuDomManipulation.updateHomeTodoCount();
            menuDomManipulation.updateProjTodoCount(todo);
          });
          window.localStorage.setItem('MyTodos', JSON.stringify(todos));
        });
      }
    });
  }
  addNewTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newTodo = contentDomManipulation.addNewTodo();
    if (newTodo == undefined) {
      return;
    }
    contentDomManipulation.cleanTodoNodes();
    todos.push(newTodo);
    menuDomManipulation.resetHomeTodoCount();
    menuDomManipulation.resetProjTodoCount();
    todos.forEach((todo) => {
      contentDomManipulation.renderTodo(todo);
      menuDomManipulation.updateHomeTodoCount();
      menuDomManipulation.updateProjTodoCount(todo);
    });
    window.localStorage.setItem('MyTodos', JSON.stringify(todos));
  });
  cancelNewTodoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    contentDomManipulation.cancelAddTodo();
  });
  function changedProject(projectName) {
    if (projectName === 'Home') {
      contentDomManipulation.cleanTodoNodes();
      todos.forEach((todo) => {
        contentDomManipulation.renderTodo(todo);
      });
    } else {
      contentDomManipulation.cleanTodoNodes();
      todos.forEach((todo) => {
        if (todo.project === projectName) {
          contentDomManipulation.renderTodo(todo);
        }
      });
    }
  }

  function showAddTodoEvent() {
    const addTodoButton = document.querySelector('.add-todo-btn');
    addTodoButton.addEventListener(
      'click',
      contentDomManipulation.toogleAddTodo
    );
  }
  function activeProjEvent() {
    const homeButtons = document.querySelectorAll('.home-container button');
    const projectsButtons = document.querySelectorAll('.project-name-node');

    homeButtons.forEach((home) => {
      home.addEventListener('click', contentDomManipulation.changeHeader);
    });
    projectsButtons.forEach((project) => {
      project.addEventListener('click', contentDomManipulation.changeHeader);
    });
  }
  function activateTodoEvents() {
    const todoChangeButton = document.querySelectorAll('.change-todo-btn');
    todoChangeButton.forEach((changeButton) => {
      changeButton.addEventListener('click', contentDomManipulation.changeTodo);
    });
  }
  function checkTodoProjectCount(projectName) {
    let count = 0;
    todos.forEach((todo) => {
      if (todo.project === projectName) {
        count += 1;
      }
    });
    return count;
  }
  function initialTodos() {
    contentDomManipulation.cleanTodoNodes();
    menuDomManipulation.resetHomeTodoCount();
    menuDomManipulation.resetProjTodoCount();

    todos.forEach((todo) => {
      contentDomManipulation.renderTodo(todo);
      menuDomManipulation.updateHomeTodoCount();
      menuDomManipulation.updateProjTodoCount(todo);
    });
    changeTodoEvent();
    activateTodoEvents();
    activeProjEvent();
    showAddTodoEvent();
    deleteTodoEvent();
  }

  return {
    initialTodos,
    checkTodoProjectCount,
    changedProject,
    updateCompleted,
    updateDate,
    updateUnCompleted,
    showAddTodoEvent,
    deleteTodoEvent,
    updateTodoDesc,
    changeTodoEvent,
  };
}());
