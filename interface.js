import { PubSub } from './pubSub.js';
import { Task } from './task.js';
import { Project } from './project.js';
import { deleteAllChildren } from "./myLibrary.js";

const Interface = (function () {

    const load = function (list) {
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
        projectHeader.textContent = 'Your Projects:'

        const addProjectButton = document.createElement('a');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.textContent = 'Add Project'
        addProjectButton.addEventListener('click', addProject);

        const projectList = document.createElement('ul')
        projectList.classList.add('project-list');
        //projectList.addEventListener('click', deleteProject);

        projectContainer.append(projectHeader, addProjectButton, projectList);

        sideBar.append(mainHeader, projectContainer);

        const taskList = document.createElement('div');
        taskList.classList.add('task-list');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskHeader.textContent = 'TEMPORARY LIST HEADER';
        taskList.appendChild(taskHeader);

        document.querySelector('.content').append(sideBar, taskList);


        //ProjectInterface.load(list);
    };

    /* const addProject = function() {
        open up a form with user info//
        submitttin form will call Project.create and announce this data as Projectcreadted
        elsewhere toDoList.addProject will run  => this will announce projectModified => project infterface will be subscribed to this
    };
    */ 
    
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
            const colorInput = document.createElement('input');
            colorInput.id = 'color';
            const cancelButton = document.createElement('a');
            cancelButton.classList.add('button');
            cancelButton.id = 'cancel-button';
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('click', closeForm);
            const submitButton = document.createElement('a')
            submitButton.classList.add('button');
            submitButton.id = 'submit-button'
            submitButton.textContent = 'Create';
            cancelButton.addEventListener('click', submitForm);

            form.append(header, nameInput, colorInput, cancelButton, submitButton);
            forms.append(form);
        };
        function closeForm() {
            deleteAllChildren(forms);
            contentCover.style.display = 'none';
        }
        function submitForm() {
            const name = nameInput.value;
            const color = colorInput.value;
            //fix to not require import of project and task
            closeForm();
            PubSub.publish('addProject', Project.create(name, color));
        }
        createForm();
    };

    return { load};
})();



/*
const ProjectInterface = (function () {
    const load = function (list) {
        projectList = document.querySelector('.project-list');
        deleteAllChildren(projectList);
        const projects = list.projectList();
        projects.forEach(function (project) {
            listItem = document.createElement('li');
            listItem.innerHTML = `<a id="${project.id}" class="project-link">${project.name}</a>`;
            projectList.appendChild(listItem);
        });
        const listLinks = domcument.querySelectorAll('.project-link');
        listLinks.forEach.addEventListener('click', deleteProject)
    };
    function deleteProject(e) {
        PubSub.publish('deleteProject',)
    }
    PubSub.subscribe('projectModified', load)
    //// fiure out how to vall the function with the proper list etc
    return { load };
}
)();
*/


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

export { Interface};