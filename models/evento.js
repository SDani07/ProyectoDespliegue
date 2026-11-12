import mongoose from "mongoose";

let entradaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true,
        minlength: 3
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    disponibles: {
        type: Number,
        required: true,
        min: 0
    },
});

let Entrada = mongoose.model("entrada", entradaSchema);

let eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 5
    },
    fecha: {
        type: Date,
        required: true
    },
    entradas: [{
        type: Entrada,
        required: false
    }],
    recinto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recinto',
        required: false
    }
});

let Evento = mongoose.model("evento", eventoSchema);

export default Evento;  