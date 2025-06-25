import { Module } from "@nestjs/common";
import { UserResolver } from "./resolvers/user.resolver";
import { UserService } from "./services/user.service";
// import { RefreshTokenResolver } from "./resolvers/refresh-token.resolver";

@Module({
	providers: [UserResolver, UserService]
})
export class UserModule { };
