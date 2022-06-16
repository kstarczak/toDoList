import { PubSub } from "./pubSub.js";

export const ToDoList = (function () {
    const create = function (user) {
        let list = [];
        let id = 1;
        const addProject = function (project) {
            project.id = id;
            id++;
            list.push(project)
            PubSub.publish('projectModified', list);
            //publush taskModified with list data
        };
        const deleteProject = function (projectId) {
            list = list.filter(obj => obj.id !== ProjectId);
            PubSub.publish('projectModified', list);
            //publish taskmodified with list data
        };
        const projectList = () => list;
        PubSub.subscribe('addProject', this.addProject);
        PubSub.subscribe('deleteProject', this.deleteProject);
        return { user, addProject, deleteProject, projectList };
    };
    return { create };

})();
