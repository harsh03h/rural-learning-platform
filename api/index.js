// Vercel serverless entry point. The Express app is exported as the default
// Node.js request handler, so all /api/* routes work without app.listen().
import app from '../server/server.js';

export default app;
