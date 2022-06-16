import { PubSub } from "./pubSub.js";

export const Project = (function () {
    const create = function (name, color = 'PowderBlue') {
        let list = [];
        let id = 1;
        const addTask = function (task) {
            task.id = id;
            id++;
            list.push(task);
            PubSub.publish('taskModified', list);
            //pubslish 'taskModified' with list data
        };
        const deleteTask = function (taskId) {
            list = list.filter(obj => obj.id !== taskId);
            PubSub.publish('taskModified', list);
            //publish task modified with list data
        };
        const taskList = () => list;
        return { name, color, addTask, deleteTask, taskList };
    };
    return { create };
    /* subscribe to add and delete task events of 
     fix assignment of this to notify pubsub of the project name
    PubSub.subscribe('addTask', this.addTask);
    PubSub.subscribe('deleteTask', this.deleteTask);
    */
})();
