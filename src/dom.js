import Projects from './project.js';
import folderImg from './images/folder.svg'
import deleteImg from './images/delete.svg';

const UpdateDom = (function() {
    function updateProjects() {
        const projectsDiv = document.querySelector('.projects');

        projectsDiv.innerHTML = "<h2>Projects</h2>";

        const projects = Projects.getProjects();

        projects.forEach((project) => {
            const btn = document.createElement('button');
            btn.classList.add('project-btn');
            btn.innerHTML = `
                <img src="${folderImg}" alt="" width="30">
                <span class="project-title">${project.name}</span>
            `;
            
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
            projectDiv.appendChild(btn);

            projectsDiv.appendChild(projectDiv);
        });
    }

    function displayTodos(projectName) {
        const todosDiv = document.querySelector('.todos');
        todosDiv.innerHTML = "";

        const projects = Projects.getProjects();

        const project = projects.find(project => project.name == projectName);

        todosDiv.innerHTML = "";

        project.todos.forEach(todo => {
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";

            const title = document.createElement('span');
            title.classList.add('todo-title');
            title.textContent = todo.title;

            const leftDiv = document.createElement('div');
            leftDiv.classList.add('left-side');
            leftDiv.appendChild(checkbox);
            leftDiv.appendChild(title);

            const dueDate = document.createElement('span');
            dueDate.classList.add('due-date');
            dueDate.textContent = todo.dueDate;
            
            const delImg = document.createElement('img');
            delImg.src = deleteImg;
            delImg.width = "26";

            const delBtn = document.createElement('button');
            delBtn.appendChild(delImg);

            const rightDiv = document.createElement('div');
            rightDiv.classList.add('right-side');
            rightDiv.appendChild(dueDate);
            rightDiv.appendChild(delBtn);

            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            todoDiv.appendChild(leftDiv);
            todoDiv.appendChild(rightDiv);

            todosDiv.appendChild(todoDiv);
        });
    }

    function updateDropdown() {
        const dropdown = document.getElementById('project');

        dropdown.innerHTML = "";
        const projects = Projects.getProjects();

        projects.forEach((project) => {
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            dropdown.appendChild(option);
        });
    }

    return { updateProjects, displayTodos, updateDropdown };
})();

export default UpdateDom;