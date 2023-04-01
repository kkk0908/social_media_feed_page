// Import the 'dotenv' package to read environmental variables from a .env file
import * as dotenv from 'dotenv';
dotenv.config();

// Import NestJS dependencies
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Import the root AppModule
import { AppModule } from './app.module';

// Define an async function to bootstrap the NestJS application
async function bootstrap() {
  // Create an instance of the NestJS application
  const app = await NestFactory.create(AppModule);

  // Define Swagger documentation options
  const config = new DocumentBuilder()
    .setTitle('Blog App')
    .setDescription('Blog APIs for JK company test')
    .setVersion('1.0')
    .addTag('Blog')
    .addBearerAuth()
    .build();

  // Generate Swagger documentation
  const document = SwaggerModule.createDocument(app, config);

  // Mount Swagger UI and API docs on '/api' path
  SwaggerModule.setup('api', app, document);

  // Start listening on the specified port, or 3000 if none is provided
  await app.listen(process.env.PORT || 3000).catch(error => {
    // If there is an error starting the server, log the error message
    console.log('Something went wrong: ' + JSON.stringify(error));
  });
}

// Call the bootstrap function to start the NestJS application
bootstrap();
