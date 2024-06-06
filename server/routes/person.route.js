import { Router } from "express";
import { createPerson } from "../controllers/person.controller.js";

/* 
    Aca creamos las rutas get, post, put, delete, etc...
    decidimos la url y el controlador el cual va a responder a esa url cuando sea llamado
*/
const router = Router();

//Create
router.post("/", createPerson);


export default router;