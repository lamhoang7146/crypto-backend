import { Field, ObjectType } from "@nestjs/graphql";

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

	@Field({ nullable: true })
	refreshTokens?: string;

	@Field()
	createdAt: Date;

	@Field()
	updatedAt: Date;
}
