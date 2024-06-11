import { Module } from '@nestjs/common'
import { ExchangeEnum, RoutingKeyEnum } from '../../common/constants'
import { DelayedExecutionModule } from '../../providers/delayed-execution/delayed-execution.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [
    DelayedExecutionModule.register({
      exchange: ExchangeEnum.USERS,
      routingKey: RoutingKeyEnum.USERS_UPDATE,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
