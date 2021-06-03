import Post from "src/models/post.entity";

export interface GetPosts extends Post {

  likeCount?: number;

  hateCount?: number;
}

export interface GetPost extends GetPosts {

  isExistLike?: boolean;

  isExistHate?: boolean;
}