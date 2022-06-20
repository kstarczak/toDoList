import { PubSub } from './pubSub.js';
import { ToDoList } from './toDoList.js';

export const Users = (function () {
    const allUsers = [];
    const addUser = function (name) {
        const newUser = ToDoList.create(name)
        //publisj new user added
        allUsers.push(newUser);
        
    }
}) ();