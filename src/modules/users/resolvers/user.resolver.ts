import { Resolver, Query, Mutation, } from "@nestjs/graphql";
import { User as UserModal } from "../models/user.model";
import { UserService } from "../services/user.service";

@Resolver(() => UserModal)
export class UserResolver {
	constructor(private userService: UserService) { }

	@Mutation(() => UserModal)
	async createUser() {
		
	}

}
