import express from 'express';
import Evento from '../models/evento';

let router = express.Router();

router.get('/', async (req, res) => {
    Evento.find().then(resultado => {
        if(resultado) {
            res.status(200).send({ok: true, resultado: resultado});
        } else {
            res.status(500).send({ok: false, error: "No se han encontrado eventos"});
        }
    }).catch(error => {
        res.status(500).send({ok: false, error: "No se han encontrado eventos"});
    });
});

router.get('/:id', async (req, res) => {
    Evento.findById(req.params.id).then(resultado => {
        if(resultado) {
            res.status(200).send({ok: true, resultado: resultado});
        } else {
            res.status(404).send({ok: false, error: "Evento " + req.params.id + " no encontrado"});
        }
    }).catch(error => {
        res.status(404).send({ok: false, error: "Evento " + req.params.id + " no encontrado"});
    });
});

router.get('/localidad/:nombre', async (req, res) => {
    let date = new Date();
    Evento.find(e => e.recinto.localidad === req.params.nombre && e.fecha < date)
        .then(resultado => {
            if(resultado) {
                res.status(200).send({ok: true, resultado: resultado});
            } else {
                res.status(404).send({ok: false, error: "No se han encontrado eventos"});
            }
    }).catch(error => {
        res.status(404).send({ok: false, error: "No se han encontrado eventos"});
    });
});

router.post('/', async (req, res) => {
    let nuevoEvento = new Evento({
        nombre: req.body.nombre,
        fecha: req.body.fecha,
        entradas: req.body.entradas,
        recinto: req.bq.recinto
    });
    nuevoEvento.save().then(resultado => {
        res.status(201).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(500).send({ok: false, error: "Error añadiendo evento"});
    });
});

router.put('/:id', async (req, res) => {
    Evento.findByIdAndUpdate(req.params.id, 
        {
            nombre: req.body.nombre,
            fecha: req.body.fecha,
            entradas: req.body.entradas,
            recinto: req.body.recinto
        }, 
        {returnDocument: 'after'}
    ).then(resultado => {
        res.status(200).send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(404).send({ok: false, error: "Error actualizando evento " + req.params.id});
    });
});

router.delete('/:id', async (req, res) => {
    Evento.findByIdAndDelete(req.params.id).then(resultado => {
        if(resultado) {
            res.status(200).send({ok: true, resultado: resultado});
        } else {
            res.status(404).send({ok: false, error: "Error eliminando evento " + req.params.id});
        }
    }).catch(error => {
        res.status(404).send({ok: false, error: "Error eliminando evento " + req.params.id});
    });
});

router.get('/entradas/:idEvento/:tipoEntrada', async (req, res) => {
    Evento.findById(req.params.idEvento).then(resultado => {
        if(resultado) {
            let index = resultado.entradas.findIndex(ent => ent.tipo === req.params.tipoEntrada);
            if (index !== -1) {
                let entrada = resultado.entradas[index];
                let precio = entrada.precio;
                let disponibles = entrada.disponibles;
                res.status(200).send({ok: true, resultado: {
                    precio: precio,
                    disponibles: disponibles
                }});
            } else {
                res.status(404).send({ok: false, error: "Error obteniendo datos de entrada para evento " + req.params.idEvento});
            }
        } else {
            res.status(404).send({ok: false, error: "Error obteniendo datos de entrada para evento " + req.params.idEvento});
        }
    }).catch(error => {
        res.status(404).send({ok: false, error: "Error obteniendo datos de entrada para evento " + req.params.idEvento});
    });
});

router.put('/entradas/:idEvento/:tipoEntrada/:cantidad', async (req, res) => {
    let entradas;
    Evento.findById(req.params.idEvento).then(resultado => {
        if(resultado) {
            let index = resultado.entradas.findIndex(ent => ent.tipo === req.params.tipoEntrada);
            if (index !== -1) {
                const cantidad = Number(req.params.cantidad);
                if (cantidad >=0 ) {
                    resultado.entradas[index].disponibles -= cantidad;
                    if (resultado.entradas[index].disponibles < 0) {
                        res.status(404).send({ok: false, error: "Error actualizando entradas del evento " + req.params.idEvento});
                    } else {
                        Evento.findByIdAndUpdate(req.params.idEvento, 
                            {
                                nombre: req.body.nombre,
                                fecha: req.body.fecha,
                                entradas: resultado.entradas,
                                recinto: req.body.recinto
                            },
                            {returnDocument: 'after'}
                        ).then(result => {
                            res.status(200).send({ok: true, resultado: result});
                        }).catch(error => {
                            res.status(404).send({ok: false, error: "Error actualizando entradas del evento " + req.params.idEvento});
                        });
                    }
                } else {
                    res.status(404).send({ok: false, error: "Error actualizando entradas del evento " + req.params.idEvento});
                }
            } else {
                res.status(404).send({ok: false, error: "Error actualizando entradas del evento " + req.params.idEvento});
            }
        } else {
            res.status(404).send({ok: false, error: "Error actualizando entradas del evento " + req.params.idEvento});
        }
    }).catch(error => {
        res.status(404).send({ok: false, error: "Error actualizando entradas del evento " + req.params.idEvento});
    });
});

export default router;