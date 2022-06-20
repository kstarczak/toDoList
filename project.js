import { PubSub } from "./pubSub.js";

export const Project = (function () {
    const create = function (name, color = 'PowderBlue') {
        let list = [];
        let id = 1;
        const addTask = function (task) {
            task.id = id;
            id++;
            list.push(task);
            PubSub.publish('projectModified', list);
        };
        const deleteTask = function (taskId) {
            list = list.filter(obj => obj.id !== taskId);
            PubSub.publish('projectModified', list);
        };
        const taskList = () => list;
        
        PubSub.subscribe(`AddTaskToProject${this.id}`, this.addTask);
        //listen when tasks are added to the project and call this.addTask
        PubSub.subscribe(`DeleteTaskFromProject${this.id}`, this.deleteTask);

        return { name, color, addTask, deleteTask, taskList };
        //listen when tasks are deleted from the project and call this.deleteTask
    };
    return { create };
})();

PubSub.publish()
0