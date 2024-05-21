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
  followUser: async (_, { input }) => {
    const { userId, targetUserId } = input;

    // Add targetUserId to the user's following list
    const user = await User.findByIdAndUpdate(userId, {
      $addToSet: { following: targetUserId }
    }, { new: true }).populate('following');

    // Add userId to the target user's followers list
    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: userId }
    });

    return user;
  },
  unfollowUser: async (_, { input }) => {
    const { userId, targetUserId } = input;

    // Remove targetUserId from the user's following list
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { following: targetUserId }
    }, { new: true }).populate('following');

    // Remove userId from the target user's followers list
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: userId }
    });

    return user;
  },
};

export default updateMutations;