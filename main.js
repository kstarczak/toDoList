import { ToDoList } from './toDoList.js';
import { Project } from './project.js';
import { Task } from './task.js';
import { Interface, ProjectInterface } from './interface.js';


let currentUser = prompt('Welcome to my "To Do" List. Enter your name to get started.');

const currentUserList = ToDoList.create(currentUser);

function addTemplate(list) {
    const templateProject = Project.create('My Errands');
    
    templateProject.addTask(Task.create({ name: 'Buy milk' }));

    templateProject.addTask(Task.create({ name: 'Pay cable bill' }));
    list.addProject(templateProject);
}

Interface.load(currentUserList);
addTemplate(currentUserList);
ProjectInterface.load(currentUserList);

