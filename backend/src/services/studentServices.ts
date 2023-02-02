import { AppDataSource } from "../configs/DataSourceConfig";
import { Student } from "../models/Student";

export const getAllStudentsService = async (): Promise<Student[]> => {
  try {
    const userRepo = AppDataSource.getRepository(Student);
    const allrecords = await userRepo.find({
      order: {
        PersonID: "ASC",
      },
    });
    return allrecords;
  } catch (err) {
    throw new Error("Error in getting all users");
  }
};

export const getStudentByIdService = async (
  id: number
): Promise<Student | null> => {
  try {
    const userRepo = AppDataSource.getRepository(Student);
    const user = await userRepo.findOneBy({ PersonID: id });
    return user;
  } catch (err) {
    throw new Error("Error in getting user by id");
  }
};

export const createStudentService = async (user: Student): Promise<Student> => {
  try {
    const userRepo = AppDataSource.getRepository(Student);
    const userInsert = await userRepo.save(user);

    return userInsert;
   
  } catch (err) {
    
    throw new Error("Error in creating user");
  }
};

export const updateStudentService = async (user: Student): Promise<Student> => {
  try {
    const userRepo = AppDataSource.getRepository(Student);
    const userUpdate = await userRepo.save(user);
    const updateUser = await userRepo.findOneBy({ PersonID: user.PersonID });
    if (updateUser) {
      return updateUser;
    } else {
      throw new Error("Error in updating user");
    }
  } catch (err) {
    throw new Error("Error in updating user");
  }
};

export const deleteStudentService = async (id: number): Promise<Student> => {
  const userRepo = AppDataSource.getRepository(Student);
  const user = await userRepo.findOneBy({ PersonID: id });

  if (user) {
    const userDelete = await userRepo.remove(user);
    userDelete.PersonID = id;
    return userDelete;
  } else {
    throw new Error("Error in updating user");
  }
};

export const deleteAllStudentService = async (): Promise<Student[]> => {
  const userRepo = AppDataSource.getRepository(Student);
  const allrecords = await userRepo.find();
  const userDelete = await userRepo.remove(allrecords);
  return userDelete;
};
