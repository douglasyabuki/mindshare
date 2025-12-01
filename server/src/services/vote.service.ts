import { prismaClient } from '../../prisma/prisma'

export class VoteService {
  async toggleVote(userId: string, ideaId: string): Promise<boolean> {
    const vote = await prismaClient.vote.findUnique({
      where: {
        userId_ideaId: {
          userId,
          ideaId,
        },
      },
    })
    if (vote) {
      await prismaClient.vote.delete({
        where: {
          userId_ideaId: {
            userId,
            ideaId,
          },
        },
      })
    } else {
      await prismaClient.vote.create({
        data: {
          userId,
          ideaId,
        },
      })
    }
    return true
  }

  async listVotesByIdea(ideaId: string) {
    return prismaClient.vote.findMany({
      where: {
        ideaId,
      },
    })
  }

  async countVotesByIdea(ideaId: string) {
    return prismaClient.vote.count({
      where: {
        ideaId,
      },
    })
  }
}
