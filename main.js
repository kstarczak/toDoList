import { Users } from './users.js';
import { Interface } from './interface.js';



/*
on load run the users module which will run:
let currentUser = prompt('Welcome to my "To Do" List. Enter your name to get started.');
*/

let currentUser = prompt('Welcome to my "To Do" List. Enter your name to get started.');

Users.addUser(currentUser);
