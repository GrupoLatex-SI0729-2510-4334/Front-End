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
