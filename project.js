import { listObject } from "./myLibrary.js";

export const Project = (function () {
    const create = function (name, color = 'PowderBlue') {
        type = 'taskList';
        const list = [];
        let id = 1;
        return Object.assign(Object.create(listObject),{ name, type, color, id, list });
    };
    return { create };
})();
