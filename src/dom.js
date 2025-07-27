import Projects from './project.js';
import folderImg from './images/folder.svg'
import deleteImg from './images/delete.svg';
import { format } from 'date-fns';
import { saveProjectsToLocalStorage } from './storage.js'



const UpdateDom = (function() {
    function createProjectBtnListener(btn, project) {
        btn.addEventListener('click', () => {
            displayTodos(project.name);
            setActive(btn, project.name);
        });
    }

    function setActive(btn, projectName) {
        const projectBtns = document.querySelectorAll('.project-btn');
        projectBtns.forEach((button) => {
            button.classList.remove('active');
        })

        btn.classList.add('active');
        displayTodos(projectName)
    }


    function updateProjects() {
        const projectsDiv = document.querySelector('.projects');

        projectsDiv.innerHTML = "<h2>Projects</h2>";

        const projects = Projects.getProjects();

        projects.forEach((project) => {
            const btn = document.createElement('button');
            btn.classList.add('project-btn');
            setActive(btn, project.name);
            
            btn.innerHTML = `
                <img src="${folderImg}" alt="" width="30">
                <span class="project-title">${project.name}</span>
            `;

            if (project.name !== "Inbox") {
                const delImg = document.createElement('img');
                delImg.src = deleteImg;
                delImg.width = 26;

                const delDiv = document.createElement('div');
                delDiv.classList.add('del-btn');
                delDiv.appendChild(delImg);

                delDiv.addEventListener('click', (event) => {
                    event.stopPropagation();
                    Projects.removeProject(project.name);
                    saveProjectsToLocalStorage();

                    updateProjects();
                    updateDropdown();
                });
                btn.appendChild(delDiv);
            }
            
            
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
            projectDiv.appendChild(btn);
            projectsDiv.appendChild(projectDiv);
        
            createProjectBtnListener(btn, project);
        });  
    }

    function createDelBtnListener(delBtn, project, todo) {
            delBtn.addEventListener('click', () => {
            const i = project.todos.findIndex(t => t.title === todo.title);
            project.removeTodo(i);
            displayTodos(project.name);   
            saveProjectsToLocalStorage();
        });
    }

    function addTodoDetailsDropdown(wrapper, todo) {
        wrapper.addEventListener('click', () => {
            const existingDetails = wrapper.querySelector('.details');

            if (existingDetails) {
                wrapper.removeChild(existingDetails);
                return;
            }

            const title = todo.title;
            const dueDate = todo.dueDate;
            const desc = todo.desc;
            const priority = todo.priority;

            let formatted = "";
            if(!dueDate == "") {
                const date = new Date(dueDate);
                formatted = format(date, 'M/d/yyyy, hh:mm:ss a');
            } else {
                formatted = "N/A";
            }

            const titleDiv = document.createElement('div');
            titleDiv.innerHTML  = `<b>Title:</b> ${title}`;
            const dueDateDiv = document.createElement('div');
            dueDateDiv.innerHTML  = `<b>Due Date:</b> ${formatted}`;

            const descDiv = document.createElement('div');
            descDiv.innerHTML  = `<b>Description:</b> ${desc}`;
            const priorityDiv = document.createElement('div');
            priorityDiv.innerHTML  = `<b>Priority:</b> ${priority.charAt(0).toUpperCase() + priority.slice(1)}`;

            const left = document.createElement('div');
            left.classList.add('l');
            left.appendChild(titleDiv);
            left.appendChild(dueDateDiv);

            const right = document.createElement('div');
            right.classList.add('r');
            right.appendChild(descDiv);
            right.appendChild(priorityDiv);

            const detailsDiv = document.createElement('div');
            detailsDiv.classList.add('details');    
            detailsDiv.appendChild(left);
            detailsDiv.appendChild(right);

            wrapper.appendChild(detailsDiv);
            
        });
    }

    function displayTodos(projectName) {
        const name = document.querySelector('.project-name');
        name.innerHTML = "";
        name.textContent = projectName;

        const todosDiv = document.querySelector('.todos');
        todosDiv.innerHTML = "";

        const projects = Projects.getProjects();

        const project = projects.find(project => project.name == projectName);

        project.todos.forEach(todo => {
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.addEventListener('click', (event) => {
                event.stopPropagation();
            });

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
            delBtn.classList.add('del-btn');
            delBtn.appendChild(delImg);

            createDelBtnListener(delBtn, project, todo);

            const rightDiv = document.createElement('div');
            rightDiv.classList.add('right-side');
            rightDiv.appendChild(dueDate);
            rightDiv.appendChild(delBtn);

            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            todoDiv.appendChild(leftDiv);
            todoDiv.appendChild(rightDiv);

            const wrapper = document.createElement('div');
            wrapper.classList.add('wrap');

            wrapper.appendChild(todoDiv);
            todosDiv.appendChild(wrapper);

            addTodoDetailsDropdown(wrapper, todo);
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

    return { updateProjects, displayTodos, updateDropdown, setActive };
})();

export default UpdateDom;