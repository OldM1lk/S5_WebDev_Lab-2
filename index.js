let tasks = [];

const form = document.querySelector('.form');
const inputTitle = form.querySelector('input[name="title"]');
const inputDescription = form.querySelector('input[name="description"]');
const tasksList = document.querySelector('.tasks__list');
const emptyText = document.querySelector('.tasks__empty');
const taskTemplate = document.getElementById('task-template');

const alert = document.querySelector('.alert');
const editWindow = document.querySelector('.edit-window');
const shareBox = document.querySelector('.share-box');

document.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
    renderTasks();
}

function setupEventListeners() {
    form.addEventListener('submit', handleAddTask)
}

function handleAddTask(e) {
    e.preventDefault();

    const title = inputTitle.value.trim();
    const description = inputDescription.value.trim();

    if (!title) return;

    addTask(title, description);
    form.reset();
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

function editTask(id, newTitle, newDescription) {
    const task = tasks.find(t => t.id === id);

    if (!task) return

    task.title = newTitle;
    task.description = newDescription;
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

function renderTasks() {
    tasksList.innerHTML = '';

    if (!tasks.length) {
        emptyText.style.display = 'block';
        return;
    }

    emptyText.style.display = 'none';
    tasks.forEach(task => tasksList.append(createTaskElement(task)));
}

function createTaskElement(task) {
    const fragment = taskTemplate.content.cloneNode(true);
    const titleEl = fragment.querySelector('.text__title');
    const descEl = fragment.querySelector('.text__description');
    const deleteBtn = fragment.querySelector('.button-delete');
    const editBtn = fragment.querySelector('.button-edit');
    const shareBtn = fragment.querySelector('.button-share');
    const tools = fragment.querySelector('.task__tools');
    const content = fragment.querySelector('.task__content');

    titleEl.textContent = task.title;
    descEl.textContent = task.description;

    deleteBtn.addEventListener('click', e => {
        e.stopPropagation();
        openDeleteConfirm(task.id);
    });

    editBtn.addEventListener('click', e => {
        e.stopPropagation();
        openEditModal(task);
    });

    shareBtn.addEventListener('click', e => {
        e.stopPropagation();
        openShareModal();
    });

    content.addEventListener('click', () => tools.classList.toggle('hidden'));

    return fragment;
}

function openModal(modal) {
    modal.classList.remove('hidden');
    modal.addEventListener('click', e => {
        if (e.target === modal) closeModal(modal);
    });
}

function closeModal(modal) {
    modal.classList.add('hidden');
}

function openDeleteConfirm(id) {
    openModal(alert);

    const confirm = alert.querySelector('.button-confirm');
    const cancel = alert.querySelector('.button-cancel');

    confirm.replaceWith(confirm.cloneNode(true));
    cancel.replaceWith(cancel.cloneNode(true));

    const newConfirm = alert.querySelector('.button-confirm');
    const newCancel = alert.querySelector('.button-cancel');

    newConfirm.addEventListener('click', () => {
        deleteTask(id);
        closeModal(alert);
    });
    newCancel.addEventListener('click', () => closeModal(alert));
}

function openEditModal(task) {
    openModal(editWindow);

    const titleInput = editWindow.querySelector('input[name="new-title"]');
    const descriptionInput = editWindow.querySelector('textarea[name="new-description"]');
    const saveBtn = editWindow.querySelector('.button-confirm');
    const cancelBtn = editWindow.querySelector('.button-cancel');

    titleInput.value = task.title;
    descriptionInput.value = task.description;

    saveBtn.replaceWith(saveBtn.cloneNode(true));
    cancelBtn.replaceWith(cancelBtn.cloneNode(true));

    const newSave = editWindow.querySelector('.button-confirm');
    const newCancel = editWindow.querySelector('.button-cancel');

    newSave.addEventListener('click', () => {
        editTask(task.id, titleInput.value.trim(), descriptionInput.value.trim());
        closeModal(editWindow);
    });

    newCancel.addEventListener('click', () => closeModal(editWindow));
}

function openShareModal() {
    openModal(shareBox);
}
