import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { VALIDATED_ENV_PROPNAME } from '@nestjs/config/dist/config.constants'
import { EnvironmentDto, validate } from './config.validate'

@Injectable()
export class AppConfigService extends ConfigService<EnvironmentDto> {
  private static instance: AppConfigService

  static getInstance() {
    if (!AppConfigService.instance) {
      AppConfigService.instance = new AppConfigService({
        [VALIDATED_ENV_PROPNAME]: validate({ ...process.env }),
      })
    }

    return AppConfigService.instance
  }

  get rabbitMq() {
    return {
      username: <string>this.get('RABBITMQ_USER'),
      password: <string>this.get('RABBITMQ_PASSWORD'),
      host: <string>this.get('RABBITMQ_HOST'),
      port: <string>this.get('RABBITMQ_PORT'),
      protocol: <string>this.get('RABBITMQ_PROTOCOL'),
    }
  }
}
