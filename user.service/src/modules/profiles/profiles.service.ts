import { Injectable, Logger } from '@nestjs/common'
import { T_UpdateProfile } from './types'

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger(ProfilesService.name)

  async updateProfile(data: T_UpdateProfile): Promise<void> {
    this.logger.log(`Profile was successfully updated`, data)
  }
}
