import StateManager from "./StateManager";
import UiManager from "./UiManager";
import { initialState } from "./data";

const ui = new UiManager();
const state = new StateManager(initialState);

function main() {
  ui.renderProjectList(state.getState().projects);
  ui.updateTaskList(state.getState().projects[0].tasks);
  ui.renderDropdown(state.getState().projects);
  ui.initSelectedProject(state.getState().projects);

  state.subscribe((newState) => {
    ui.renderProjectList(newState.projects);
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    console.log(target);

    if (target.classList.contains("dropdown-item")) {
      handleDropdownItemClick(state.getState(), target);
    }

    if (target.classList.contains("custom-checkbox")) {
      handleCheckboxClick(target);
    }
  });
}

main();

function handleDropdownItemClick(data, target) {
  const selectedProject = document.querySelector("#selected-project");
  const id = Number(target.dataset.value);

  const activeProject = data.projects.find((element) => element.id === id);
  selectedProject.textContent = activeProject.name;
  ui.updateTaskList(activeProject.tasks);
}

function handleCheckboxClick(target) {
  const id = Number(target.closest(".task").dataset.id_task);

  state.setState((currentState) => {
    const updateProjects = currentState.projects.map((project) => {
      const updateTasks = project.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: target.checked };
        }
        return task;
      });
      return { ...project, tasks: updateTasks };
    });
    return { ...currentState, projects: updateProjects };
  });
}
