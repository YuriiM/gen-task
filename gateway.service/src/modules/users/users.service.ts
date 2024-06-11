import { Injectable, Logger } from '@nestjs/common'
import { StatusDto } from '../../common/serializers/status.dto'
import { DelayedExecutionService } from '../../providers/delayed-execution/delayed-execution.service'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name)

  constructor(private readonly delayedExecutionService: DelayedExecutionService) {}

  async updateProfile(data: UpdateProfileDto): Promise<StatusDto> {
    await this.delayedExecutionService.runLater('ProfilesService', 'updateProfile', data)

    return StatusDto.ok()
  }
}
