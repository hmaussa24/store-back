import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsAppService {
  private whatsappToken = process.env.WHATSAPP_TOKEN;
  private whatsappUrl = process.env.WHATSAPP_API_URL;

  async sendMessage(to: string, text: string) {
    await axios
      .post(
        `${this.whatsappUrl}/messages`,
        {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to,
          text: { preview_url: false, body: text },
          type: 'text',
        },
        {
          headers: {
            Authorization: `Bearer ${this.whatsappToken}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        console.log('Message sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }
}
