const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware para eliminar evaluaciones por id
server.delete('/api/v1/evaluations/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = router.db; // Acceso a la base de datos

  // Obtener todas las evaluaciones
  const evaluations = db.get('evaluations').value();

  // Buscar la evaluación específica
  const evaluationIndex = evaluations.findIndex(evaluation => evaluation.id === id);

  if (evaluationIndex === -1) {
    return res.status(404).send({ message: 'Evaluación no encontrada.' });
  }

  // Eliminar la evaluación específica
  evaluations.splice(evaluationIndex, 1);

  // Guardar los cambios en la base de datos
  db.set('evaluations', evaluations).write();

  res.status(200).send({ message: 'Evaluación eliminada correctamente.' });
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server está corriendo en http://localhost:3000');
});
// Middleware para manejar las postulaciones
server.post('/api/v1/postulations', (req, res) => {
  const db = router.db; // Acceso a la base de datos
  const postulations = db.get('postulations').value();
  const newPostulation = { id: Date.now(), ...req.body };

  // Agregar la nueva postulación
  postulations.push(newPostulation);

  // Guardar los cambios en la base de datos
  db.set('postulations', postulations).write();

  res.status(201).send(newPostulation);
});

server.get('/api/v1/postulations', (req, res) => {
  const db = router.db; // Acceso a la base de datos
  const postulations = db.get('postulations').value();

  res.status(200).send(postulations);
});

server.get('/api/v1/postulations/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = router.db; // Acceso a la base de datos
  const postulation = db.get('postulations').find({ id }).value();

  if (!postulation) {
    return res.status(404).send({ message: 'Postulación no encontrada.' });
  }

  res.status(200).send(postulation);
});

server.put('/api/v1/postulations/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = router.db; // Acceso a la base de datos
  const postulations = db.get('postulations').value();
  const postulationIndex = postulations.findIndex(postulation => postulation.id === id);

  if (postulationIndex === -1) {
    return res.status(404).send({ message: 'Postulación no encontrada.' });
  }

  // Actualizar la postulación
  postulations[postulationIndex] = { ...postulations[postulationIndex], ...req.body };

  // Guardar los cambios en la base de datos
  db.set('postulations', postulations).write();

  res.status(200).send(postulations[postulationIndex]);
});

server.delete('/api/v1/postulations/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const db = router.db; // Acceso a la base de datos
  const postulations = db.get('postulations').value();
  const postulationIndex = postulations.findIndex(postulation => postulation.id === id);

  if (postulationIndex === -1) {
    return res.status(404).send({ message: 'Postulación no encontrada.' });
  }

  // Eliminar la postulación específica
  postulations.splice(postulationIndex, 1);

  // Guardar los cambios en la base de datos
  db.set('postulations', postulations).write();

  res.status(200).send({ message: 'Postulación eliminada correctamente.' });
});
