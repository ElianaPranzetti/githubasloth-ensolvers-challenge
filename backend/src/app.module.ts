import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [NoteModule, AuthModule, PrismaModule, UserModule],
})
export class AppModule { }
