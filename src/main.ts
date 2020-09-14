import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
      .setTitle('Employee Portal')
      .setDescription('The Employee Portal')
      .setVersion('1.0')
      .addTag('employee')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('v1', app, document);
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true
    }));
    await app.listen(3000);
  } catch (error) {
    console.log(`error in bootstrap.. ${JSON.stringify(error)}`)
  }
}
bootstrap();