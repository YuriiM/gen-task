import { Controller, Patch, Body } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { StatusDto } from '../../common/serializers/status.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/profile')
  @ApiOkResponse({ type: StatusDto })
  async updateProfile(@Body() data: UpdateProfileDto): Promise<StatusDto> {
    return this.usersService.updateProfile(data)
  }
}
