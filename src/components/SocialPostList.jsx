import React from 'react';
import PropTypes from 'prop-types';

/**
 * SocialPostList.jsx
 * Displays social/community posts (mocked).
 * Used in SocialFeed page.
 * @param {Object} props
 * @param {Array<Object>} props.posts - Array of post objects.
 * @param {Function} [props.onComment] - Handler for comment submission (postId, content).
 * @param {Object} [props.commentContent] - Current comment input values keyed by postId.
 * @param {Object} [props.commenting] - Loading state keyed by postId.
 * @param {Object} [props.commentError] - Error state keyed by postId.
 * @param {Function} [props.onMessage] - Handler for message button (author).
 */
function SocialPostList({
  posts = [],
  onComment,
  commentContent = {},
  commenting = {},
  commentError = {},
  onMessage,
}) {
  return (
    <ul className="divide-y divide-gray-200">
      {posts.length === 0 ? (
        <li className="text-gray-500 text-sm py-4 text-center">No posts yet.</li>
      ) : (
        posts.map(post => (
          <li key={post.id} className="py-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-blue-700">{post.author}</span>
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
            <div className="mb-2 text-gray-700">{post.content}</div>
            <div className="mb-2">
              <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs font-semibold">
                {post.group}
              </span>
            </div>
            <div className="mb-2">
              {typeof onMessage === 'function' && (
                <button
                  className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                  onClick={() => onMessage(post.author)}
                >
                  Message {post.author}
                </button>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Comments</h4>
              <ul className="space-y-1 mb-2">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map(comment => (
                    <li key={comment.id} className="flex items-center justify-between">
                      <span className="text-blue-700 font-semibold text-xs">{comment.author}</span>
                      <span className="text-gray-700 text-xs">{comment.content}</span>
                      <span className="text-xs text-gray-400">{comment.date}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 text-xs">No comments yet.</li>
                )}
              </ul>
              {typeof onComment === 'function' && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    onComment(post.id, commentContent[post.id] || '');
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    className="flex-1 px-2 py-1 border rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Add a comment..."
                    value={commentContent[post.id] || ''}
                    onChange={e =>
                      onComment(post.id, e.target.value, true)
                    }
                    disabled={commenting[post.id]}
                  />
                  <button
                    type="submit"
                    className={`px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold transition-colors ${
                      commenting[post.id] ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    disabled={commenting[post.id]}
                  >
                    {commenting[post.id] ? 'Posting...' : 'Comment'}
                  </button>
                </form>
              )}
              {commentError[post.id] && (
                <div className="text-red-600 text-xs mt-1">{commentError[post.id]}</div>
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

SocialPostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      group: PropTypes.string.isRequired,
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          author: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        })
      ),
    })
  ),
  onComment: PropTypes.func,
  commentContent: PropTypes.object,
  commenting: PropTypes.object,
  commentError: PropTypes.object,
  onMessage: PropTypes.func,
};

export default SocialPostList;