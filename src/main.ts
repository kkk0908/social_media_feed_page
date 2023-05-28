// Import the 'dotenv' package to read environmental variables from a .env file
import * as dotenv from 'dotenv';
import { urlencoded, json } from 'express';
dotenv.config();

// Import NestJS dependencies
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// Import Helmet
import helmet from 'helmet';

// Import the root AppModule
import { AppModule } from './app.module';
import { Cluster } from './app-cluster.service';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// Define an async function to bootstrap the NestJS application
async function bootstrap() {
  // Create an instance of the NestJS application
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));


  // Define Swagger documentation options
  const config = new DocumentBuilder()
    .setTitle('Social Media Feed')
    .setDescription('APIs for Social Media Feed')
    .setVersion('1.0')
    .addTag('Blog')
    .addBearerAuth()
    .build();

  // Generate Swagger documentation
  const document = SwaggerModule.createDocument(app, config);

  // Mount Swagger UI and API docs on '/api' path
  SwaggerModule.setup('api', app, document);

    // Enable CORS
  const corsOptions: CorsOptions = {
    origin: true, // Allow requests from any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  // Start listening on the specified port, or 3000 if none is provided
  await app.listen(process.env.PORT || 4000)
    .then(() => console.info('API Document Link', `http://localhost:${process.env.PORT || 4000}/api`))
    .catch(error => {
      // If there is an error starting the server, log the error message
      console.error('Something went wrong: ' + JSON.stringify(error));
    });
}

// Call the bootstrap function to start the NestJS application
//bootstrap();
// use 4 workers
Cluster.register(4, bootstrap); // I tried with cluster but It was taking much time campared to normal. while fetching Query
