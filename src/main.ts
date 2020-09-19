import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // protection
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