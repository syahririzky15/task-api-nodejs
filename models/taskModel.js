const db = require("../db");

const Task = {

  getAllByUser: (userId, status, search, sort, order, limit, offset) => {
    
    let query = "SELECT * FROM tasks WHERE user_id=?";
    let params = [userId];

    if (status) {
      query += " AND status=?";
      params.push(status);
    }

    if (search) {
      query += " AND title LIKE ?";
      params.push(`%${search}%`);
    }

    // sorting default
    const allowedSort = ["title", "status", "created_at", "id"];
    if (!allowedSort.includes(sort)) {
      sort = "id";
    }

    order = order === "desc" ? "DESC" : "ASC";

    query += ` ORDER BY ${sort} ${order}`;

    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    return db.execute(query, params);
  },
  
  getById: (id, userId) =>
    db.execute(
      "SELECT * FROM tasks WHERE id=? AND user_id=?",
      [id, userId]
    ),

  create: (title, userId) =>
    db.execute(
      "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
      [title, userId]
    ),

  update: (id, title, status, userId) =>
    db.execute(
      "UPDATE tasks SET title=?, status=? WHERE id=? AND user_id=?",
      [title, status, id, userId]
    ),

  delete: (id, userId) =>
    db.execute(
      "DELETE FROM tasks WHERE id=? AND user_id=?",
      [id, userId]
    )

};

module.exports = Task;