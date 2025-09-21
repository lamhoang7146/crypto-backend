import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma/prisma.service";

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) { }
}
