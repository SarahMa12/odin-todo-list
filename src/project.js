const Projects = (function() {
    const projects = [{name: "Project Name", todos: []}];

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
        for(let project of projects) {
            console.log(project.name);
            console.log(project.todos);
        }
        return projects;
    }

    function addProject(name) {
        const project = createProject(name);
        projects.push(project);
    }

    return { getProjects, addProject }; 

})();

export default Projects;