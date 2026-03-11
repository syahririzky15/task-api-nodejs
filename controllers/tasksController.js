const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await Task.getAllByUser(req.userId);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await Task.getById(id, req.userId);
    if (rows.length === 0) return res.status(404).json({ message: "Task tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title wajib diisi" });

    const [result] = await Task.create(title, req.userId);
    const [task] = await Task.getById(result.insertId, req.userId);
    res.status(201).json(task[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, status } = req.body;

    const [result] = await Task.update(id, title, status, req.userId);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Task tidak ditemukan" });

    const [task] = await Task.getById(id, req.userId);
    res.json(task[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await Task.delete(id, req.userId);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Task tidak ditemukan" });
    res.json({ message: "Task berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};