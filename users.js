import { PubSub } from './pubSub.js';
import { ToDoList } from './toDoList.js';
import { Project } from './project.js';
import { Task } from './task.js';

export const Users = (function () {
    let currentUser;
    const allUsers = [];
    const addUser = function (name) {
        const newUser = ToDoList.create(name);
        //edit above code to listen to creation events rather than call toDoList
        allUsers.push(newUser);
        changeUser(newUser);
    };
    const changeUser = function (user) {
        if (user in allUsers && user !== currentUser) {
            if (currentUser) {currentUser.selected = false;}
            currentUser = user;
            currentUser.selected = true;
        };
        //announce that the user was changed, interface will listen for this
        PubSub.publish('CurrentUserChanged', currentUser );
    };
    // add some function to get the user on page laod
    const getCurrentUser  = () => currentUser;
    return {addUser, changeUser, getCurrentUser};
}) ();

//subscribe to events where new user is created, interface will announce this 
PubSub.subscribe('addUser', Users.addUser);



function addTemplate(list) {
    const templateProject = Project.create('My Errands');
    templateProject.addTask(Task.create({ name: 'Buy milk' }));
    templateProject.addTask(Task.create({ name: 'Pay cable bill' }));
    list.addProject(templateProject);
;
}