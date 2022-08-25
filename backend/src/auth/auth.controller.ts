import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthType } from "./types";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signin')
    singin(@Body() dto: AuthType) {
        return this.authService.signin(dto);
    }

    @Post('signup')
    singup(@Body() dto: AuthType) {
        return this.authService.singup(dto);
    }
}