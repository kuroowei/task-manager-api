// Centralized error handler — catches anything passed to next(err)
// or thrown inside an async route, and always replies with JSON.
function errorHandler(err, req, res, next) {
  console.error(err.stack); // full detail stays in the server log only

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

// 404 handler for routes that don't match anything above it
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
}

module.exports = { errorHandler, notFoundHandler };