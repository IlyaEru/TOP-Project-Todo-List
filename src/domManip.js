import {projectsModule} from "./projects";
export const menuDomManipulation = (function (){
    const projHeaderImg = document.querySelector('.proj-direction-img');
    const projCotent = document.querySelector('.projects-content');
    const addProjForm = document.querySelector('.new-proj-form');
    const projectDiv = document.querySelector('.projects-content');
    let projects = ['Example project']
    function toogleProjects() {
        if(projHeaderImg.classList.contains('direc-right')){
            projHeaderImg.src = './img/down.png';
            projHeaderImg.classList.remove('direc-right');
            projCotent.classList.remove('projects-close');
        }
        else {
            projHeaderImg.src = './img/right.png';
            projHeaderImg.classList.add('direc-right');
            projCotent.classList.add('projects-close');
        }
    }
    function toogleAddProjForm() {
        addProjForm.classList.toggle('hidden');
        if(projHeaderImg.classList.contains('direc-right') && !addProjForm.classList.contains('hidden')){
            toogleProjects()
        }
    }
    function cancelAddProj() {
        const addProjName = document.querySelector('#proj-name');
        addProjName.value = '';
        addProjForm.classList.toggle('hidden');
    }
    function deleteProject(liNode) {
        liNode.remove()
    }
    function renderProjects() {
        const allProject = document.querySelectorAll('ul li');
        allProject.forEach((project) => {
            deleteProject(project);
        })
        if(!projects.length){return}
        for (const project of projects) {
            const liNode = document.createElement('li');
            const projectNameMode = document.createElement('button');
            const nameNode = document.createTextNode(project);
            projectNameMode.classList.add('btn', 'project-name-node');

            const projectImg = document.createElement('img');
            projectImg.classList.add('proj-img');
            projectImg.src = './img/projects.png';
            projectImg.alt = 'project icon';

            projectNameMode.append(projectImg, nameNode);

            const changeProjNode = document.createElement('button');
            changeProjNode.classList.add('btn', 'change-proj-btn');
            changeProjNode.title = "Change this project's name";
            const changeProjImg = document.createElement('img');
            changeProjImg.classList.add('proj-img', 'change-proj-img');
            changeProjImg.src = './img/change.png';
            changeProjImg.alt = 'change project icon';
            changeProjNode.appendChild(changeProjImg);

            const deleteProjNode = document.createElement('button');
            deleteProjNode.classList.add('btn', 'delete-proj-btn');
            deleteProjNode.title = "Delete this project";
            const deleteProjImg = document.createElement('img');
            deleteProjImg.classList.add('proj-img', 'delete-proj-img');
            deleteProjImg.src = './img/delete.png';
            deleteProjImg.alt = 'delete project icon';
            deleteProjNode.appendChild(deleteProjImg);

            liNode.append(projectNameMode, changeProjNode, deleteProjNode);
            projectDiv.appendChild(liNode);
        }
        
    }
    function addProject() {
        const addProjName = document.querySelector('#proj-name');
        if (addProjName.value.trim() === '') {return}
        projects.push(addProjName.value);
        renderProjects()
        cancelAddProj()
    }
    function deleteProjectFromEvent() {
        const projName = this.parentNode.querySelector('.project-name-node').textContent;
        const confirmDelete = confirm(`Are you sure you want to delete ${projName} ?`);
        if (!confirmDelete) {return}
        const projIndex = projects.indexOf(projName);
        projects.splice(projIndex, 1);
        renderProjects();
        projectsModule.initial()
    }
    function changeProjName() {
        const projNameNode = this.parentNode.querySelector('.project-name-node');
        const projName = this.parentNode.querySelector('.project-name-node').textContent;
        projNameNode.childNodes[1].textContent = '';

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
    }
    renderProjects()
    return {toogleProjects, toogleAddProjForm, cancelAddProj, addProject, deleteProjectFromEvent, changeProjName}
})()

export const contentDomManipulation = (function () {
    const contentHeader = document.querySelector('.content h2');
    function changeHeader(){
       console.log(this);
    }
    return {changeHeader}
})()
