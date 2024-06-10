import { Module, Global } from '@nestjs/common'
import { AppConfigService } from './config/config.service'

@Global()
@Module({
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class CoreModule {}
