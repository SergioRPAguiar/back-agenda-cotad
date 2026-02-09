import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('delete-account')
  async deleteAccountRequest(
    @Body() body: { name: string; email: string; message: string },
    @Res() res: Response,
  ) {
    await this.emailService.sendPolicyEmail(
      'gt.computacao.tl@gmail.com',
      'Solicitação de exclusão de conta',
      `Nome: ${body.name}\nEmail: ${body.email}\nMotivo: ${body.message}`,
    );

    // redireciona para página de sucesso
    return res.redirect('/politicas/success.html');
  }
}
