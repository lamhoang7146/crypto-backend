import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./user.model";

@ObjectType()
export class RefreshToken {
	@Field()
	id: string;

	@Field()
	token: string;

	@Field()
	userId: string;

	@Field(() => User)
	user: User;

	@Field()
	expiresAt: Date;

	@Field()
	createdAt: Date;
}
