const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ======================
// DASHBOARD SUMMARY
// ======================
router.get("/summary", async (req, res) => {
  try {
    const [inData] = await db.query(`
      SELECT IFNULL(SUM(amount),0) AS total_in FROM stockin
    `);

    const [outData] = await db.query(`
      SELECT IFNULL(SUM(amount),0) AS total_out FROM stockout
    `);

    const [products] = await db.query(`
      SELECT COUNT(*) AS total_products FROM Product
    `);

    const profit = outData[0].total_out - inData[0].total_in;

    res.json({
      total_in: inData[0].total_in,
      total_out: outData[0].total_out,
      profit,
      total_products: products[0].total_products
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// ======================
// DAILY REPORT
// ======================
router.get("/daily", async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        DATE(created_at) AS period,
        SUM(amount) AS total
      FROM stockout
      GROUP BY DATE(created_at)
      ORDER BY period DESC
    `);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ======================
// MONTHLY REPORT
// ======================
router.get("/monthly", async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') AS period,
        SUM(amount) AS total
      FROM stockout
      GROUP BY period
      ORDER BY period DESC
    `);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// =============================
// PRODUCT STOCK IN/OUT REPORT
// =============================
router.get("/product-report", async (req, res) => {
  try {
    const sql = `
      SELECT 

        p.Product_id,
        p.name AS product_name,

        -- STOCK IN
        IFNULL(SUM(si.quantity),0) AS stockin_qty,
        IFNULL(SUM(si.amount),0) AS stockin_amount,

        -- STOCK OUT
        IFNULL(SUM(so.quantity),0) AS stockout_qty,
        IFNULL(SUM(so.amount),0) AS stockout_amount,

        -- BALANCE STOCK
        (IFNULL(SUM(si.quantity),0) - IFNULL(SUM(so.quantity),0)) AS stock_balance,

        -- PROFIT
        (IFNULL(SUM(so.amount),0) - IFNULL(SUM(si.amount),0)) AS profit

      FROM Product p

      LEFT JOIN stockin si ON p.Product_id = si.product_id
      LEFT JOIN stockout so ON p.Product_id = so.product_id

      GROUP BY p.Product_id, p.name

      ORDER BY p.name ASC
    `;

    const [data] = await db.query(sql);
    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});
// ======================
// LOW STOCK ALERTS
// ======================
router.get("/low-stock", async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        p.Product_id,
        p.name,
        (IFNULL(SUM(si.quantity),0) - IFNULL(SUM(so.quantity),0)) AS stock
      FROM Product p
      LEFT JOIN stockin si ON p.Product_id = si.product_id
      LEFT JOIN stockout so ON p.Product_id = so.product_id
      GROUP BY p.Product_id, p.name
      HAVING stock <= 5
      ORDER BY stock ASC
    `);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ======================
// FULL STOCK MOVEMENT (DEEP ANALYSIS)
// ======================
router.get("/movement", async (req, res) => {
  try {
    const [data] = await db.query(`
      SELECT 
        p.Product_id,
        p.name AS product,

        IFNULL(SUM(si.quantity),0) AS total_in,
        IFNULL(SUM(si.amount),0) AS total_in_amount,

        IFNULL(SUM(so.quantity),0) AS total_out,
        IFNULL(SUM(so.amount),0) AS total_out_amount,

        (IFNULL(SUM(si.quantity),0) - IFNULL(SUM(so.quantity),0)) AS stock_balance,

        (IFNULL(SUM(so.amount),0) - IFNULL(SUM(si.amount),0)) AS profit

      FROM Product p
      LEFT JOIN stockin si ON p.Product_id = si.product_id
      LEFT JOIN stockout so ON p.Product_id = so.product_id
      GROUP BY p.Product_id, p.name
      ORDER BY p.name ASC
    `);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;