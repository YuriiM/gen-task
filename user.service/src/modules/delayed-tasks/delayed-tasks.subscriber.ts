import { Injectable, Logger } from '@nestjs/common'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { ExchangeEnum, RoutingKeyEnum } from './constants'

@Injectable()
export class DelayedTasksSubscriber {
  private readonly logger = new Logger(DelayedTasksSubscriber.name)

  @RabbitSubscribe({
    exchange: ExchangeEnum.USERS,
    routingKey: RoutingKeyEnum.USERS_UPDATE,
    queue: RoutingKeyEnum.USERS_UPDATE,
  })
  async handleTask(message: any) {
    const { serviceName, methodName, context } = message

    try {
      const serviceInstance = global[serviceName]
      if (!serviceInstance) throw new Error(`Instance ${serviceName} was not found.`)

      const method = serviceInstance[methodName]
      if (typeof method !== 'function') {
        throw new Error(`Method ${methodName} was not found on service ${serviceName}.`)
      }

      await method.call(serviceInstance, context)
    } catch (error) {
      this.logger.error(`Error executing task: ${error.message}`)
    }
  }
}
