let tasks = [];

const form = document.querySelector('.form');
const inputTitle = form.querySelector('input[name="title"]');
const inputDescription = form.querySelector('input[name="description"]');
const tasksList = document.querySelector('.tasks__list');
const emptyText = document.querySelector('.tasks__empty');
const taskTemplate = document.getElementById('task-template');
const alert = document.querySelector('.alert');

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
    const deleteButton = el.querySelector('.button-delete');

    titleEl.textContent = task.title;
    descEl.textContent = task.description;

    deleteButton.addEventListener('click', e => {
        e.stopPropagation();
        openAlert(task.id);
    })

    const taskItem = el.querySelector('.task__content');
    const taskTools = el.querySelector('.task__tools');
    taskItem.addEventListener('click', () => toggleTaskTools(taskTools))

    return el;
}

function toggleTaskTools(taskTools) {
    taskTools.classList.toggle('hidden');
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function closeWindow(window) {
    window.classList.add('hidden');
}

function openAlert(id) {
    alert.classList.remove('hidden');

    const confirmButton = alert.querySelector('.button-confirm');
    const cancelButton = alert.querySelector('.button-cancel');

    confirmButton.onclick = () => {
        deleteTask(id);
        closeWindow(alert);
    };
    cancelButton.onclick = () => closeWindow(alert);
}

document.addEventListener('DOMContentLoaded', init);
