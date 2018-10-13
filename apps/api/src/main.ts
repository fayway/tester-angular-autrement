import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { JwtStrategy } from './app/auth/jwt.strategy';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));

  const options = new DocumentBuilder()
    .setTitle('Waterbnb')
    .setDescription('Waterbnb API')
    .setVersion('1.0')
    .addBearerAuth(JwtStrategy.tokenHeaderName, 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(3000);
}
bootstrap();
