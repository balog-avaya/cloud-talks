import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from '../shared/api-config.service';
import { TokenResponse } from './responses/token.response';

// simple user entity, we don't even care about the password
export interface UserEntity {
  id: string;
  user: string;
}

// some predefined users
const ValidUsers = [
  {
    id: 'f383f91c-f790-4f90-8633-f6e7ba431229',
    user: 'maci',
  },
  {
    id: '9d220001-45d6-4526-9abd-caefe812eae4',
    user: 'laci',
  },
  {
    id: '2aed2683-5d15-4b0b-8879-3a7854b6b9cf',
    user: 'bubu',
  },
  {
    id: 'cf74a37e-1b16-4f16-875c-6e23b47adc41',
    user: 'cindy',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ApiConfigService,
  ) {}

  async validateUser(dto: LoginDto): Promise<UserEntity> {
    const user = this.findUserByUsername(dto.username, '');
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async findUserByUsername(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    // only look up the username, don't care about passwords...
    const idx = ValidUsers.findIndex((se) => se.user === username);

    if (idx === -1) {
      return null;
    }

    return ValidUsers[idx];
  }

  async createAccessToken(username: string): Promise<TokenResponse> {
    return new TokenResponse({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({ username }),
    });
  }
}
