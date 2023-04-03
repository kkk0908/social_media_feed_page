import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { v4 as uuidv4 } from 'uuid'

describe('PostsController', () => {
  let controller: PostsController;

  const mockPostsService = {
    createPost: jest.fn((dto) => {
      return {
        _id: uuidv4(),
        __v: 0,
        ...dto,
        createdAt: Date.now(),
        createdBy: expect.any(String)
      }
    }),

    updatePost: jest.fn((id, dto) => {
      return {
        _id: id,
        ...dto,
        createdAt: Date.now(),
        createdBy: expect.any(String),
        __v: 0,
      }
    })

  }



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    }).overrideProvider(PostsService)
      .useValue(mockPostsService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const DTO = {
    _id: expect.any(String),
    title: expect.any(String),
    contents: expect.any(String),
    createdBy: expect.any(String),
    createdAt: expect.any(Number),
    __v: 0
  }
  it('should create a post', async () => {
    expect(await controller.createPost({ title: "test", contents: "Testing contents" }, 'test@gmail.com'))
      .toEqual(DTO)
  })

  it('should update a post', async () => {
    expect(await controller.updatePost(uuidv4(), { title: "tobe update", contents: "testing updates" }))
      .toEqual(DTO)
  })


});
