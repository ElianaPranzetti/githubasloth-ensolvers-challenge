import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { TagService } from "./tag.service";
import { CreateTag } from "./types";

@Controller('tags')
export class TagController {
    constructor(private tagService: TagService) { }

    @Get()
    getTags() {
        return this.tagService.getTags();
    }

    @Get(':id')
    getTagById(
        @Param('id', ParseIntPipe) tagId: number,
    ) {
        return this.tagService.getTagById(tagId);
    }

    @Post()
    createTag(
        @Body() newTag: CreateTag
    ) {
        return this.tagService.createTag(newTag);
    }
}