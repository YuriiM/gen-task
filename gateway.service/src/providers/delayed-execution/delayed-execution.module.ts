import { Module, DynamicModule } from '@nestjs/common'
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { AppConfigService } from '../../core'
import { DelayedExecutionService } from './delayed-execution.service'
import { DELAYED_EXECUTION_OPTIONS } from './constants'
import { T_DelayedExecutionOptions } from './types'

@Module({})
export class DelayedExecutionModule {
  static register(options: T_DelayedExecutionOptions): DynamicModule {
    return {
      module: DelayedExecutionModule,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          useFactory: (configService: AppConfigService) => {
            const { username, password, host, port, protocol } = configService.rabbitMq
            const { exchange, routingKey } = options

            return {
              uri: `${protocol}://${username}:${password}@${host}:${port}`,
              exchanges: [{ name: options.exchange, type: 'direct' }],
              queues: [{ name: routingKey, exchange, routingKey }],
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
