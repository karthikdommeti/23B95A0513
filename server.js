import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import urlRoutes from './routes/urlRoutes.js';
import logger from './middleware/logger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(morgan('dev'));

// Routes
app.use('/shorturls', urlRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
