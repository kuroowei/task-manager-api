// In-memory "database" — a plain array that lives only while the server runs.

let tasks = [];
let nextId = 1; // incrementing counter so deleted IDs are never reused

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask({ title, description, status }) {
  const now = new Date().toISOString();
  const newTask = {
    id: nextId++,
    title,
    description,
    status,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(newTask);
  return newTask;
}

function updateTask(id, { title, description, status }) {
  const task = getTaskById(id);
  if (!task) return null;

  task.title = title;
  task.description = description;
  task.status = status;
  task.updatedAt = new Date().toISOString();

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};