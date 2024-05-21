import { Comment, Post, User } from '../../api/models/index.js';
import bcrypt from 'bcrypt';

const createMutations = {
  createUser: async (_, { input }) => {
    const { username, email, password } = input;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return await newUser.save();
  },
  createPost: async (_, { input }) => {
    const newPost = new Post({
      user: input.userId,
      content: input.content,
    });
    await newPost.save();

    // Update the user's posts array
    await User.findByIdAndUpdate(input.userId, {
      $push: { posts: newPost._id },
    });

    return newPost;
  },
  createComment: async (_, { input }) => {
    const newComment = new Comment({
      user: input.userId,
      post: input.postId,
      content: input.content,
    });
    await newComment.save();

    // Update the user's comments array
    await User.findByIdAndUpdate(input.userId, {
      $push: { comments: newComment._id },
    });

    // Update the post's comments array
    await Post.findByIdAndUpdate(input.postId, {
      $push: { comments: newComment._id },
    });

    return newComment;
  },
};

export default createMutations;
