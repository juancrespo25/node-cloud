import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field(() => String)
  name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  code: string;

  //campos de auditoria

  @Field(() => Boolean)
  is_active: boolean;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => String)
  created_user: string;

  @Field(() => String)
  updated_user: string;
}
