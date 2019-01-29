const ToDoContainer = document.createElement("template");
ToDoContainer.innerHTML = `
    <style>@import "assets/index.css"</style>

    <div id="todo-container">
        <div class="todo-add-item">
            <div class="item-box">
                <div class="item-checkbox">

                    <label class="container">
                        <input id="select-all" type="checkbox">
                        <span class="checkmark"></span>
                    </label>

                    <input id="new-task-input" type="text" placeholder="Add new task here"/>

                </div>
            </div>
        </div>

        <div id="todo-items">
            
        </div>
    </div>
`

class ToDoList extends HTMLElement {
    constructor() {
        super();

        this.data = null
        
        this.attachShadow({mode: "open"})

        this.render()
    }

    render() {
        this.shadowRoot.appendChild(
            ToDoContainer.content.cloneNode(true)
        )
    }

    connectedCallback() {
        this.data = JSON.parse(this.getAttribute("data"))

        this.readData()

        // set core functions
        const input = this.shadowRoot.querySelector("#new-task-input")
        input.onblur = this.addTask.bind(this)

        const selectAll = this.shadowRoot.querySelector("#select-all")
        selectAll.onclick = this.selectAll.bind(this, selectAll)
    }

    readData() {
        const listRoot = this.shadowRoot.querySelector("#todo-items")

        // reset existing list state
        listRoot.innerHTML = ""

        this.data.forEach((e, k) => {
            const toDoItem = document.createElement("div")

            toDoItem.setAttribute("class", "todo-item-box")

            toDoItem.innerHTML = `
                <div class="item-box">
                    <div class="item-checkbox">

                        <label class="container">
                            <input class="input-checkbox" type="checkbox" ${e.checked ? "checked='true'" : ''}>
                            <span class="checkmark"></span>
                        </label>

                        <div class="todo-item-label"><div>${e.title}</div></div>

                    </div>
                </div>
            `

            listRoot.appendChild(toDoItem)
        })
    }

    addTask(e) {
        if (e.target.value.length > 0) {
            this.data = [
                ...this.data,
                {title: e.target.value, checked: false}
            ]
    
            this.readData()
        }
    }

    selectAll(...rest) {
        const el = this.shadowRoot.querySelector("#select-all")

        const value = el.checked || false

        let nodes = this.shadowRoot.querySelectorAll(".input-checkbox")
        nodes = Array.from(nodes)

        nodes.map((e, k) => {
            e.checked = value
        })
    }
}

window.customElements.define("todo-list", ToDoList)