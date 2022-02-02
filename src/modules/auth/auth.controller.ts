import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { TokenResponse } from './responses/token.response';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    operationId: 'login',
    summary: 'Login user',
    description: 'Logs in a user, returns a JWT token',
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() dto: LoginDto): Promise<TokenResponse> {
    const userEntity = await this.authService.validateUser(dto);
    return await this.authService.createAccessToken(userEntity.user);
  }
}
