import { Module } from "@nestjs/common";
import { NoteController } from "./note.controller";
import { NoteService } from './note.service';

@Module({
  providers: [NoteService],
  controllers: [NoteController],
})
export class NoteModule {

}