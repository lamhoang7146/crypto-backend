import { Field, ObjectType } from "@nestjs/graphql";
import { RefreshToken } from "./refresh-token.model";

@ObjectType()
export class User {
	@Field()
	id: string;

	@Field({ nullable: true })
	avatar?: string;

	@Field()
	name: string;

	@Field()
	email: string;

	password: string;

	@Field(() => [RefreshToken], { nullable: true })
	refreshTokens?: RefreshToken[];

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
