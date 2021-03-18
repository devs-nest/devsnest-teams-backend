import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//Route Imports
import softskill from './route/softskill.js';
import admin from './route/admin.js';

// Configuration
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Routes
const apiVersion = "/api/v1";
app.use(`${apiVersion}/softskill`, softskill);
app.use(`${apiVersion}/admin`, admin);

// URL Not Found
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}.`);
});

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log("MongoDB Connected."))
.catch(() => console.log("Error in connecting MongoDB!"));