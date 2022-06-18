import { PubSub } from "./pubSub.js";

export const Project = (function () {
    const create = function (name, color = 'PowderBlue') {
        let list = [];
        let id = 1;
        const addTask = function (task) {
            console.log(task);
            console.log(id);
            task.id = id;
            id++;
            list.push(task);
            PubSub.publish(`project${this.id}TaskAdded`, list);
            //broadcast project#taskAdded with update list data;
        };
        const deleteTask = function (taskId) {
            list = list.filter(obj => obj.id !== taskId);
            PubSub.publish(`project${this.id}TaskDeleted`, list);
            //broadcast project#taskDeleted with update list data;
        };
        const taskList = () => list;
        PubSub.subscribe(`project${this.id}AddTask`, this.addTask);
        //listen when tasks are added to the project and call this.addTask
        PubSub.subscribe(`project${this.id}DeleteTask`, this.deleteTask);
        return { name, color, addTask, deleteTask, taskList };
        //listen when tasks are deleted the project and call this.deleteTask
    };
    return { create };
})();

PubSub.publish()
