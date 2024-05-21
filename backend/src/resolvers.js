import { Comment, Post, User } from '../api/models/index.js';
import { createMutations, deleteMutations, updateMutations } from './mutations/index.js'

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      return await User.findById(userId).select('-password').populate([
        { path: 'posts' },
        { path: 'comments', populate: { path: 'post' } },
        { path: 'followers' },
        { path: 'following' },
      ]);
    },
    getAllUsers: async () => {
      return await User.find({}).select('-password').populate([
        { path: 'posts' },
        { path: 'comments', populate: { path: 'post' } },
        { path: 'followers' },
        { path: 'following' },
      ]);
    },
  },

  Mutation: {
    ...createMutations,
    ...updateMutations,
    ...deleteMutations
  },
};

export default resolvers;
