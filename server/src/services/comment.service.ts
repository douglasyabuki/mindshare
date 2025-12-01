import { prismaClient } from '../../prisma/prisma'
import { CreateCommentInput } from '../dtos/input/comment.input'

export class CommentService {
  async create(ideaId: string, authorId: string, data: CreateCommentInput) {
    const idea = await prismaClient.idea.findUnique({
      where: {
        id: ideaId,
      },
    })
    if (!idea) throw new Error('Idea not found')

    return await prismaClient.comment.create({
      data: {
        content: data.content,
        authorId,
        ideaId,
      },
    })
  }

  async listByIdea(ideaId: string) {
    return prismaClient.comment.findMany({
      where: {
        ideaId,
      },
    })
  }
}
