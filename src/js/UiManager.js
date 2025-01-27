export default class UiManager {
  constructor() {
    this.projectWrapper = document.querySelector(".project-wrapper");
    this.taskWrapper = document.querySelector(".task-wrapper");
    this.dropDownContent = document.querySelector(".dropdown-content");
  }

  initSelectedProject(data) {
    document.querySelector("#selected-project").textContent = data[0].name;
  }

  createDropDownItem(project) {
    const item = document.createElement("div");
    item.className = "dropdown-item";
    item.dataset.value = project.id;
    item.textContent = project.name;

    this.dropDownContent.append(item);
  }

  createProjectElement(project) {
    const item = document.createElement("div");
    item.className = "item project";
    item.dataset.id_project = project.id;
    item.innerHTML = `
            <span>${project.name}</span>
            <span class="count">${this.countDone(project.tasks)}</span>
        `;
    this.projectWrapper.append(item);
  }

  createTaskElement(task) {
    const item = document.createElement("div");
    item.className = "item task";
    item.dataset.id_task = task.id;
    item.dataset.id_task = task.id;
    item.innerHTML = `
            <label class="checkbox-wrapper">
                <input type="checkbox" class="custom-checkbox" ${task.done === true ? "checked" : ""}>
                <span>${task.name}</span>
            </label>
        `;
    this.taskWrapper.append(item);
  }

  updateTaskList(newTaskList) {
    const taskList = document.querySelectorAll(".task");
    taskList.forEach((element) => element.remove());

    newTaskList.forEach((task) => this.createTaskElement(task));
  }

  renderProjectList(newProjectList) {
    const projectList = document.querySelectorAll(".project");
    projectList.forEach((element) => element.remove());

    newProjectList.forEach((project) => this.createProjectElement(project));
  }

  renderDropdown(projectList) {
    const dropdownList = document.querySelectorAll(".dropdown-item");
    dropdownList.forEach((element) => element.remove());

    projectList.forEach((item) => this.createDropDownItem(item));
  }

  countDone(taskList) {
    let count = 0;

    if (taskList !== undefined) {
      for (let i = 0; i < taskList.length; i++) {
        taskList[i].done === true ? count++ : count;
      }
      return count;
    }
  }
}
