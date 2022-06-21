import { PubSub } from './pubSub.js';
import { ToDoList } from './toDoList.js';

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
        if (user in allUsers) {
            currentUser = user;
        };
        PubSub.publish('CurrentUserChanged', currentUser );
    };
    // add some function to get the user on page laod
    const getCurrentUser  = () => currentUser;
    return {addUser, changeUser, getCurrentUser};
}) ();