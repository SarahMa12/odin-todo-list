const Projects = (function() {
    const projects = [createProject("Inbox")];

    function createProject(name) {
        const todos = [];
        return {
            name, 
            todos,
            addToDo(todo) {
                todos.push(todo);
            },
            removeTodo(index) {
                todos.splice(index, 1);
            }
        }
    }

    function getProjects() {
        return projects;
    }

    function addProject(name) {
        const project = createProject(name);
        projects.push(project);
    }

    function removeProject(name) {
        const index = projects.findIndex(project => project.name === name);
        projects.splice(index, 1);
    }

    function clearProjects() {
        projects.length = 0;
    }

    return { getProjects, addProject, removeProject, clearProjects }; 

})();

export default Projects;