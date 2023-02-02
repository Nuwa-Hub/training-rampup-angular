import {
  createStudentService,
  deleteAllStudentService,
  deleteStudentService,
  getAllStudentsService,
  getStudentByIdService,
  updateStudentService,
} from "../services/studentServices";
import { Request, Response } from "express";

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    console.log("getAllUsers");
    const allrecords = await getAllStudentsService();

    res.send(allrecords);
  } catch (err) {
    // console.log(err);
    res.status(400).send(err);
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await getStudentByIdService(id);

    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const user = req.body.data;
    console.log("createUsers", user);
    const userInsert = await createStudentService(user);
    // const socket = req.app.get("socket");
    // socket.emit(
    //   "notification",
    //   `New user created successfully Name: ${userInsert?.PersonName}  !`
    // );
    res.status(201).send(userInsert);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const user = req.body.data;

    const userUpdate = await createStudentService(user);
    // const socket = req.app.get("socket");
    // socket.emit(
    //   "notification",
    //   `User updated successfully Name: ${userUpdate?.PersonName}  !`
    // );
    console.log("updateUsers", userUpdate);
    res.status(201).send(userUpdate);
  } catch (err) {
    
    res.status(400).send(err);
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userDelete = await deleteStudentService(id);
    const socket = req.app.get("socket");
    socket.emit(
      "notification",
      `User deleted successfully Name: ${userDelete?.PersonName}  !`
    );
    res.send(userDelete);
  } catch (err) {
    res.send(err);
  }
};
export const deleteAllStudent = async (req: Request, res: Response) => {
  try {
    const userDelete = await deleteAllStudentService();
    res.send(userDelete);
  } catch (err) {
    res.send(err);
  }
};
