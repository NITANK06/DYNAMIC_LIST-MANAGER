class ListManager {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("items")) || [];
        this.listElement = document.getElementById("itemList");
        this.inputElement = document.getElementById("itemInput");
        this.addButton = document.getElementById("addBtn");

        this.addButton.addEventListener("click", () => this.addItem());
        this.render();
    }

    validateInput(value) {
        if (!value.trim()) {
            alert("Item cannot be empty!");
            return false;
        }
        return true;
    }

    saveToStorage() {
        localStorage.setItem("items", JSON.stringify(this.items));
    }

    addItem() {
        const value = this.inputElement.value;

        if (!this.validateInput(value)) return;

        this.items.push({ text: value, completed: false });
        this.inputElement.value = "";
        this.saveToStorage();
        this.render();
    }

    deleteItem(index) {
        this.items.splice(index, 1);
        this.saveToStorage();
        this.render();
    }

    toggleComplete(index) {
        this.items[index].completed = !this.items[index].completed;
        this.saveToStorage();
        this.render();
    }

    editItem(index) {
        const newValue = prompt("Edit item:", this.items[index].text);
        if (this.validateInput(newValue)) {
            this.items[index].text = newValue;
            this.saveToStorage();
            this.render();
        }
    }

    render() {
        this.listElement.innerHTML = "";

        this.items.forEach((item, index) => {
            const li = document.createElement("li");

            const span = document.createElement("span");
            span.textContent = item.text;
            if (item.completed) {
                span.classList.add("completed");
            }
            span.addEventListener("click", () => this.toggleComplete(index));

            const actions = document.createElement("div");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => this.editItem(index);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => this.deleteItem(index);

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            li.appendChild(span);
            li.appendChild(actions);

            this.listElement.appendChild(li);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ListManager();
});
