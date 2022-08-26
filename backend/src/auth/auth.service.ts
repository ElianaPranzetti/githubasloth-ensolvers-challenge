import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthType } from "./types";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {

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
        return this.signToken(user.id, user.name);
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

            return this.signToken(user.id, user.name);
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

    async signToken(userId: number, name: string): Promise<{ access_token: string }> {
        const data = {
            sub: userId,
            name,
        }
        const token = await this.jwt.signAsync(data, {
            expiresIn: '7d',
            secret: this.config.get('SECRET')
        })

        return {
            access_token: token,
        }
    }

}