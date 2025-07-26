import './styles.css';
import UpdateDom from './dom.js'
import Projects from './project.js';

const addProjectBtn = document.querySelector('.add-project-btn');
const addProjectDialog = document.querySelector('.add-project-dialog');
const cancelBtn = document.querySelector('.cancel-btn');
const addProjectForm = document.querySelector('.add-project-form');
const projects = document.querySelectorAll('.project');
const addTodoBtn = document.querySelector('.add-todo-btn');
const addTodoDialog = document.querySelector('.add-todo-dialog');

addProjectBtn.addEventListener('click', () => {
    addProjectDialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    addProjectDialog.close();
});

addProjectForm.addEventListener('submit', (e) => { 
    e.preventDefault();

    const name = addProjectForm.name.value;
    Projects.addProject(name);
    Projects.getProjects();

    UpdateDom.updateProjects();

    addProjectDialog.close();
});

projects.forEach((project) => {
    project.addEventListener('click', () => {
        UpdateDom.displayTodos();
    });
});

addTodoBtn.addEventListener('click', () => {
    addTodoDialog.showModal();
});