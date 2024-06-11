import { NestFactory, DiscoveryService } from '@nestjs/core'
import { AppConfigService } from './core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const discoveryService = app.get(DiscoveryService)
  const providers = discoveryService.getProviders()

  providers.forEach((provider) => {
    global[provider.name] = provider.instance
  })

  const appConfig = app.get(AppConfigService)
  await app.listen(appConfig.port)
}
bootstrap()
