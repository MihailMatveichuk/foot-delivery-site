import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type MailOptions = {
  email: string;
  name: string;
  subject: string;
  activationCode: string;
  template: string;
};

@Injectable()
export class EmailService {
  constructor(
    private mailService: MailerService,
    private configService: ConfigService,
  ) {}
  async sendMail({
    subject,
    email,
    template,
    name,
    activationCode,
  }: MailOptions) {
    await this.mailService.sendMail({
      to: email,
      subject,
      template,
      context: {
        name,
        activationCode,
      },
    });
  }
}
