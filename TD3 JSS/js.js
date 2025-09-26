
// Custom element with Shadow DOM
class MyCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
                    <style>
                        .card {
                            border: 1px solid #ccc;
                            border-radius: 8px;
                            padding: 10px;
                            margin: 10px 0;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            background-color: #f9f9f9;
                        }
                        .task-text {
                            flex-grow: 1;
                        }
                        .remove-btn {
                            background-color: #776c6cff;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            padding: 5px 10px;
                            cursor: pointer;
                        }
                        .remove-btn:hover {
                            background-color: #000000ff;
                        }
                    </style>
                    <div class="card">
                        <span class="task-text"><slot></slot></span>
                        <button class="remove-btn">🗑️Delete</button>
                    </div>
                `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.remove-btn').addEventListener('click', () => {
            this.remove();
            saveTasks();
        });
    }
}

customElements.define('my-card', MyCard);


document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const todoList = document.getElementById('todoList');

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = Array.from(todoList.children).map(card => card.textContent.trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Render tasks using template literals
    function renderTasks(tasks) {
        const tasksHtml = tasks.map(task => `<my-card>${task}</my-card>`).join('');
        todoList.innerHTML = tasksHtml;
    }

    // Add task
    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            const newCard = document.createElement('my-card');
            newCard.textContent = task;
            todoList.appendChild(newCard);
            taskInput.value = '';
            saveTasks();
        }
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });


});