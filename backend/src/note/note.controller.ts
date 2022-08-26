import { Body, Controller, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { NoteService } from "./note.service";
import { CreateNote, UpdateNote } from "./types";

@UseGuards(AuthGuard('jwt'))
@Controller('notes')
export class NoteController {
    constructor(private noteService: NoteService) { }

    @Get('/archived/:state')
    getNotesByState(
        @Req() req: Request,
        @Param('state', ParseBoolPipe) state: boolean
    ) {
        return this.noteService.getNotesByState(
            req.user['id'],
            state,
        )
    }

    @Get(':id')
    getNoteById(
        @Req() req: Request,
        @Param('id', ParseIntPipe) noteId: number
    ) {
        return this.noteService.getNoteById(
            req.user['id'],
            noteId,
        )
    }

    @Get()
    getNotes(@Req() req: Request) {
        return this.noteService.getNotes(
            req.user['id'],
        )
    }

    @Post()
    createNote(
        @Req() req: Request,
        @Body() newNote: CreateNote,
    ) {
        return this.noteService.createNote(
            req.user['id'],
            newNote,
        )
    }

    @Patch(':id')
    updateNoteById(
        @Req() req: Request,
        @Param('id', ParseIntPipe) noteId: number,
        @Body() changedNote: UpdateNote
    ) {
        return this.noteService.updateNoteById(
            req.user['id'],
            noteId,
            changedNote,
        )
    }

    @Delete(':id')
    deleteNoteById(
        @Req() req: Request,
        @Param('id', ParseIntPipe) noteId: number,
    ) {
        return this.noteService.deleteNoteById(
            req.user['id'],
            noteId,
        )
    }

}