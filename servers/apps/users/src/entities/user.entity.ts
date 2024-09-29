import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(field:"id")')
export class Avatar {
  @Field() id: string;

  @Field() public_id: string;

  @Field() url: string;

  @Field() user_id: string;

  @Field(() => User)
  user?: User;
}

@ObjectType()
export class User {
  @Field() id: string;

  @Field() name: string;

  @Field() email: string;

  @Field() password: string;

  @Field() isActive: boolean;

  @Field(() => Avatar, { nullable: true })
  avatar?: Avatar | null;

  @Field() role: string;

  @Field() createAt: Date;

  @Field() updateAt: Date;
}
