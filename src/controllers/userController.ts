import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserInput, UpdateUserInput } from '../schemas/userSchema';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateUserInput = req.body;
      await this.userService.createUser(data);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json({ message: 'Users retrieved successfully', data: users });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error retrieving users' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }
      const user = await this.userService.getUserById(id);
      res.status(200).json({ message: 'User retrieved successfully', data: user });
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Error retrieving user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }
      const data: UpdateUserInput = req.body;
      const user = await this.userService.updateUser(id, data);
      res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error: any) {
      res.status(error.message === 'Error updating user' ? 404 : 400).json({
        error: error.message || 'Error updating user',
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.message === 'Error deleting user' ? 404 : 400).json({
        error: error.message || 'Error deleting user',
      });
    }
  }
}