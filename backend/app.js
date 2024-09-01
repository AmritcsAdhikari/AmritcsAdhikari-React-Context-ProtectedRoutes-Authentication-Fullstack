import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './router/userRouter.js';

const app = express();
dotenv.config();

app.use(cors());

app.use(express.json());

const PORT = process.env.SERVER_PORT || 8080;

const mongoURI = process.env.MONGO_URL;

try {
  mongoose.connect(mongoURI);
  console.log('Database connected!');
} catch (error) {
  console.log('Error connecting to Database!');
}

// app.use('/', (req, res) => {
//   res.send('hey world!');
// });

app.use('/users/', userRouter);

app.listen(PORT, (req, res) => {
  console.log(`Server started on port ${PORT}`);
});
