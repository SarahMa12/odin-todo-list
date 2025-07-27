import './styles.css';
import './project-content.css'
import './dialog.css'
import UpdateDom from './dom.js'
import Projects from './project.js';
import { createToDo, addToDoToProject } from './todo.js';
import { format } from 'date-fns';

const addProjectBtn = document.querySelector('.add-project-btn');
const addProjectDialog = document.querySelector('.add-project-dialog');
const addProjectCancelBtn = document.querySelector('.add-project-cancel-btn');
const addProjectForm = document.querySelector('.add-project-form');
const projects = document.querySelectorAll('.project');
const addTodoBtn = document.querySelector('.add-todo-btn');
const addTodoDialog = document.querySelector('.add-todo-dialog');
const addTodoCancelBtn = document.querySelector('.add-todo-cancel-btn');
const addTodoForm = document.querySelector('.add-todo-form');

// ADD PROJECT
addProjectBtn.addEventListener('click', () => {
    addProjectDialog.showModal();
});

addProjectCancelBtn.addEventListener('click', () => {
    addProjectDialog.close();
});

addProjectForm.addEventListener('submit', (e) => { 
    e.preventDefault();

    const name = addProjectForm.name.value;
    Projects.addProject(name);
    Projects.getProjects();

    UpdateDom.updateProjects();
    UpdateDom.updateDropdown();

    // attachProjectBtnListeners();

    addProjectDialog.close();
    addProjectForm.reset();
});

// ADD TODO
addTodoBtn.addEventListener('click', () => {
    addTodoDialog.showModal();
});

addTodoCancelBtn.addEventListener('click', () => {
    addTodoDialog.close();
});

addTodoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = addTodoForm.title.value.trim();
    const desc = addTodoForm.desc.value;
    const dueDate = addTodoForm.dueDate.value;
    const priority = addTodoForm.priority.value;
    const projectName = addTodoForm.project.value;

    if(!dueDate == "") {
        const date = new Date(dueDate);
        var formatted = format(date, 'MMMM d, yyyy');
    }
        
    const todo = createToDo(title, desc, formatted, priority);

    const projects = Projects.getProjects();
    const project = projects.find((project) => project.name == projectName);

    project.addToDo(todo);

    UpdateDom.displayTodos(projectName);
    addTodoDialog.close();
    addTodoForm.reset();

});

// INITIALIZE PAGE
function initPage() {
    UpdateDom.updateProjects();
    UpdateDom.updateDropdown();
}

initPage();
