import { Module } from '@nestjs/common'
import { DelayedExecutionModule } from './providers/delayed-execution/delayed-execution.module'
import { UsersModule } from './modules/users/users.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [DelayedExecutionModule, UsersModule, CoreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
