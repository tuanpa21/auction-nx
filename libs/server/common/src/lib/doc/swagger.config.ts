import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { INestApplication } from '@nestjs/common'

export const setupSwagger = (app: INestApplication, version: string, globalPrefix: string): void => {
  const configDocument = new DocumentBuilder()
    .setTitle(`Jitera APIs`)
    .setDescription(`Swagger Representation APIs using in Jitera`)
    .setVersion(version)
    .addBearerAuth({
      type: `http`,
      scheme: `bearer`,
      bearerFormat: `JWT`,
      name: `Authorization`,
      description: `Please enter refreshToken in following format: Bearer <JWT>`,
      in: `header`,
    })
    .addCookieAuth('auth-cookie', {
      type: 'http',
      in: 'Header',
      scheme: 'Bearer',
    })
    .addOAuth2()
    .build()
  const document = SwaggerModule.createDocument(app, configDocument)
  SwaggerModule.setup(`api/${version}/${globalPrefix}/docs`, app, document, {
    swaggerOptions: {
      displayOperationId: true,
      displayRequestDuration: true,
    },
  })
}
