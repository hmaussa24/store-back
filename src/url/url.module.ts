import { Module, Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('url')
  getUrl(): string {
    return this.configService.get<string>('URL');
  }

  @Get('wompy-url')
  getWompyUrl(): string {
    return this.configService.get<string>('WOMPY_URL');
  }
}

@Module({
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class UrlModule {}
