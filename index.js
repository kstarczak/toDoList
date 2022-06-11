let userName = prompt('Welcome to my "to do" list! Enter your name to get started.');

//module to create a new task Object with name property and default properties and return it
Task = (function () {
    create = function(name, description = null, due = null, priority = "normal") {
        return { name, description, due, priority };
    };
    return {create};

})();


//module to create a new project with methods to add, remove and delete
Project = (function () {
    create = function (name, color='PowderBlue') {
        const list = [];
        let id = 1;
        const addTask = function (task) {
            task.id = id;
            id++;
            list.push(task);
        };
        const getTaskIndex = function (array, task) {
            return array.findIndex(obj => task.id === obj.id);
        };
        const removeTask = function (task) {
            index = getTaskIndex(this.taskList(), task)
            console.log(index);
            if (index) {list.splice(index, 1)};
        };
        const taskList = () => list;
        return { name, color, addTask, removeTask, taskList };
    };
    return { create };
})();


ToDoList = (function () {
    create = function (user) {
        const list = [];
        let id = 1;
        const addProject = function (project) {
            project.id = id;
            id++;
            list.push(project)
        };
        const getProjectIndex = function (array, project) {
            return array.findIndex(obj => project.id === obj.id);
        };
        const removeProject = function (project) {
            index = getProjectIndex(this.ProjectList(), project)
            console.log(index);
            if (index) {list.splice(index, 1)};
        };
        const projectList = () => list;
        return { user, addProject, removeProject, projectList };
    };
    return { create };

})();

const userList = ToDoList.create(userName);
addTemplate(userList);

function addTemplate(list) {
    const tempTask1 = Task.create('Buy milk');
    const tempTask2 = Task.create('Pay cable bill');
    const tempProject = Project.create('My Errands');
    tempProject.addTask(tempTask1);
    tempProject.addTask(tempTask2);
    list.addProject(tempProject);
}

const PubSub = (function () {
    const events = {};
    const subscribe = function (event, func) {
        console.log(events[event]);
        if (!events[event]) {
            events[event] = []
        };
        console.log(events[event]);
        events[event].push(func);
    };
    const unsubscribe = function (event, func) {
        if (events[event]) {
            events[event].filter((f) => f !== func);
        }
    };
    const publish = function (event, data) {
        if (events[event]) {
            events[event].forEach((func) => func(data));
        };
    };
    const showEvents = () => events;
    
    return {subscribe, unsubscribe, publish, showEvents};
    
})();

const Interface = (function() {
    const content = document.querySelector('.content');
    const load = function(list) {
        const sideBar = document.createElement('div');
        sideBar.classList.add('side-bar');

        const mainHeader = document.createElement('div');
        mainHeader.classList.add('main-header');
        mainHeader.textContent = `${list.user}'s To Do List`;

        const projectList = document.createElement('div');
        projectList.classList.add('project-list');

        sideBar.append(mainHeader, projectList);

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        projectHeader.textContent = 'Your Projects:'

        projectList.appendChild(projectHeader);

        const projects = list.projectList();
        const projectDOM = [];
        projects.forEach(function(project, i) {
            projectDOM[i] = document.createElement('div');
            projectDOM[i].classList.add('project',`${project.id}`);
            projectDOM[i].textContent = project.name;
            projectList.appendChild(projectDOM[i]);
        });

        const taskList = document.createElement('div');
        taskList.classList.add('task-list');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');
        taskHeader.textContent = 'TEMPORARY LIST HEADER';
        taskList.appendChild(taskHeader);

        content.append(sideBar, taskList);
    };
    const clear = () => {
        while (content.firstChild) {
            content.removeChild(content.lastChild);
        }
    }
    const modify = function (module) {
        function createForm(module) {
            const form = document.createElement('div');
            form.classList.add(`${module}-form`);
            const header = document.createElement('div');
            header.textContent = `Create ${module}`;
            const name = document.createElement ()
        }





    }
    return {load, clear, modify};
})();

Interface.load(userList);


/* 
console test code:

task1 = Task.create('get milk');
task2 = Task.create('dance');
task3 = Task.create('workout');
project1 = Project.create('errands');
project1.addTask(task1);
project1.addTask(task2);
project1.addTask(task3);
project1.removeTask(task2);
project1.taskList();
*/