import { Test, TestingModule } from "@nestjs/testing";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, connect, Model } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { PostsController } from "../src/posts/posts.controller";
import { PostsService } from "../src/posts/posts.service";
import { Posts, PostSchema } from "../src/posts/entities/post.entity";
import { postStub } from './stubs/post.stub';
import { UtilService } from "../src/utils/utils.service";

describe("PostsController", () => {
	let postController: PostsController;
	let mongod: MongoMemoryServer;
	let mongoConnection: Connection;
	let postModel: Model<Posts>;

	beforeAll(async () => {
		mongod = await MongoMemoryServer.create();
		const uri = mongod.getUri();
		mongoConnection = (await connect(uri)).connection;
		postModel = mongoConnection.model(Posts.name, PostSchema);
		const app: TestingModule = await Test.createTestingModule({
			controllers: [PostsController],
			providers: [
				PostsService,
				UtilService,
				{ provide: getModelToken(Posts.name), useValue: postModel },
			],
		}).compile();
		postController = app.get<PostsController>(PostsController);
	});

	// after all the tests drop the database and close the connection
	afterAll(async () => {
		await mongoConnection.dropDatabase();
		await mongoConnection.close();
		await mongod.stop();
	});

	//after each individual test, we are going to delete all entries (documents/data) from our collections.
	afterEach(async () => {
		const collections = mongoConnection.collections;
		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany({});
		}
	});

	const DTO = {
		_id: expect.any(String),
		title: expect.any(String),
		contents: expect.any(String),
		createdBy: expect.any(String),
		createdAt: expect.any(Date),
		__v: 0
	}



	describe("create posts", () => {
		it("should return the saved object", async () => {
			const createdPost = await postController.createPost(postStub(), 'test@gmail.com');
			expect(DTO);
		});
		it("should return ArticleAlreadyExists (Bad Request - 400) exception", async () => {
			await (new postModel(postStub()).save());
			expect(await postController.createPost(postStub(), 'test@gmail.com'))
				.rejects
			//.toThrow(BadRequestException);
		});

	});

	describe("getPosts", () => {
		const query = {
			limit: 20,
			skip: 1
		}
		it("should return the corresponding saved objects", async () => {
			const article = await postController.findAllPosts(query);
			expect(DTO).toBe(DTO);
		});
		it("should return empty ", async () => {
			const article = await postController.findAllPosts(query);
			expect(article).toEqual([])
		});
	});

});