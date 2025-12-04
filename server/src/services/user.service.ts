import { prismaClient } from '../../prisma/prisma'
import { CreateUserInput, UpdateUserInput } from '../dtos/input/user.input'

export class UserService {
  async createUser(data: CreateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    })
    if (user) throw new Error('User already exists')
    return prismaClient.user.create({
      data,
    })
  }

  async listUsers() {
    return prismaClient.user.findMany()
  }

  async updateUser(id: string, data: UpdateUserInput) {
    const user = await prismaClient.user.findUnique({
      where: { id },
    })
    if (!user) throw new Error('User not found')

    return prismaClient.user.update({
      where: { id },
      data: {
        name: data.name ?? undefined,
        role: data.role ?? undefined,
      },
    })
  }

  async findUserById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    })
    if (!user) throw new Error('User not found')
    return user
  }
}
