// Schema son los campos que se va a guardar
// Model es  como el nombre de la tabla
import { Schema, model } from "mongoose";
import { format } from "morgan";



const libros = new Schema(
  {
    ISBN: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "El ISBN es obligatorio."]
    },
    tituloLibro: {
      type: String,
      trim: true,
      required: [true, "El título es obligatorio."]
    },
    autorLibro: {
      type: String,
      trim: true,
      required: [true, "El autor es obligatorio."]
    },
    fechaEd: {
      type: Date,
      required: [true, "La fecha de edición es obligatoria."],
    },
    numPag: {
      type: Number,
      required: [true, "El número de páginas es obligatorio."]
    },
    CanEjemp: {
      type: Number,
      required: [true, "La cantidad de ejemplares es obligatoria."]
    },
    canEjempDisp: {
      type: Number,
      required: [true, "La cantidad de ejemplares disponibles es obligatoria."]
    },
    sinopsis: {
      type: String,
      required: [true, "La sinopsis es obligatoria."]
    },
    tipPres: {
      type: String,
      trim: true,
      required: [true, "El tipo de presentación es obligatorio."]
    },
    tipoLit: {
      type: String,
      trim: true,
      required: [true, "El tipo de literatura es obligatorio."]
    }
  },
  {
    timestamps: true,
    versionKey: false,


  }
);

export default model("Libros", libros);
