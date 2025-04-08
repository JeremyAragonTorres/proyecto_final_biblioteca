//se importa el router de express
import { Router } from "express";

import Libros from "../modelos/libros.js"; //se importa el modelo de libros
import Autores from "../modelos/Autores.js"; //se importa el modelo de autores


//se crea una instancia del router
const router = Router();

router.get("/", async(req, res) => {

  const libros = await Libros.find().lean(); //se obtienen todos los libros de la base de datos

  res.render("librosl", { libros : libros }); //se renderiza la vista index con los libros obtenidos de la base de datos
  
});

router.get("/librosm", (req, res) => {
  res.render("librosm");
});

router.get("/crearl", (req, res) => {
  res.render("crearl");
});


router.post("/libros/add", async (req, res) => {
  const libro = Libros(req.body);
  //se crea un nuevo libro con los datos del formulario
  const libroG = await libro.save();

  console.log(libroG); //se imprime el libro creado en la consola
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Libro Guardado</title>
      </head>
      <body>
        <script>
          alert("¡Libro guardado correctamente!");
          window.location.href = "/crearl";
        </script>
      </body>
    </html>
  `);
});

router.get("/consultarl", (req, res) => {
  res.render("consultarl");
});


router.post("/libros/buscados", async (req, res) => {
  const { ISBN } = req.body;

    const libro = await Libros.findOne({ ISBN }).lean(); // buscar solo un libro
    res.render("consultarl", { libro }); // pasar solo ese libro
});

router.get("/editarl", async (req, res) => {
  res.render("editarl");
});

router.post("/libros/editarl", async (req, res) => {
  const { ISBN } = req.body;

    const libro = await Libros.findOne({ ISBN }).lean(); // buscar solo un libro
    res.render("editarl", { libro }); // pasar solo ese libro
});

  router.get("/libros/editar/:ISBN", async (req, res) => {
  const { ISBN } = req.params;
  const libro = await Libros.findOne({ ISBN }).lean();

  if (!libro) {
    return res.send("Libro no encontrado");
  }

  res.render("editarl", { libro }); // editarl.hbs es el formulario de edición
});

router.post("/libros/editar/:ISBN", async (req, res) => {
  const { ISBN } = req.params;
  const {
    tituloLibro,
    autorLibro,
    fechaEd,
    numPag,
    CanEjemp,
    canEjempDisp,
    sinopsis,
    tipPres,
    tipoLit,
  } = req.body;

  await Libros.findOneAndUpdate(
    { ISBN },
    {
      tituloLibro,
      autorLibro,
      fechaEd,
      numPag,
      CanEjemp,
      canEjempDisp,
      sinopsis,
      tipPres,
      tipoLit
    }
  );


  // Actualiza el libro en la base de datos
 // Muestra el libro actualizado  y redirige a la página de edición 
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Libro Actualizado</title>
      </head>
      <body>
        <script>
          alert("¡Libro actualizado correctamente!");
          window.location.href = "/editarl";
        </script>
      </body>
    </html>
  `);

});

router.get("/eliminarl", (req, res) => {
  res.render("eliminarl");
});

router.post("/libros/eliminarl", async (req, res) => {
  const { ISBN } = req.body;

    const libro = await Libros.findOne({ ISBN }).lean(); // buscar solo un libro
    res.render("eliminarl", { libro }); // pasar solo ese libro
});

router.post("/libros/eliminar/:ISBN", async (req, res) => {
//se obtiene el isbn del libro a eliminar
  const { ISBN } = req.params;


    await Libros.deleteOne({ ISBN }); // elimina el libro desde el modelo
    res.send(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Libro Eliminado</title>
        </head>
        <body>
          <script>
            alert(" ¡Libro eliminado correctamente!");
            window.location.href = "/eliminarl";
          </script>
        </body>
      </html>
    `);
});

//se define la ruta para la pagina de Autores
router.get("/autorm", (req, res) => {
  res.render("autorm");
});

//se define la ruta para guardar autores
router.post("/autor/add", async (req, res) => {
  const autor = Autores(req.body);
  //se crea un nuevo libro con los datos del formulario
  const autorG = await autor.save();

  console.log(autorG); //se imprime el libro creado en la consola
  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Autor Guardado</title>
      </head>
      <body>
        <script>
          alert("¡Autor guardado correctamente!");
          window.location.href = "/creara";
        </script>
      </body>
    </html>
  `);
});

//lista todos los autores

router.get("/creara", async (req, res) => {
  const listaAutores = await Autores.find().lean(); //se obtienen todos los autores de la base de datos
  res.render("creara", { autores: listaAutores }); // aquí estás pasando 'autores' al view
});


//consultar autores
router.get("/consultara", (req, res) => {
  res.render("consultara");
});

//consultar autores por nombre
router.post("/autores/consultar", async (req, res) => {
  const { nombre } = req.body;
  const autor = await Autores.findOne({ nombre }).lean();

  // Si se encuentra el autor, lo metemos en un array
  res.render("consultara", { autores: autor ? [autor] : [] });
});


// Actualizar autores
router.get("/actualizara", async (req, res) => {
  res.render("actualizara");
});

//consultar autores por nombre
router.post("/autores/actualizar", async (req, res) => {
  const { nombre } = req.body;
  const autor = await Autores.findOne({ nombre }).lean();

  // Si se encuentra el autor, lo metemos en un array
  res.render("actualizara", { autores: autor ? [autor] : [] });
});

router.get("/autor/editar/:id", async (req, res) => {
  const { id } = req.params;
  const autor = await Autores.findById(id).lean();

  if (!autor) {
    return res.send("Autor no encontrado");
  }

  res.render("actualizara", { autores: autor });
});

router.post("/autor/editar/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, fecPub, premios, fecNac, fecFall } = req.body;

  await Autores.findByIdAndUpdate(id, {
    nombre,
    apellidos,
    fecPub,
    premios,
    fecNac,
    fecFall,
  });

  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Autor Actualizado</title>
      </head>
      <body>
        <script>
          alert("¡Autor actualizado correctamente!");
          window.location.href = "/actualizara";
        </script>
      </body>
    </html>
  `);
});

//Eliminar Autor por nombre
router.get("/eliminara", (req, res) => {
  res.render("eliminara");
});

//consultar autores por nombre para ver si existe 
router.post("/autores/eliminar", async (req, res) => {
  const { nombre } = req.body;
  const autor = await Autores.findOne({ nombre }).lean();

  // Si se encuentra el autor, lo metemos en un array
  res.render("eliminara", { autores: autor ? [autor] : [] });
});

router.post("/autor/eliminar/:id", async (req, res) => {
  const { id } = req.params;

  //se obtiene el id del autor a eliminar
    await Autores.findByIdAndDelete(id); 
    res.send(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Autor Eliminado</title>
        </head>
        <body>
          <script>
            alert(" ¡Autor eliminado correctamente!");
            window.location.href = "/eliminara";
          </script>
        </body>
      </html>
    `);

});




//se exporta el router de express
export default router;
