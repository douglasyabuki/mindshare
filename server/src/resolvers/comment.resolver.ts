import { Arg, FieldResolver, Mutation, Resolver, Root } from 'type-graphql'
import { CreateCommentInput } from '../dtos/input/comment.input'
import { GraphqlUser } from '../graphql/decorators/user.decorator'
import { CommentModel } from '../models/comment.model'
import { IdeaModel } from '../models/idea.model'
import { UserModel } from '../models/user.model'
import { CommentService } from '../services/comment.service'
import { IdeaService } from '../services/idea.service'

@Resolver(() => CommentModel)
export class CommentResolver {
  private commentService = new CommentService()
  private ideaService = new IdeaService()

  @Mutation(() => CommentModel)
  async createComment(
    @Arg('ideaId', () => String) ideaId: string,
    @Arg('data', () => CreateCommentInput) data: CreateCommentInput,
    @GraphqlUser() user: UserModel
  ): Promise<CommentModel> {
    return this.commentService.create(ideaId, user.id, data)
  }

  @FieldResolver(() => IdeaModel)
  async idea(@Root() comment: CommentModel): Promise<IdeaModel> {
    return this.ideaService.findIdeaById(comment.ideaId)
  }
}
