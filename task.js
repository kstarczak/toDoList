
import { PubSub } from "./pubSub.js";

export const Task = (function () {
    const create = function(obj) {
        const { name, description = null, due = null, proiority = 'normal' } = obj;
        return { name, description, due, proiority };       
    };
    return {create};

})();

PubSub.subscribe('createTask', Task.create)
//listen for createTask event and call task create with obj data