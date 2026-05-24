const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routers/auth.js');
const productRoutes = require('./routers/product.js');
const stockinRoutes = require('./routers/stockin.js');
const stockoutRoutes = require('./routers/stockout.js');
const reportRoutes = require('./routers/report.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/stockin', stockinRoutes);
app.use('/api/stockout', stockoutRoutes);
app.use('/api/report', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));