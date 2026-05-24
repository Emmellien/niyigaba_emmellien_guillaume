// routers/stockout.js

const express = require("express");
const router = express.Router();

const db = require("../config/db");

//
// GET ALL STOCK OUT
//
router.get("/", async (req, res) => {

  try {

    const sql = `
      SELECT
        so.stockout_id,

        p.Product_id,
        p.name,

        so.quantity,
        so.selling_price,
        so.amount,

        so.receiver_name,
        so.department,

        so.created_at

      FROM stockout so

      JOIN Product p
      ON so.product_id = p.Product_id

      ORDER BY so.stockout_id DESC
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
// GET AVAILABLE STOCK
//
router.get("/available/:id", async (req, res) => {

  const { id } = req.params;

  try {

    // STOCK IN
    const [stockIn] = await db.query(
      `
      SELECT
      IFNULL(SUM(quantity),0)
      AS total_in

      FROM stockin

      WHERE product_id = ?
      `,
      [id]
    );

    // STOCK OUT
    const [stockOut] = await db.query(
      `
      SELECT
      IFNULL(SUM(quantity),0)
      AS total_out

      FROM stockout

      WHERE product_id = ?
      `,
      [id]
    );

    const available =
      stockIn[0].total_in -
      stockOut[0].total_out;

    res.json({
      available
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

//
// SEARCH STOCK OUT
//
router.get("/search/:keyword", async (req, res) => {

  const { keyword } = req.params;

  try {

    const search = `%${keyword}%`;

    const sql = `
      SELECT
        so.stockout_id,

        p.Product_id,
        p.name,

        so.quantity,
        so.selling_price,
        so.amount,

        so.receiver_name,
        so.department,

        so.created_at

      FROM stockout so

      JOIN Product p
      ON so.product_id = p.Product_id

      WHERE
        p.name LIKE ?
        OR so.receiver_name LIKE ?
        OR so.department LIKE ?

      ORDER BY so.stockout_id DESC
    `;

    const [data] = await db.query(sql, [
      search,
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
// ADD STOCK OUT
//
router.post("/", async (req, res) => {

  const {
    product_id,
    quantity,
    selling_price,
    receiver_name,
    department
  } = req.body;

  try {

    //
    // CHECK AVAILABLE STOCK
    //
    const [stockIn] = await db.query(
      `
      SELECT
      IFNULL(SUM(quantity),0)
      AS total_in

      FROM stockin

      WHERE product_id = ?
      `,
      [product_id]
    );

    const [stockOut] = await db.query(
      `
      SELECT
      IFNULL(SUM(quantity),0)
      AS total_out

      FROM stockout

      WHERE product_id = ?
      `,
      [product_id]
    );

    const available =
      stockIn[0].total_in -
      stockOut[0].total_out;

    //
    // VALIDATE STOCK
    //
    if (Number(quantity) > available) {

      return res.status(400).json({
        message:
          `Only ${available} items available`
      });
    }

    //
    // CALCULATE AMOUNT
    //
    const amount =
      Number(quantity) *
      Number(selling_price);

    //
    // INSERT
    //
    const sql = `
      INSERT INTO stockout
      (
        product_id,
        quantity,
        selling_price,
        amount,
        receiver_name,
        department
      )
      VALUES (?,?,?,?,?,?)
    `;

    await db.query(sql, [
      product_id,
      quantity,
      selling_price,
      amount,
      receiver_name,
      department
    ]);

    res.json({
      message:
        "Stock removed successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

//
// DELETE STOCK OUT
//
router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const sql =
      "DELETE FROM stockout WHERE stockout_id=?";

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