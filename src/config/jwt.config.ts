import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (
  _configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: _configService.get('JWT_SECRET'),
});
