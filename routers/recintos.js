import express from 'express';
import Recinto from '../models/recinto.jd';

let router = express.Router();

router.get('/', async (req, res) => {
    Recinto.find().then(resultado => {
        if(resultado) {
            res.status(200).send({ ok: true, resultado: resultado });
        } else {
            res.status(500).send({ok: false, error: "No se han podido encontrar recintos"});
        }
    }).catch (error => {
        res.status(500).send({ ok: false, error: "No se han encontrado recintos"});
    });
});


router.get('/:id', async (req, res) => {
    Recinto.findById(req.params.id).then(resultado => {
        if(resultado) {
            res.status(200).send({ok: true, resultado: resultado});
        } else {
            res.status(400).send({ok: false, error: "Recinto no encontrado"});
        }
    }).catch(error => {
        res.status(400).send({ok: false, error: "Error al buscar el recinto"});
    });
});

router.get('/localidad/:nombre', async (req, res) => {
    Recinto.find(r => r.localidad === req.params.nombre).then(resultado => {
        if (resultado) {
            res.status(200).send({ok: true, resultado: resultado});
        } else {
            res.status(404).send({ok: false, error: "No se han encontrado recintos de la localidad indicada"});
        }
    }).catch(error => {
        res.status(404).send({ok: false, error: "No se han encontrado recintos de la localidad indicada"});
    });
});

router.post('/', async (req, res) => {
    let nuevoRecinto = new Recinto({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        localidad: req.body.localidad,
        aforoMaximo: req.body.aforoMaximo
    });
    nuevoRecinto.save().then(resultado => {
        res.status(201).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(500).send({ok: false, error: "Error añadiendo recinto"});
    });
});

router.delete('/:id', async (req, res) => {
    Recinto.findByIdAndDelete(req.params.id).then(resultado => {
        if(resultado) {
            res.status(200).send({ok: true, resultado: resultado});
        } else {
            res.status(404).send({ok: false, error: "Error eliminando recinto " + req.params.id});
        }
    }).catch(error => {
        res.status(404).send({ok: false, error: "Error eliminando recinto " + req.params.id});
    });
});

export default router;