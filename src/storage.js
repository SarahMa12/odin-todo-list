import Projects from './project.js';
import UpdateDom from './dom.js';

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
}

function saveProjectsToLocalStorage() {
    if (!storageAvailable('localStorage')) {
        console.warn('localStorage not available. Cannot save projects.');
        return;
    }
    const projects = Projects.getProjects();
    localStorage.setItem('projects', JSON.stringify(projects));
}

function loadProjectsFromLocalStorage() {
    if (!storageAvailable('localStorage')) {
        console.warn('localStorage not available. Cannot load projects.');
        return;
    }
    const saved = localStorage.getItem('projects');
    if(saved) {
        Projects.clearProjects(); 
        const parsedSaved = JSON.parse(saved);
        console.log(parsedSaved);
        parsedSaved.forEach((projectData) => {
          Projects.addProject(projectData.name);
          console.log("Project added!");
          const project = Projects.getProjects().find(p => p.name == projectData.name);
          console.log("PROJECT" + project);
          projectData.todos.forEach(todo => {
              project.addToDo(todo);
              console.log("Todo added!");
          });
        });
        UpdateDom.updateProjects();
        UpdateDom.updateDropdown();

        const projects = Projects.getProjects();
        if (projects.length > 0) {
          UpdateDom.displayTodos(projects[0].name);
        }
    }
}


export { saveProjectsToLocalStorage, loadProjectsFromLocalStorage };