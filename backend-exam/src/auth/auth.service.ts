import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (!user) {
      const errorMessage = 'no users';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.NOT_FOUND);
    }

    if (password !== user.password) {
      const errorMessage = 'invalid';
      this.logger.error(errorMessage);
      throw new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async login(user: any) {
    try {
      const userData = await this.validateUser(user.username, user.password);

      const payload = {
        sub: userData.id,
        username: userData.username,
      };
      return {
        user: {
          id: userData.id,
          username: userData.username,
        },
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      // See if the user was not found or the credentials are invalid
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.UNAUTHORIZED
      ) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
