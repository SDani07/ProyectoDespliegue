import mongoose from "mongoose";

let recintoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 5
    },
    direccion: {
        type: String,
        required: true,
        minlength: 10
    },
    localidad: {
        type: String,
        required: true,
        minlength: 3
    },
    aforoMaximo: {
        type: Number,
        required: false
    }
});

let Recinto = mongoose.model("recinto", recintoSchema);

export default Recinto;