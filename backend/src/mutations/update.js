import { Comment, Post, User } from '../../api/models/index.js';

const updateMutations = {
  updateUser: async (_, { userId, input }) => {
    return await User.findByIdAndUpdate(userId, input, { new: true });
  },
  updatePost: async (_, { postId, input }) => {
    return await Post.findByIdAndUpdate(postId, input, { new: true });
  },
  updateComment: async (_, { commentId, input }) => {
    return await Comment.findByIdAndUpdate(commentId, input, { new: true });
  },
};

export default updateMutations;