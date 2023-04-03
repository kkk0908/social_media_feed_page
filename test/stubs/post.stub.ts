// return every time new data

import { Posts } from "src/posts/entities/post.entity";

export const postStub = (): Posts => {
	return {
		title: "Tet1234",
		contents: "Testing data",
		createdAt: new Date(),
		createdBy: "satish@gmail.com",
		updateAt: new Date()
	}
}