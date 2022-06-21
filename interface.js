import { PubSub } from './pubSub.js';
import { deleteAllChildren } from "./myLibrary.js";

const Interface = (function () {
    //selects content div on html file and, deletes any children, then creates interface based on userList
    const load = function (userList) {
        const content = document.querySelector('.content');
        deleteAllChildren(content);

        const mainHeader = document.createElement('nav');
        mainHeader.classList.add('main-header');
        mainHeader.textContent = `${userList.user}'s To Do List`;

        const projectContent = document.createElement('div');
        projectContent.classList.add('project-content');

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');

        content.append(mainHeader, projectContent, taskContent);
        ProjectInterface.load(userList);
    };

    
    return { load};
})();


PubSub.subscribe('currentUserChanged', Interface.load);



const ProjectInterface = (function () {

    const load = function (userList) {
        const projectContent = document.querySelector('.project-content');

        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        projectHeader.textContent = 'Your Projects:';

        const projectList = document.createElement('ul')
        projectList.classList.add('project-list');

        const addProjectButton = document.createElement('a');
        addProjectButton.classList.add('add-project-button');
        addProjectButton.textContent = 'Add Project'
        addProjectButton.addEventListener('click', addProject);;

        projectContainer.append(projectHeader, projectList, addProjectButton);
        projectContent.append(projectContainer);

        loadList(userList.projectList());
        
    };

    const loadList = function (projectList) {
        const projectDiv = document.querySelector('.project-list');
        deleteAllChildren(projectList);
        projectList.forEach(function (project) {
            listItem = document.createElement('li');
            listItem.innerHTML = `<a id="${project.id}" class="project-link">${project.name}</a>`;
            link = document.querySelector(`a#${project.id}`);
            link.addEventListener('click', deleteProject);
            projectDiv.appendChild(listItem);
            
        });
    };
    function deleteProject(e) {
        projectId = e.target.Id;
        // publsish delete project with project ID data
        PubSub.publish('deleteProject', projectId);
    }


    
    //listen for project list modified and loadlist
    PubSub.subscribe('projectListModified', loadList);


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
            //submitButton.addEventListener('click', submitForm);

            buttons.append(cancelButton, submitButton);

            form.append(header, nameInput, colorInput, buttons);
            forms.append(form);
        };
        function closeForm() {
            deleteAllChildren(forms);
            contentCover.style.display = 'none';
        }
        /*function submitForm() {
            const name = document.querySelector('#name').value;
            const color = document.querySelector('#color').value;
            const newProject = Project.create(name, color);
            // add publish event later to allow cfactory function to do the work
            closeForm();
            PubSub.publish('addProject', newProject);
            // broadcast add project with project data
        }
        */
        createForm();
    };
    return { load };
}
)();

//PubSub.subscribe('ProjectIDModified', ProjectInterface.load)
//PubSub.subscribe('projectDeleted', ProjectInterface.load)


/*
const TaskInterface = (function () {
    const load = function (currentProject) {
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

    //PubSub.subscribe('projectModified')
}
)();
*/


export { Interface, ProjectInterface};