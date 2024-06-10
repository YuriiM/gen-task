import { Module, DynamicModule, Provider } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { AppConfigService } from '../../core'
import { DelayedExecutionService } from './delayed-execution.service'
import { DELAYED_EXECUTION_OPTIONS } from './constants'

@Module({})
export class DelayedExecutionModule {
  static register(options: { exchange: string; routingKey: string }): DynamicModule {
    return {
      module: DelayedExecutionModule,
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
      providers: [
        DelayedExecutionService,
        {
          provide: DELAYED_EXECUTION_OPTIONS,
          useValue: { exchange: options.exchange, routingKey: options.routingKey },
        },
      ],
      exports: [DelayedExecutionService],
    }
  }
}
