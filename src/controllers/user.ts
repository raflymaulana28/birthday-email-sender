import { User } from "../entities/User";
import { getRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const userRepository = getRepository(User);
    const { name, email, birthDate, location } = req.body;
    const user = new User();
    user.name = name;
    user.email = email;
    user.birthDate = birthDate;
    user.location = location;
    await userRepository.save(user);
    res.json(user);
  }
  async getUsers(req: Request, res: Response) {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const userId = req.params.id as any;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { _id: new ObjectId(userId) },
    } as any);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    const userId = req.params.id as any;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { _id: new ObjectId(userId) },
    } as any);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { name, email, birthDate, location } = req.body;
	user.name = name;
	user.email = email;
	user.birthDate = birthDate;
	user.location = location;
	const updatedUser = await userRepository.save(user);
    res.json(updatedUser);
  }

  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id as any;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { _id: new ObjectId(userId) },
    } as any);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userRepository.remove(user);
    res.json({ message: "User deleted" });
  }
}
