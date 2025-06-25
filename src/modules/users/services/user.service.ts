import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	async get(): Promise<string> {
		return "This is list of users!";
	}
}
