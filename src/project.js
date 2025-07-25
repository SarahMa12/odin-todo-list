const Projects = (function() {
    const projects = [createProject("Project Name")];

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

    return { getProjects, addProject }; 

})();

export default Projects;