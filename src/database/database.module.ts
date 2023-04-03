import { Inject, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import { PostSchema, Posts } from "../posts/entities/post.entity";

@Module({
	imports: [
		MongooseModule.forRootAsync({
			// useFactory allow to inject services
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('NODE_ENV') === 'test' ?
					configService.get<string>('MONGO_TEST_CONNECTION_URL') : configService.get<string>('MONGO_CONNECTION_URL')
			}),
			inject: [ConfigService]
		}),

		MongooseModule.forFeature([
			{
				name: Posts.name,
				schema: PostSchema,
			},
		]),
	],
	providers: [DatabaseService],
	exports: [DatabaseService]
})

export class DatabaseModule { }