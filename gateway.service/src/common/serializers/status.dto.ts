export enum StatusEnum {
  OK = 'ok',
  FAILURE = 'failure',
}

export class StatusDto {
  static getResponse = (status: StatusEnum) => ({ status })

  static ok = () => StatusDto.getResponse(StatusEnum.OK)

  static failure = () => StatusDto.getResponse(StatusEnum.FAILURE)

  status!: string
}
