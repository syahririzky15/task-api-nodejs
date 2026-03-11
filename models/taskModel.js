const db = require("../db");

const Task = {
  getAllByUser: (userId) => db.execute("SELECT * FROM tasks WHERE user_id=?", [userId]),
  getById: (id, userId) => db.execute("SELECT * FROM tasks WHERE id=? AND user_id=?", [id, userId]),
  create: (title, userId) => db.execute("INSERT INTO tasks (title,user_id) VALUES (?,?)", [title, userId]),
  update: (id, title, status, userId) => db.execute(
    "UPDATE tasks SET title=?, status=? WHERE id=? AND user_id=?",
    [title, status, id, userId]
  ),
  delete: (id, userId) => db.execute("DELETE FROM tasks WHERE id=? AND user_id=?", [id, userId])
};

module.exports = Task;