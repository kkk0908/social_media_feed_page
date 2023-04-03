import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import request from 'supertest'
import { PostsModule } from '../src/posts/posts.module';
import { DatabaseService } from '../src/database/database.service';
import { postStub } from './stubs/post.stub';
describe('PostsController', () => {
	let dbConnection: Connection;
	let httpServer: any
	let app: any

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			imports: [PostsModule],
		}).compile();

		app = moduleRef.createNestApplication();
		await app.init();
		dbConnection = moduleRef.get<DatabaseService>(DatabaseService).getDbHandle()
		httpServer = app.getHttpAdapter()
	});
	afterAll(async () => {
		await dbConnection.collection('posts').deleteMany({})
		await app.close()
	})

	describe('getPosts', () => {
		it('should be return a post json', async () => {
			await dbConnection.collection('posts').insertOne(postStub())
			const response = await request(httpServer).get('/posts');
			expect(response.status).toBe(200);
			expect(response.body).toEqual(postStub)
		})


	})




});
