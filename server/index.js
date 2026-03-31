const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();
app.use(express.json());


// ****************

const userRoutes = require('./users/userRoutes');
userRoutes.setPool(database.pool);
app.use('/users', userRoutes);

// ****************

const equipmentRoutes = require('./equipment/equipmentRoutes');
equipmentRoutes.setPool(database.pool);
app.use('/equipment', equipmentRoutes);

// ****************

const rentalRoutes = require('./rentals/rentalRoutes');
rentalRoutes.setPool(database.pool);
app.use('/rentals', rentalRoutes);

// ********************************************************

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
}));



const PORT = 1337;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});