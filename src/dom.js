import Projects from './project.js';
import folderImg from './images/folder.svg'

const UpdateDom = (function() {
    function updateProjects() {
        const projectsDiv = document.querySelector('.projects');

        projectsDiv.innerHTML = "<h2>Projects</h2>";

        const projects = Projects.getProjects();

        projects.forEach((project) => {
            const btn = document.createElement('button');
            btn.innerHTML = `
                <img src="${folderImg}" alt="" width="30">
                ${project.name}
            `;
            
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');
            projectDiv.appendChild(btn);

            projectsDiv.appendChild(projectDiv);
        });
    }

    function displayTodos(projectName) {
        const todosDiv = document.querySelector('.todos');

        const projects = Projects.getProjects();

        const project = projects.find(project => project.name == projectName);
    }

    return { updateProjects };
})();

export default UpdateDom;