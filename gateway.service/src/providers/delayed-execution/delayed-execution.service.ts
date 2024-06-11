import { Injectable, Inject } from '@nestjs/common'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { T_DelayedExecutionOptions } from './types'
import { DELAYED_EXECUTION_OPTIONS } from './constants'

@Injectable()
export class DelayedExecutionService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @Inject(DELAYED_EXECUTION_OPTIONS) private readonly options: T_DelayedExecutionOptions,
  ) {}

  async runLater(serviceName: string, methodName: string, context: any): Promise<void> {
    const message = { serviceName, methodName, context }

    await this.amqpConnection.publish(this.options.exchange, this.options.routingKey, message)
  }
}
