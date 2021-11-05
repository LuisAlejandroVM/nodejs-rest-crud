const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/', async (req, res) => {
    const listProducts = await pool.query('SELECT * FROM products');
    res.json({ status: 200, message: 'Se han encontrado los registros correctamente.', listProducts });
});

router.post('/add', async (req, res) => {
    const { name, price } = req.body;

    const product = {
        name, price, status: 1
    };

    await pool.query('INSERT INTO products set ?', [product]);

    res.json({ status: 200, message: 'Se ha registrado correctamente.', product });
    //res.send('received');
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const product = {
        name, price
    };

    await pool.query('UPDATE products set ? WHERE idProduct = ?', [product, id]);

    res.json({ status: 200, message: 'Se ha actualizado correctamente.', product });
    //res.send('received');
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('UPDATE products set status = ? WHERE idProduct = ?', [0, id]);
    res.json({ status: 200, message: 'Se ha eliminado correctamente.' });
});

module.exports = router;