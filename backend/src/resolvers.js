import { Comment, Post, User } from '../api/models/index.js';
import { createMutations, deleteMutations } from './mutations/index.js'

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      return await User.findById(userId).select('-password').populate([
        { path: 'posts' },
        { path: 'comments', populate: { path: 'post' } },
      ]);
    },
    getAllUsers: async () => {
      return await User.find({}).select('-password').populate([
        { path: 'posts' },
        { path: 'comments', populate: { path: 'post' } },
      ]);
    },
  },

  Mutation: {
    ...createMutations,
    ...deleteMutations
  },
};

export default resolvers;
