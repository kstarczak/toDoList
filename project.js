import { listObject } from "./myLibrary.js";

export const Project = (function () {
    const create = function (name, color = 'PowderBlue') {
        const type = 'taskList';
        let selected = false;
        const list = [];
        let id = 1;
        return Object.assign(Object.create(listObject),{ name, type, color, id, list });
    };
    return { create };
})();
