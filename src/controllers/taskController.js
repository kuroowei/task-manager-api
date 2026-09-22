const {
  getAllTasks: getAll,
  getTaskById: getById,
  createTask: create,
  updateTask: update,
  deleteTask: remove,
} = require("../data/tasks");

const ALLOWED_STATUSES = ["pending", "completed"];

// --- Validation helper -----------------------------------------------
// Returns null if the body is valid, or a string error message if not.
function validateTaskBody(body) {
  const { title, description, status } = body;

  if (title === undefined || title === null) return "Title is required";
  if (typeof title !== "string") return "Title must be a string";
  if (title.trim().length === 0) return "Title cannot be empty";

  if (description === undefined || description === null)
    return "Description is required";
  if (typeof description !== "string") return "Description must be a string";
  if (description.trim().length === 0) return "Description cannot be empty";

  if (status === undefined || status === null) return "Status is required";
  if (!ALLOWED_STATUSES.includes(status))
    return "Status must be either pending or completed";

  return null;
}

// Parses :id and returns a number, or null if it isn't a valid positive integer.
function parseId(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

// --- Controllers -------------------------------------------------------

function getAllTasks(req, res) {
  const tasks = getAll();
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
}

function getTaskById(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid task ID" });
  }

  const task = getById(id);
  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.status(200).json({ success: true, data: task });
}

function createTask(req, res) {
  const error = validateTaskBody(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const newTask = create({
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    status: req.body.status,
  });

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
}

function updateTask(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid task ID" });
  }

  const existing = getById(id);
  if (!existing) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  const error = validateTaskBody(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  const updated = update(id, {
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    status: req.body.status,
  });

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: updated,
  });
}

function deleteTask(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    return res.status(400).json({ success: false, message: "Invalid task ID" });
  }

  const deleted = remove(id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.status(200).json({ success: true, message: "Task deleted successfully" });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};