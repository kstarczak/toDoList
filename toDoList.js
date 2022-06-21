import { PubSub } from "./pubSub.js";

export const ToDoList = (function () {
    const create = function (name) {
        const type = 'projectList';
        const selected = false;
        const list = [];
        let id = 1;
        return Object.assign(Object.create(listObject),{ name, type, selected, id, list });
    };
    return { create };

})();
