import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from 'src/auth/auth.controller';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { VerificationService } from 'src/verification/verification.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    //eslint-disable-next-line prettier/prettier
    private jwtService: JwtService,
    private userService: UserService,
    private mailerService: MailerService,
    private verificationService: VerificationService,
    private configService: ConfigService,
  ) {
    this.jwtService= new JwtService({
      secret: this.configService.get('JWT_SECRET'),
      signOptions: { expiresIn: this.configService.get('JWT_EXPIRES_IN') },
    });
  }

  async login(dataLoginUser: SignInDto) {
    const { email, password: pass } = dataLoginUser;
    const user: any = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.active) {
      throw new UnauthorizedException('User not active');
    }
    const { password: passUser } = user;
    const isMatchPassword = await bcrypt.compare(pass, passUser);
    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    //update last login
    const myDate = new Date();
    myDate.setHours(myDate.getHours() - 6);
    await this.userService.update(user._id, { lastLogin: myDate });

    const payload = {
      email: user.email,
      username: user.username,
      role: user.role,
      id: user._id,
    };

    const dataUser = {
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      active: user.active,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      ...dataUser,
      access_token: token,
    };
  }

  async register(user: CreateUserDto) {
    const newUser: any = await this.userService.create(user);
    const dataVerification = await this.mailerService.sendMail(
      newUser.email,
      newUser._id,
    );
    const newVerification: any =
      await this.verificationService.create(dataVerification);
    const dataResponse = {
      verification: newVerification?.verification,
    };
    if (!newVerification) {
      throw new UnauthorizedException('Error creating verification');
    }
    return dataResponse;
  }

  async recovery(dataRecovery: any) {
    const { email, verificationId, myCode, password  } = dataRecovery;
    
    const user:any = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const dataVerification = await this.verificationService.findOne(verificationId);
    if (!dataVerification) {
      throw new UnauthorizedException('Verification not found');
    }
    
    if (String(dataVerification.code) !== String(myCode)) {
      
      throw new UnauthorizedException('Invalid code');
    }
    //actualizamos el password del usuario
    const newPassword = await bcrypt.hash(password, 10);
    const updatedUser = await this.userService.update(user._id, { password: newPassword });
    if(!updatedUser){
      throw new UnauthorizedException('Error updating password');
    }
    return { message: 'Password updated', success: true };
  }

  async reactive(dataReactive: any) {
    const { email, verificationId, myCode, } = dataReactive;
    const user:any = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const dataVerification = await this.verificationService.findOne(verificationId);
    if (!dataVerification) {
      throw new UnauthorizedException('Verification not found');
    }
    
    if (String(dataVerification.code) !== String(myCode)) {
      
      throw new UnauthorizedException('Invalid code');
    }
    
    
    const updatedUser = await this.userService.update(user._id, { active: true });
    if(!updatedUser){
      throw new UnauthorizedException('Error updating password');
    }
    return { message: 'Account Reactivated', success: true };
    
  }
}
