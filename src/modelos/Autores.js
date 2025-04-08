// Schema son los campos que se va a guardar
// Model es  como el nombre de la tabla
import { Schema, model } from "mongoose";
import { format } from "morgan";

const autores = new Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: [true, "El  nombre del autor es obligatorio."],
    },
    apellidos: {
      type: String,
      trim: true,
      required: [true, "El apellido del autor es obligatorio."],
    },
    fecPub: {
      type: Date,
      required: [
        true,
        "La fecha de  publicacion del primer libro  es obligatoria.",
      ],
    },
    premios: {
      type: String,
      trim: true,
      required: [true, "El nombre de la distincion  es obligatorio."],
    },
    fecNac: {
      type: Date,
      required: [
        true,
        "La fecha de nacimiento es obligatoria.",
      ],
    },
    fecFall: {
        type: Date,
        required: [
          true,
          "La fecha de fallecimiento es obligatoria.",
        ],
      }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Autores", autores);
