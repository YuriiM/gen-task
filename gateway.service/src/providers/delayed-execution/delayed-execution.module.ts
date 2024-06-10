import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { DelayedExecutionService } from './delayed-execution.service'
import { AppConfigService } from '../../core'

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: AppConfigService) => {
        const { username, password, host, port, protocol } = configService.rabbitMq
        const uri = `${protocol}://${username}:${password}@${host}:${port}`

        return {
          // TODO: create enum and move
          exchanges: [{ name: 'exchange', type: 'topic' }],
          uri,
          connectionInitOptions: { wait: false },
        }
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [DelayedExecutionService],
})
export class DelayedExecutionModule {}
