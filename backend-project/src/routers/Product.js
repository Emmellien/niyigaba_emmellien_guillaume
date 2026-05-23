const express=require('express');
const db = require('../config/db.js');
const router= express.Router();

// Get all products
router.get('/', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM Product');
        res.json(products);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        
    }
});

router.post('/', async (req, res) => {
    const { name, price } = req.body;
    try {
        const insertsql = `INSERT INTO Product(name,price) values(?,?) `;
        const [result] = await db.query(insertsql, [name, price]);
        res.status(201).json({ id: result.insertId, name, price }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

//get id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [products] = await db.query('SELECT * FROM product WHERE Product_id = ?', [id]);
        res.json(products);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
        
    }
});

//delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM Product WHERE Product_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    try {
        const [result] = await db.query('UPDATE Product SET name = ?, price = ? WHERE Product_id = ?', [name, price, id]);
       if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports= router