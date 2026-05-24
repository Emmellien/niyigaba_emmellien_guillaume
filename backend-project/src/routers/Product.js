const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const [data] = await db.query("SELECT * FROM Product ORDER BY Product_id DESC");
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD PRODUCT
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO Product(name) VALUES (?)",
      [name]
    );

    res.status(201).json({
      Product_id: result.insertId,
      name
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const [data] = await db.query(
      "SELECT * FROM Product WHERE Product_id = ?",
      [req.params.id]
    );

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const { name } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE Product SET name = ? WHERE Product_id = ?",
      [name, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM Product WHERE Product_id = ?", [
      req.params.id,
    ]);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;