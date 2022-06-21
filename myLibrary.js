const deleteAllChildren = function (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }
};

const listObject = {
    add: function(item) {
        item.id = this.id;
        this.id++;
        this.list.push(item);
        const pubList = this.list;
        PubSub.publish(`${this.type}Modified`, pubList);
    },
    delete: function (itemId) {
        this.list = this.list.filter(obj => obj.id !== itemId);
        const pubList = this.list;
        PubSub.publish(`${this.type}Modified`, pubList);
    }
};

/* function createForm() {
    const form = document.createElement('div');
    form.classList.add('project-form');

    const header = document.createElement('div');
    header.textContent = 'Create New Project';
    const nameInput = document.createElement('input');
    nameInput.id = 'name';
    nameInput.setAttribute('type', 'text');
    const colorInput = document.createElement('input');
    colorInput.id = 'color';
    const cancelButton = document.createElement('a');
    cancelButton.classList.add('button');
    cancelButton.id = 'cancel-button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', deleteAllChildren(forms));
    const submitButton = document.createElement('a')
    submitButton.classList.add('button');
    submitButton.id = 'submit-button'
    submitButton.textContent = 'Create';
};
*/

export { deleteAllChildren, listObject };