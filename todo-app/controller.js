export class Controller {

    constructor() {
        this.todoItems = ['bla','blup'];
        this.insertButton = document.querySelector('header button');
        this.insertText = document.querySelector('header input');
        this.todoList = document.querySelector('section');

        this.insertButton.addEventListener('click', () => this.addTodo());
        this.todoList.addEventListener('click', (e) => this.handleTodoAction(e));
        this.render();
    }

    handleTodoAction(e) {
        console.log(e);
        let target = e.target;

        if (target.dataset.index >= 0 && target.dataset.action == 'remove') {
            this.todoItems.splice(target.dataset.index, 1);
            this.render();
        }

        if(target.dataset.index >= 0 && target.dataset.action == 'edit'){
            let currentTd = document.getElementById("td"+target.dataset.index);
            currentTd.setAttribute("contenteditable", true);
            let currentSave = document.getElementById("savebutton"+target.dataset.index);
            currentSave.style.display = '';
            let currentEdit = document.getElementById("editbutton"+target.dataset.index);
            currentEdit.style.display = 'none';
        }

        if(target.dataset.index >=0 && target.dataset.action == 'save'){
            let currTd = document.getElementById("td"+target.dataset.index);
            this.todoItems[target.dataset.index] = currTd.textContent;
            currTd.setAttribute("contenteditable", false);
            let currSave = document.getElementById("savebutton"+target.dataset.index);
            currSave.style.display = 'none';
            let currEdit = document.getElementById("editbutton"+target.dataset.index);
            currEdit.style.display = '';
            this.render();
        }
    }

    addTodo() {
        this.todoItems.push(this.insertText.value);
        this.insertText.value = '';

        this.render();
    }

    render() {
        this.todoList.innerHTML = '';

        for (let i = 0; i < this.todoItems.length; i++) {
            let todoItem = document.createElement('div');
            let text = document.createTextNode(this.todoItems[i]);
            let para = document.createElement('td');
            para.appendChild(text);
            para.id = "td" + i;
            let saveButton = document.createElement('button');
            saveButton.dataset.index = i;
            saveButton.dataset.action = 'save';
            saveButton.textContent = 'Speichern';
            saveButton.style.display = 'none';
            saveButton.id = 'savebutton' + i;
            let editButton = document.createElement('button');
            editButton.dataset.index = i;
            editButton.dataset.action = 'edit';
            editButton.textContent = 'Editieren';
            editButton.id = 'editbutton' + i;
            let removeButton = document.createElement('button');
            removeButton.dataset.index = i;
            removeButton.dataset.action = 'remove';
            removeButton.textContent = 'Löschen';
            

            todoItem.appendChild(para);
            todoItem.appendChild(saveButton);
            todoItem.appendChild(editButton);
            todoItem.appendChild(removeButton);
            this.todoList.appendChild(todoItem);
        }        
    }

}