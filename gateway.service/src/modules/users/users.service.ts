import { Injectable } from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DelayedExecutionService } from '../../providers/delayed-execution/delayed-execution.service'

@Injectable()
export class UsersService {
  constructor(private readonly delayedTasksService: DelayedExecutionService) {}

  // TODO: call runLater()
  async updateUser(id: number, data: UpdateUserDto): Promise<UserDto> {
    return { id, name: data.name }
  }
}
