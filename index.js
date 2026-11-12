import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import eventos from '/routers/eventos.js';
import recintos from '/routers/resintos.js';

mongoose.connect(process.env.MONGODB_URI);

let app = express();

app.use(express.json());
app.use('/eventos', eventos);
app.use('/recintos', recintos);

app.listen(process.env.PORT || 3000);