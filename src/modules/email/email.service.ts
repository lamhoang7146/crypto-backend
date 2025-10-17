import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { forgotPassword } from './html';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text,
        html,
      });
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  async sendForgotPasswordEmail(
    to: string,
    accessToken: string,
  ): Promise<boolean> {
    return await this.sendEmail(
      to,
      'Password reset request',
      'Click the link to reset your password',
      forgotPassword(
        `${this.configService.get<string>('FE_APP_URL')}/auth/reset-password?token=${accessToken}`,
      ),
    );
  }
}
