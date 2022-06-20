import { PubSub } from "./pubSub.js";

export const ToDoList = (function () {
    const create = function (user) {
        let list = [];
        let id = 1;
        const addProject = function (project) {
            project.id = id;
            id++;
            list.push(project)
            PubSub.publish('ProjectListModified', list);
            //publushd with list data
        };
        const deleteProject = function (projectId) {
            list = list.filter(obj => obj.id !== ProjectId);
            PubSub.publish('ProjectListModified', list);
            //publish with list data
        };
        const projectList = () => list;
        return { user, addProject, deleteProject, projectList };
        
    };
    return { create };

})();
