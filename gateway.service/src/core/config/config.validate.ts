import { plainToInstance } from 'class-transformer'
import { validateSync, IsDefined, IsString } from 'class-validator'

export class EnvironmentDto {
  @IsDefined()
  @IsString()
  RABBITMQ_USER!: string

  @IsDefined()
  @IsString()
  RABBITMQ_PASSWORD!: string

  @IsDefined()
  @IsString()
  RABBITMQ_HOST!: string

  @IsDefined()
  @IsString()
  RABBITMQ_PORT!: string

  @IsDefined()
  @IsString()
  RABBITMQ_PROTOCOL!: string
}

export const validate = (config: Record<string, unknown>): EnvironmentDto => {
  const validatedConfig = plainToInstance(EnvironmentDto, config, {
    enableImplicitConversion: true,
  })

  const errors = validateSync(validatedConfig, {
    whitelist: true,
    forbidUnknownValues: true,
    validationError: { target: false },
  })

  if (errors.length > 0) {
    throw new Error(String(errors))
  }

  return validatedConfig
}
