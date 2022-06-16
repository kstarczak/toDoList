
import { PubSub } from "./pubSub.js";

export const Task = (function () {
    const create = function(name, description = null, due = null, priority = "normal") {
        return { name, description, due, priority };
        
    };
    return {create};

})();