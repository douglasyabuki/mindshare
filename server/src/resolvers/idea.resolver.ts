import { User } from '@prisma/client'
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { CreateIdeaInput, UpdateIdeaInput } from '../dtos/input/idea.input'
import { GraphqlUser } from '../graphql/decorators/user.decorator'
import { IsAuthenticated } from '../middlewares/auth.middleware'
import { CommentModel } from '../models/comment.model'
import { IdeaModel } from '../models/idea.model'
import { UserModel } from '../models/user.model'
import { VoteModel } from '../models/vote.model'
import { CommentService } from '../services/comment.service'
import { IdeaService } from '../services/idea.service'
import { UserService } from '../services/user.service'
import { VoteService } from '../services/vote.service'

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuthenticated)
export class IdeaResolver {
  private ideaService = new IdeaService()
  private userService = new UserService()
  private commentService = new CommentService()
  private voteService = new VoteService()

  @Mutation(() => IdeaModel)
  async createIdea(
    @Arg('data', () => CreateIdeaInput) data: CreateIdeaInput,
    @GraphqlUser() user: User
  ): Promise<IdeaModel> {
    return this.ideaService.createIdea(data, user.id)
  }

  @Mutation(() => IdeaModel)
  async updateIdea(
    @Arg('data', () => UpdateIdeaInput) data: UpdateIdeaInput,
    @Arg('id', () => String) id: string
  ): Promise<IdeaModel> {
    return this.ideaService.updateIdea(id, data)
  }

  @Mutation(() => Boolean)
  async deleteIdea(@Arg('id', () => String) id: string): Promise<boolean> {
    await this.ideaService.deleteIdea(id)
    return true
  }

  @Query(() => [IdeaModel])
  async listIdeas(): Promise<IdeaModel[]> {
    return this.ideaService.listIdeas()
  }

  @Query(() => IdeaModel)
  async getIdea(@Arg('id', () => String) id: string): Promise<IdeaModel> {
    return this.ideaService.getIdea(id)
  }

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return this.userService.findUserById(idea.authorId)
  }

  @FieldResolver(() => [CommentModel])
  async comments(@Root() idea: IdeaModel): Promise<CommentModel[]> {
    return this.commentService.listCommentsByIdea(idea.id)
  }

  @FieldResolver(() => [VoteModel])
  async votes(@Root() idea: IdeaModel): Promise<VoteModel[]> {
    return this.voteService.listVotesByIdea(idea.id)
  }

  @FieldResolver(() => Number)
  async votesCount(@Root() idea: IdeaModel): Promise<number> {
    return this.voteService.countVotesByIdea(idea.id)
  }
}
