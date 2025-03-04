import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ReturnResponseInterceptor } from "./interceptors/return-response/return-response.interceptor";
import { CustomValidationFilter } from "./filter/validation-exception/validation-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new CustomValidationFilter());
  app.useGlobalInterceptors(new ReturnResponseInterceptor())

  const config = new DocumentBuilder()
    .setTitle("Windows Explorer API")
    .setDescription("REST API for Windows Explorer Webpage")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, documentFactory);

  const port = process.env.PORT ?? 8081;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
