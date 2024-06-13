import { Router } from "express";
import personController from "../controllers/person.controller.js";

/* 
    Aca creamos las rutas get, post, put, delete, etc...
    decidimos la url y el controlador el cual va a responder a esa url cuando sea llamado
*/
const router = Router();

router.post("/student", personController.createStudent);
router.post("/teacher", personController.createTeacher);
router.get("/:id", personController.getPersonById);
router.put("/:id", personController.updatePerson);
router.delete("/:id", personController.deletePerson);

router.post("/:id/subjects/:subjectId", personController.addSubjectToPerson);
router.delete("/id/subjects/:subjectId", personController.removeSubjectFromPerson);

export default router;