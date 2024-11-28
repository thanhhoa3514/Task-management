const taskRoutes = require("./task.route");
const userRoutes = require("./user.route");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", taskRoutes);
  app.use(version + "/users", userRoutes);
};
