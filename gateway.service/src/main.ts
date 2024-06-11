import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { AppConfigService } from './core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder().setTitle('GEN TASK').setVersion('1.0').build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/', app, document)

  const appConfig = app.get(AppConfigService)
  await app.listen(appConfig.port)
}
bootstrap()
