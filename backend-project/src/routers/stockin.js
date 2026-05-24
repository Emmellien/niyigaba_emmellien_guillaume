// routers/stockin.js

const express = require("express");
const router = express.Router();

const db = require("../config/db");

//
// GET ALL STOCK IN
//
router.get("/", async (req, res) => {

  try {

    const sql = `
      SELECT
        si.stockin_id,

        p.Product_id,
        p.name,

        si.quantity,
        si.cost_price,
        si.amount,

        si.supplier_name,

        si.created_at

      FROM stockin si

      JOIN Product p
      ON si.product_id = p.Product_id

      ORDER BY si.stockin_id DESC
    `;

    const [data] = await db.query(sql);

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

//
// SEARCH STOCK IN
//
router.get("/search/:keyword", async (req, res) => {

  const { keyword } = req.params;

  try {

    const search = `%${keyword}%`;

    const sql = `
      SELECT
        si.stockin_id,

        p.Product_id,
        p.name,

        si.quantity,
        si.cost_price,
        si.amount,

        si.supplier_name,

        si.created_at

      FROM stockin si

      JOIN Product p
      ON si.product_id = p.Product_id

      WHERE
        p.name LIKE ?
        OR si.supplier_name LIKE ?

      ORDER BY si.stockin_id DESC
    `;

    const [data] = await db.query(sql, [
      search,
      search
    ]);

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

//
// ADD STOCK IN
//
router.post("/", async (req, res) => {

  const {
    product_id,
    quantity,
    cost_price,
    supplier_name
  } = req.body;

  try {

    // CALCULATE AMOUNT
    const amount =
      Number(quantity) *
      Number(cost_price);

    const sql = `
      INSERT INTO stockin
      (
        product_id,
        quantity,
        cost_price,
        amount,
        supplier_name
      )
      VALUES (?,?,?,?,?)
    `;

    await db.query(sql, [
      product_id,
      quantity,
      cost_price,
      amount,
      supplier_name
    ]);

    res.json({
      message: "Stock added successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

//
// DELETE STOCK IN
//
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const sql =
      "DELETE FROM stockin WHERE stockin_id=?";

    const [result] =
      await db.query(sql, [id]);

    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Record not found"
      });
    }

    res.json({
      message: "Deleted successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});



module.exports = router;