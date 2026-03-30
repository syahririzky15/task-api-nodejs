const Task = require("../models/taskModel");

/*
GET ALL TASKS
GET /tasks?page=1&limit=10
GET /tasks?status=pending
GET /tasks?search=node
GET /tasks?sort=title&order=desc
*/
exports.getAllTasks = async (req, res) => {

  try {

    const userId = req.userId;


    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if (limit > 50) limit = 50; // protect API

    const status = req.query.status || null;
    const search = req.query.search || null;

    const sort = req.query.sort || "id";
    const order = req.query.order || "asc";

    const offset = (page - 1) * limit;

    const [tasks] = await Task.getAllByUser(
      userId,
      status,
      search,
      sort,
      order,
      limit,
      offset
    );

    res.json({
      page,
      limit,
      total: tasks.length,
      data: tasks
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



/*
GET TASK BY ID
GET /tasks/:id
*/
exports.getTaskById = async (req, res) => {

  try {

    const id = req.params.id;
    const userId = req.userId;

    const [tasks] = await Task.getById(id, userId);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json(tasks[0]);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



/*
CREATE TASK
POST /tasks
*/
exports.createTask = async (req, res) => {

  try {

    const { title } = req.body;
    const userId = req.userId;

    if (!title) {
      return res.status(400).json({ message: "Title wajib diisi" });
    }

    const [result] = await Task.create(title, userId);

    const [task] = await Task.getById(result.insertId, userId);

    res.status(201).json(task[0]);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



/*
UPDATE TASK
PUT /tasks/:id
*/
exports.updateTask = async (req, res) => {

  try {

    const id = req.params.id;
    const userId = req.userId;

    const { title, status } = req.body;

    if (!title || !status) {
      return res.status(400).json({ message: "Title dan status wajib diisi" });
    }

    if (!["pending", "completed"].includes(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    const [result] = await Task.update(id, title, status, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    const [task] = await Task.getById(id, userId);

    res.json(task[0]);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};



/*
DELETE TASK
DELETE /tasks/:id
*/
exports.deleteTask = async (req, res) => {

  try {

    const id = req.params.id;
    const userId = req.userId;

    const [result] = await Task.delete(id, userId);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task tidak ditemukan" });
    }

    res.json({ message: "Task berhasil dihapus" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};