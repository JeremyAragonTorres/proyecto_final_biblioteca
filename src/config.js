// config.js
import { config } from "dotenv";
config({ path: "./src/.env" }); 

config();

export const MONGODB_URI=process.env.MONGODB_URI || "mongodb://localhost:27017/biblioteca";
export const PORT=process.env.PORT || 3000; // puerto por defecto 3000