import server from '../server.js'; // import your full Express app

// Vercel serverless handler
export default function handler(req, res) {
  server(req, res);
}