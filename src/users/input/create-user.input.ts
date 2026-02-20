import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../../roles/types/role.type';

@InputType()
export class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  last_name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  role!: UserRole;
}
