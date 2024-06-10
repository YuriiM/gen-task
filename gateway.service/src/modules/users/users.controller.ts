import { Controller, Patch, Param, Body } from '@nestjs/common'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UserDto } from './dto/user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('/:id')
  @ApiOkResponse({ type: UserDto })
  async updateUser(@Param('id') id: number, @Body() data: UpdateUserDto): Promise<UserDto> {
    return this.usersService.updateUser(id, data)
  }
}
