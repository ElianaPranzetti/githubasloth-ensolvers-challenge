import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthType } from "./types";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {

    }

    async signin(dto: AuthType) {
        // find the user by email
        const user =
            await this.prisma.user.findUnique({
                where: {
                    name: dto.name,
                },
            });
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException(
                'Credentials incorrect',
            );

        // compare password
        const pwMatches = await argon.verify(
            user.password,
            dto.password,
        );
        // if password incorrect throw exception
        if (!pwMatches)
            throw new ForbiddenException(
                'Credentials incorrect',
            );
        return user;
    }

    async singup(dto: AuthType) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    password: hash,
                },
            });

            return user;
        } catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }
    }

}