import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', platform: 'StartupSetu GovTech', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', apiRoutes);

// Serve static frontend assets in production build if present
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('StartupSetu Backend Server active on port 5000. Launch Vite dev server for frontend.');
    }
  });
});

const HOST = process.env.HOST || '0.0.0.0';
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, HOST, () => {
    console.log(`=======================================================`);
    console.log(`🚀 StartupSetu GovTech Server running on ${HOST}:${PORT}`);
    console.log(`👉 REST API Base: http://localhost:${PORT}/api`);
    console.log(`=======================================================`);
  });
}

export default app;

