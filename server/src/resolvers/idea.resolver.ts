import { User } from '@prisma/client'
import {
  Arg,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { CreateIdeaInput, UpdateIdeaInput } from '../dtos/input/idea.input'
import { GraphqlUser } from '../graphql/decorators/user.decorator'
import { IsAuthenticated } from '../middlewares/auth.middleware'
import { IdeaModel } from '../models/idea.model'
import { UserModel } from '../models/user.model'
import { IdeaService } from '../services/idea.service'
import { UserService } from '../services/user.service'

@Resolver(() => IdeaModel)
@UseMiddleware(IsAuthenticated)
export class IdeaResolver {
  private ideaService = new IdeaService()
  private userService = new UserService()

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

  @FieldResolver(() => UserModel)
  async author(@Root() idea: IdeaModel): Promise<UserModel> {
    return this.userService.findUser(idea.authorId)
  }
}
