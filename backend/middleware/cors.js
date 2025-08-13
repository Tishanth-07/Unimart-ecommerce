// unimart-ecommerce/backend/middleware/cors.js
import cors from "cors";

const corsMiddleware = cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

export default corsMiddleware;
