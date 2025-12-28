import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './models/user.model';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './input/create-user.input';

/**
 * * @Query => GET
 * * @Mutation => POST, PUT, PATCH, or DELETE
 */
@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserModel])
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Mutation(() => String)
  async create(@Args('input') input: CreateUserInput): Promise<string> {
    return await this.usersService.create(input);
  }
}
