import { Module } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { AppConfigService } from '../../core'
import { DelayedTasksSubscriber } from './delayed-tasks.subscriber'

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (configService: AppConfigService) => {
        const { username, password, host, port, protocol } = configService.rabbitMq

        return {
          uri: `${protocol}://${username}:${password}@${host}:${port}`,
          connectionInitOptions: { wait: false },
        }
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [DelayedTasksSubscriber],
})
export class DelayedTasksModule {}
