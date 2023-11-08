"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
class UserController {
    async createUser(req, res) {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const { name, email, birthDate, location } = req.body;
        const user = new User_1.User();
        user.name = name;
        user.email = email;
        user.birthDate = birthDate;
        user.location = location;
        await userRepository.save(user);
        res.json(user);
    }
    async getUsers(req, res) {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const users = await userRepository.find();
        res.json(users);
    }
    async getUserById(req, res) {
        const userId = req.params.id;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = await userRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(userId) },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    async updateUser(req, res) {
        const userId = req.params.id;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = await userRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(userId) },
        });
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
    async deleteUser(req, res) {
        const userId = req.params.id;
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        const user = await userRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(userId) },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await userRepository.remove(user);
        res.json({ message: "User deleted" });
    }
}
exports.UserController = UserController;
