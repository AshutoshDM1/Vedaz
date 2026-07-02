import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS and parsing of JSON request bodies
app.use(cors());
app.use(express.json());

// Register API routes
app.use('/api/v1', router);

// Root API health and welcome route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Morax High-Performance Backend API!',
    timestamp: new Date().toISOString(),
    status: 'healthy',
  });
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
