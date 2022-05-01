import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { compareSync } from 'bcryptjs';
import { SecureMasterService } from '../security_master/secure.master.service';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly secure: SecureMasterService,
  ) {}
  async authenticate(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findByEmail(createAuthDto.email);
    if (!compareSync(createAuthDto.password, user.password)) {
      throw new UnauthorizedException('Incorrect Password');
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      mobile_token: await this.secure.generateTokenMobile(),
      web_token: await this.secure.generateTokenWeb(),
    };
  }
}
