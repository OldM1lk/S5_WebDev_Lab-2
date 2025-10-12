let tasks = [];

const form = document.querySelector('.form');
const inputTitle = form.querySelector('input[name="title"]');
const inputDescription = form.querySelector('input[name="description"]');
const tasksList = document.querySelector('.tasks__list');
const emptyText = document.querySelector('.tasks__empty');
const taskTemplate = document.getElementById('task-template');

function init() {
    renderTasks();
    setupEventListeners();
}

function setupEventListeners() {
    form.addEventListener('submit', e => {
        e.preventDefault();

        const title = inputTitle.value.trim();
        const description = inputDescription.value.trim();

        if (!title) return;

        addTask(title, description);
        form.reset();
    });
}

function addTask(title, description) {
    const task = {
        id: Date.now().toString(),
        title,
        description,
    };

    tasks.push(task);
    renderTasks();
}

function renderTasks() {
    tasksList.innerHTML = '';

    if (tasks.length === 0) {
        emptyText.style.display = 'block';
        return;
    }
    emptyText.style.display = 'none';

    tasks.forEach(task => {
        const taskEl = createTaskElement(task);
        tasksList.appendChild(taskEl);
    });
}

function createTaskElement(task) {
    const el = taskTemplate.content.cloneNode(true);

    const titleEl = el.querySelector('.text__title');
    const descEl = el.querySelector('.text__description');

    titleEl.textContent = task.title;
    descEl.textContent = task.description;

    return el;
}

document.addEventListener('DOMContentLoaded', init);
