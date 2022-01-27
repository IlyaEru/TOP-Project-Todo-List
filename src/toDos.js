import { contentDomManipulation } from "./domManip"
export const toDosContent = (function () {
    let todos = [];
    const cancelNewTodoBtn = document.querySelector('.cancel-new-todo');
    const addNewTodoBtn = document.querySelector('.add-new-todo');
    addNewTodoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const newTodo = contentDomManipulation.addNewTodo()
        if (newTodo == undefined) {return}
        todos.push(newTodo);
        console.log(todos);
        todos.forEach((todo) => {
            contentDomManipulation.renderTodo(todo);
        })
    })
    cancelNewTodoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contentDomManipulation.cancelAddTodo();
        
    })

    function showAddTodoEvent() {
        const addTodoButton = document.querySelector('.add-todo-btn');
        addTodoButton.addEventListener('click', contentDomManipulation.toogleAddTodo)
    }
    function activeProjEvent() {
        const homeButtons = document.querySelectorAll('.home-container button');
        const projectsButtons = document.querySelectorAll('.project-name-node');

        
        homeButtons.forEach((home) => {
            home.addEventListener('click', contentDomManipulation.changeHeader)
        })
        projectsButtons.forEach((project) => {
            project.addEventListener('click', contentDomManipulation.changeHeader)
        })
    }
    function activateTodoEvents(){
        const todoChangeButton = document.querySelectorAll('.change-todo-btn');
        todoChangeButton.forEach((changeButton) => {
            changeButton.addEventListener('click', contentDomManipulation.changeTodo)
        })
    }
    function initialTodos() {
        activateTodoEvents()
        activeProjEvent()
        showAddTodoEvent()
    }
    
    return {initialTodos, showAddTodoEvent}
})()