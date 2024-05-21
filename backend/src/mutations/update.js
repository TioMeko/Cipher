import { Comment, Post, User } from '../../api/models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import "dotenv/config";

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
  login: async (_, { input }) => {
    const { email, password } = input;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Validate the password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user };
  }
};

export default updateMutations;