    import express from "express";
    import indexRutas from "./rutas/indexr.js"; //se importa el router de express
    import { engine }from "express-handlebars"; //se importa el motor de plantillas handlebars
    import path from "path"; //se importa el modulo path de nodejs
    import morgan from "morgan"; //se importa el modulo morgan para ver las peticiones http en la consola

    const app = express();

    const hbsHelpers = {
        formatearFecha: (fecha) => {
          const date = new Date(fecha);
          return date.toISOString().split("T")[0]; // Devuelve 'yyyy-mm-dd'
        },

        formatearInputDate: (fecha) => {
          if (!fecha) return "";
          const d = new Date(fecha);
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, "0");
          const day = String(d.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`; // para input type="date"
        },

        ifEqual: function (a, b, options) {
          return a === b ? options.fn(this) : options.inverse(this);
        }
      };

      

    app.set("views",  path.join(__dirname , 'vistas')); //se establece la carpeta de vistas


    app.engine(".hbs", engine({
            layoutsDir: path.join(app.get("views"), "layouts"),
            partialsDir: path.join(app.get("views"), "navegacion"),
            defaultLayout: "main",
            extname: ".hbs",
            helpers: hbsHelpers     
        })
    );



    app.set('view engine', '.hbs'); //se establece el motor de plantillas handlebars

    app.use(morgan("dev")); //se usa el modulo morgan para ver las peticiones http en la consola
    app.use(express.urlencoded({extended: false})); //se usa el modulo express para parsear los datos del formulario

    app.use(indexRutas)//se usa el router de express

    export default app; //se exporta el app de express
