//create a new task Object with name property and default properties and return it
Task = (function () {
    create = function(name, description = null, due = null, priority = "normal") {
        return { name, description, due, priority };
    };
    return {create};

})();


//create a new project with methods to add, remove and delete
Project = (function () {
    create = function (name, color) {
        const list = [];
        addTask = function (task) {
            task.listIndex = list.length;
            list.push(task);
        };
        removeTask = function (task) {
            index = task.index;
            list.splice(index, 1);
        };
        // populateList (function that creates a list in the DOM)
        return { name, color, addTask, removeTask };
    };
    return { create };
})();




//toDolist module creates and maintains lists
//--projectModule creates and mantains projects
//--taskModule crea