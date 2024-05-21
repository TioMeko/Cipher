import { Comment, Post, User } from '../../api/models/index.js';

const deleteMutations = {
  deleteUser: async (_, { userId }) => {
    const user = await User.findById(userId);

    if (user) {
      // Find all posts created by the user
      const posts = await Post.find({ user: userId });

      // Delete all posts created by the user
      await Post.deleteMany({ user: userId });

      // Find all comments made by the user
      const comments = await Comment.find({ user: userId });

      // Collect all comment IDs
      const commentIds = comments.map((comment) => comment._id);

      // Delete all comments made by the user
      await Comment.deleteMany({ user: userId });

      // Remove references to these comments from the associated posts
      await Post.updateMany(
        { comments: { $in: commentIds } },
        { $pull: { comments: { $in: commentIds } } }
      );

      // Remove references to these comments from the associated users
      await User.updateMany(
        { comments: { $in: commentIds } },
        { $pull: { comments: { $in: commentIds } } }
      );

      // Finally, delete the user
      await User.findByIdAndDelete(userId);

      return true;
    }
    return false;
  },
  deletePost: async (_, { postId }) => {
    const post = await Post.findById(postId);

    if (post) {
      // Find all comments associated with the post
      const comments = await Comment.find({ post: postId });
      const commentIds = comments.map((comment) => comment._id);

      // Delete all comments associated with the post
      await Comment.deleteMany({ post: postId });

      // Remove the post reference from the user's posts array
      await User.findByIdAndUpdate(post.user, {
        $pull: { posts: postId },
      });

      // Remove the comment references from users' comments arrays
      await User.updateMany(
        { _id: { $in: comments.map((comment) => comment.user) } },
        { $pull: { comments: { $in: commentIds } } }
      );

      // Finally, delete the post
      await Post.findByIdAndDelete(postId);

      return true;
    }
    return false;
  },
  deleteComment: async (_, { commentId }) => {
    const comment = await Comment.findByIdAndDelete(commentId);

    if (comment) {
      // Find comment associated with user and delete it
      await User.findByIdAndUpdate(comment.user, {
        $pull: { comments: commentId },
      });
      // Find comment associated with post and delete it
      await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: commentId },
      });

      return true;
    }

    return false;
  },
};

export default deleteMutations;
