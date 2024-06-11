import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { CoreModule } from './core/core.module'
import { DelayedTasksModule } from './modules/delayed-tasks/delayed-tasks.module'
import { ProfilesModule } from './modules/profiles/profiles.module'

@Module({
  imports: [DiscoveryModule, CoreModule, DelayedTasksModule, ProfilesModule],
})
export class AppModule {}
