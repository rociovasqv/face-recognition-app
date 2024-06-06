import { PersonService } from "../services/person.service.js";

/*
  Los controladores son llamados desde las rutas
  Acá no deberia estar la lógica de negocio, para eso están los servicios.
  Acá solamente preparamos y enviamos una respuesta al cliente
*/

const createPerson = async (req, res) => {
  console.log("createSearch");
  try {
    let newPerson = await PersonService.createPerson(req.body)
    res.status(200).json(newPerson);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message
    });
  }
}

export { createPerson }