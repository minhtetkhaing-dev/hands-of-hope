import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserInput, UpdateUserInput } from '../schemas/userSchema';
import { HttpStatus } from '../constants/httpStatus';
import { ApiError } from '../utils/errors';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const data: CreateUserInput = req.body;
    await this.userService.createUser(data);
    res.status(HttpStatus.CREATED).json({ message: 'User created successfully' });
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await this.userService.getAllUsers();
    res.status(HttpStatus.OK).json({ message: 'Users retrieved successfully', data: users });
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid user ID');
    }
    const user = await this.userService.getUserById(id);
    res.status(HttpStatus.OK).json({ message: 'User retrieved successfully', data: user });
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid user ID');
    }
    const data: UpdateUserInput = req.body;
    const user = await this.userService.updateUser(id, data);
    res.status(HttpStatus.OK).json({ message: 'User updated successfully', data: user });
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid user ID');
    }
    await this.userService.deleteUser(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }

  async logout(req: Request, res: Response): Promise<void> {
    req.headers.authorization = undefined;
    res.status(200).json({ message: 'Logout successful' });
  }
}