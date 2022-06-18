import { PubSub } from './pubSub.js';
import { Task } from './task.js';
import { Project } from './project.js';
import { deleteAllChildren } from "./myLibrary.js";

const Interface = (function () {

    const load = function (list) {
        console.log(list);
        const content = document.querySelector('.content');
        deleteAllChildren(content);

        const sideBar = document.createElement('div');
        sideBar.classList.add('side-bar');
        const mainHeader = document.createElement('div');
        mainHeader.classList.add('main-header');
        mainHeader.textContent = `${list.user}'s To Do List`;

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');

        const projectHeaderTitle = document.createElement('div');
        projectHeaderTitle.classList.add('project-header-title');
        projectHeaderTitle.textContent = 'Your Projects:';

        const addProjectButton = document.createElement('a');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.textContent = 'Add Project'
        addProjectButton.addEventListener('click', addProject);
        projectHeader.append(projectHeaderTitle, addProjectButton);

        const projectList = document.createElement('ul')
        projectList.classList.add('project-list');
        //projectList.addEventListener('click', deleteProject);

        projectContainer.append(projectHeader, projectList);

        sideBar.append(mainHeader, projectContainer);

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const taskHeaderTitle = document.createElement('div');
        taskHeaderTitle.classList.add('task-header-title');
        taskHeaderTitle.textContent = 'Your tasks:';

        const addtaskButton = document.createElement('a');
        addtaskButton.classList.add('add-task-button');
        addtaskButton.textContent = 'Add task'
        //addtaskButton.addEventListener('click', addtask);
        taskHeader.append(taskHeaderTitle, addtaskButton);

        const taskList = document.createElement('ul');
        taskList.classList.add('task-list');

        taskContainer.appendChild(taskHeader, taskList);

        document.querySelector('.content').append(sideBar, taskContainer);



    };

 
    
    const addProject = function () {
        const contentCover = document.querySelector('.content-cover');
        const forms = document.querySelector('.forms');
        function createForm() {
            contentCover.style.display = 'block';
            const form = document.createElement('div');
            form.classList.add('form');

            const header = document.createElement('div');
            header.textContent = 'Create New Project';

            const nameInput = document.createElement('input');
            nameInput.id = 'name';
            nameInput.setAttribute('type', 'text');
            nameInput.placeholder = 'Enter project name'

            const colorInput = document.createElement('input');
            colorInput.id = 'color';
            colorInput.setAttribute('type', 'text')
            colorInput.placeholder = 'Choose a color (optional)';

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            const cancelButton = document.createElement('a');
            cancelButton.classList.add('button');
            cancelButton.id = 'cancel-button';
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', closeForm);

            const submitButton = document.createElement('a')
            submitButton.classList.add('button');
            submitButton.id = 'submit-button'
            submitButton.textContent = 'Create';
            submitButton.addEventListener('click', submitForm);

            buttons.append(cancelButton, submitButton);

            form.append(header, nameInput, colorInput, buttons);
            forms.append(form);
        };
        function closeForm() {
            deleteAllChildren(forms);
            contentCover.style.display = 'none';
        }
        function submitForm() {
            const name = document.querySelector('#name').value;
            const color = document.querySelector('#color').value;
            const newProject = Project.create(name, color);
            // add publish event later to allow cfactory function to do the work
            closeForm();
            PubSub.publish('addProject', newProject);
            // broadcast add project with project data
        }
        createForm();
    };

    return { load};
})();



const ProjectInterface = (function () {
    const load = function (userlist) {
        const projectList = document.querySelector('.project-list');
        deleteAllChildren(projectList);
        console.log(userlist);
        const projects = userlist.projectList();
        console.log(projects)
        projects.forEach(function (project) {
            listItem = document.createElement('li');
            listItem.innerHTML = `<a id="${project.id}" class="project-link">${project.name}</a>`;
            projectList.appendChild(listItem);
        });
        const listLinks = domcument.querySelectorAll('.project-link');
        listLinks.forEach.addEventListener('click', deleteProject)
    };
    function deleteProject(e) {
        listItem = e.target.parentElement;
        projectList.removeChild(listItem);
        alert(e.target.id);
        // publsish delete project with project ID data
        PubSub.publish('deleteProject', e.target.id);
    }
    
   
    //// fiure out how to vall the function with the proper list etc
    return { load };
}
)();

PubSub.subscribe('projectAdded', ProjectInterface.load)
PubSub.subscribe('projectDeleted', ProjectInterface.load)


/*
const TaskInterface = (function () {
    const load = function (project) {
        taskList = document.querySelector('task-list');
        deleteAllChildren(taskList);
        tasks = project.taskList();
        tasks.forEach(function (task) {
            listItem = document.createElement('li');
            listItem.id = `${task.id}`;
            listItem.textContent = task.name;
            taskList.append(listItem);
        });

    };
    PubSub.subscribe('projectsModified', load)
    //// fiure out how to vall the function with the proper list etc
    return { load };
}
)();
*/

export { Interface, ProjectInterface};