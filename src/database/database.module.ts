import { Inject, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		MongooseModule.forRoot('mongodb + srv://root:joTage77ZK89s2oQ@cluster0.upger.mongodb.net/?retryWrites=true&w=majority')

		// MongooseModule.forRootAsync({
		// 		// useFactory allow to inject services
		// 		useFactory: (configService: ConfigService) => ({
		// 			// uri: configService.get<string>('NODE_ENV') === 'test' ?
		// 			// 	configService.get<string>('MONGO_TEST_CONNECTION_URL') : configService.get<string>('MONGO_CONNECTION_URL')
		// 			url: 'mongodb + srv://root:joTage77ZK89s2oQ@cluster0.upger.mongodb.net/?retryWrites=true&w=majority'

		// 		}),
		//inject: [ConfigService]
		//}),

	],
	providers: [DatabaseService],
	exports: [DatabaseService]
})

export class DatabaseModule { }