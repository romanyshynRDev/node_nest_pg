import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function start() {
    const PORT = process.env.PORT || 5000 // Change to 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('NEST NODE POSTGRES')
        .setDescription('Documentation REST API')
        .setVersion('1.0.0')
        .addTag('ULBI TV')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    await app.listen(PORT, () => { console.log('PORT', PORT) })
}
start()