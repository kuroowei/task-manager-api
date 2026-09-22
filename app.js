const express = require("express");
const taskRoutes = require("./src/routes/taskRoutes");
const { errorHandler, notFoundHandler } = require("./src/middleware/errorHandler");

const app = express();

app.use(express.json()); // parse JSON request bodies

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Task Manager API",
    version: "1.0.0",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API is running",
  });
});

// Task routes
app.use("/api/tasks", taskRoutes);

// 404 for anything unmatched
app.use(notFoundHandler);

// Centralized error handler — must be registered last
app.use(errorHandler);

module.exports = app;