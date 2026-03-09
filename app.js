const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

// GET /tasks
app.get("/tasks", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const [result] = await db.query("INSERT INTO tasks (title) VALUES (?)", [title]);
    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    res.json(task[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, status } = req.body;
    const [result] = await db.query("UPDATE tasks SET title = ?, status = ? WHERE id = ?", [title, status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json(task[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json({ message: "Task berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));