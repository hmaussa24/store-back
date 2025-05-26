import { Controller, Post, Body } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Post('send-message')
  async sendMessage(@Body('to') to: string, @Body('text') text: string) {
    return this.whatsappService.sendMessage(to, text);
  }
}
