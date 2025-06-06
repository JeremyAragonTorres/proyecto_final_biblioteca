import { connect } from "mongoose";
import { MONGODB_URI } from "./config.js"; 

(async () => {
  try {
    const db = await connect(MONGODB_URI);
    console.log("DB connected", db.connection.name);
  } catch (error) {
    console.log(error);
  }
})();
