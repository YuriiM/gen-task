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

  async runLater(callback: (context: any) => void, context: any): Promise<any> {
    const { exchange, routingKey } = this.options
    const payload = { callback: callback.toString(), context }

    return this.amqpConnection.request({ exchange, routingKey, payload })
  }
}
