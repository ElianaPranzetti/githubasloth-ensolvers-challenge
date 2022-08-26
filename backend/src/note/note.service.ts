import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNote, UpdateNote } from './types';

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaService) { }

    getNotes(userId: number) {
        return this.prisma.note.findMany({
            where: {
                authorId: userId,
            }
        })
    }


    async getNotesByState(userId: number, state: boolean) {
        return await this.prisma.note.findMany({
            where: {
                authorId: userId,
                isArchived: state,
            }
        })
    }


    async getNoteById(userId: number, noteId: number) {
        return await this.prisma.note.findUnique({
            where: {
                id: noteId,
            }
        })
    }


    async createNote(userId: number, note: CreateNote) {
        const newNote = await this.prisma.note.create({
            data: {
                title: note.title,
                content: note.content,
                isArchived: !!note.state,
                author: {
                    connect: {
                        id: userId,
                    }
                },
            }
        })

        if (note.categories) {
            for (let elemento of note.categories) {
                await this.prisma.categoriesOnNotes.create({
                    data: {
                        note: {
                            connect: {
                                id: newNote.id
                            }
                        },
                        category: {
                            connect: {
                                id: elemento
                            }
                        },
                    }
                })
            }
        }

        return newNote;

    }


    async updateNoteById(userId: number, noteId: number, note: UpdateNote) {
        const changedNote = await this.prisma.note.findUnique({
            where: {
                id: noteId
            }
        })

        // check if user owns the changedNote
        if (!changedNote || changedNote.authorId !== userId)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        const newNote = await this.prisma.note.update({
            where: {
                id: noteId,
            },
            data: {
                author: {
                    connect: {
                        id: userId,
                    }
                },
                content: note.content,
                isArchived: !!note.state,
                title: note.title,
            }
        })

        await this.prisma.categoriesOnNotes.deleteMany({
            where: {
                noteId: newNote.id
            }
        })

        if (note.categories) {
            for (let elemento of note.categories) {
                await this.prisma.categoriesOnNotes.create({
                    data: {
                        note: {
                            connect: {
                                id: newNote.id
                            }
                        },
                        category: {
                            connect: {
                                id: elemento
                            }
                        },
                    }
                })
            }
        }

        return newNote;
    }


    async deleteNoteById(userId: number, noteId: number,) {
        const deletedNote = await this.prisma.note.delete({
            where: {
                id: noteId,
            }
        });
        // check if user owns the deletedNote
        if (!deletedNote || deletedNote.authorId !== userId)
            throw new ForbiddenException(
                'Access to resources denied',
            );

        await this.prisma.categoriesOnNotes.deleteMany({
            where: {
                noteId: noteId,
            }
        });

        return deletedNote;
    }
}
