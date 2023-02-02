import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/studentController";
import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { validateData, validata } from "../middleware/validator";
import verifyRoles from "../middleware/verifyRoles";

const studentRouter = Router();

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.post("/", createStudent);
studentRouter.put("/", updateStudent);
studentRouter.delete("/:id", deleteStudent);

export default studentRouter;
