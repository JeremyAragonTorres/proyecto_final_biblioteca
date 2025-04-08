import app from "./app.js"; //se importa el app de express
import "./database.js"; //se importa la base de datos
import {PORT} from "./config.js";


// iniciamos el servidor en el puerto 3000
app.listen(PORT);
console.log("server on port", PORT);
