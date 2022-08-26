import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTag } from './types';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) { }

    getTags() {
        return this.prisma.category.findMany();
    }

    async getTagById(tagId: number) {
        return await this.prisma.category.findUnique({
            where: {
                id: tagId,
            }
        });
    }

    async createTag(newTag: CreateTag) {
        try {
            const tag = await this.prisma.category.create({
                data: {
                    name: newTag.name
                }
            });
            return tag;

        } catch (error) {
            if (
                error instanceof
                PrismaClientKnownRequestError
            ) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Tag already exists',
                    );
                }
            }
            throw error;
        }

    }

}
