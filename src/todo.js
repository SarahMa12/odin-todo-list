import Projects from './project.js'

function createToDo(title, desc, dueDate, priority) {
    return {
        title,
        desc,
        dueDate,
        priority,
    };
}

function addToDoToProject(todo, projectName) {
    const projects = Projects.getProjects();

    const project = projects.find(project => project.name == projectName);

    project.todos.push(todo);
}

export { createToDo, addToDoToProject };