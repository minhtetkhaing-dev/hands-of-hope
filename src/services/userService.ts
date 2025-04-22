import prisma from '../lib/prisma';
import { User } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../schemas/userSchema';
import bcrypt from 'bcrypt';

export class UserService {
  // Create a user
  async createUser(data: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        image: data.image,
        phone: data.phone,
        address: data.address,
        nrc: data.nrc,
        gender: data.gender,
        birthDate: data.birthDate,
        role: data.role || 'supporter',
        isActive: data.isActive ?? false,
      },
    });
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  // Get a user by ID
  async getUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  // Update a user
  async updateUser(id: number, data: UpdateUserInput): Promise<User> {
    try {
      const updateData: Partial<UpdateUserInput> = { ...data };
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }
      return await prisma.user.update({
        where: { id },
        data: {
          email: updateData.email,
          password: updateData.password,
          name: updateData.name,
          image: updateData.image,
          phone: updateData.phone,
          address: updateData.address,
          nrc: updateData.nrc,
          gender: updateData.gender,
          birthDate: updateData.birthDate,
          role: updateData.role,
          isActive: updateData.isActive,
        },
      });
    } catch (error) {
      throw new Error('Error updating user');
    }
  }

  // Delete a user
  async deleteUser(id: number): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
}