import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

/**
 * SocialFeed.jsx
 * Social/community feed. Members can post, message, and join groups (mocked).
 */
function SocialFeed() {
  const { user } = useContext(AppContext);

  // Mocked posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Jane Smith',
      content: 'Excited to join the Wellness Group! Anyone else?',
      date: '2024-06-01',
      group: 'Wellness Group',
      comments: [
        { id: 1, author: 'John Doe', content: 'Welcome, Jane!', date: '2024-06-01' },
        { id: 2, author: 'Robert Lee', content: 'Glad to have you!', date: '2024-06-02' },
      ],
    },
    {
      id: 2,
      author: 'John Doe',
      content: 'Does anyone have tips for managing blood pressure?',
      date: '2024-06-03',
      group: 'Health Tips',
      comments: [
        { id: 3, author: 'Jane Smith', content: 'Try regular walks!', date: '2024-06-03' },
      ],
    },
  ]);

  // Mocked groups
  const groups = [
    { id: 'g1', name: 'Wellness Group', description: 'Share wellness tips and support.' },
    { id: 'g2', name: 'Health Tips', description: 'Discuss health tips and advice.' },
    { id: 'g3', name: 'Prescription Support', description: 'Help with prescriptions and refills.' },
  ];

  // Mocked joined groups
  const [joinedGroups, setJoinedGroups] = useState(['Wellness Group']);

  // New post state
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostGroup, setNewPostGroup] = useState(joinedGroups[0] || '');
  const [postError, setPostError] = useState('');
  const [posting, setPosting] = useState(false);

  // New comment state
  const [commentContent, setCommentContent] = useState({});
  const [commentError, setCommentError] = useState({});
  const [commenting, setCommenting] = useState({});

  // Message modal state
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messageError, setMessageError] = useState('');
  const [messaging, setMessaging] = useState(false);

  // Join group state
  const [joinGroupError, setJoinGroupError] = useState('');

  // Handle new post
  const handlePostSubmit = async e => {
    e.preventDefault();
    setPostError('');
    setPosting(true);
    try {
      if (!newPostContent.trim() || !newPostGroup) {
        setPostError('Post content and group are required.');
        setPosting(false);
        return;
      }
      // Add post (mock)
      setPosts(prev => [
        {
          id: Date.now(),
          author: user?.displayName || 'Anonymous',
          content: newPostContent,
          date: new Date().toISOString().slice(0, 10),
          group: newPostGroup,
          comments: [],
        },
        ...prev,
      ]);
      setNewPostContent('');
      setPosting(false);
    } catch (err) {
      setPostError('Failed to post. Please try again.');
      setPosting(false);
    }
  };

  // Handle comment submit
  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    setCommentError(prev => ({ ...prev, [postId]: '' }));
    setCommenting(prev => ({ ...prev, [postId]: true }));
    try {
      const content = commentContent[postId];
      if (!content || !content.trim()) {
        setCommentError(prev => ({ ...prev, [postId]: 'Comment cannot be empty.' }));
        setCommenting(prev => ({ ...prev, [postId]: false }));
        return;
      }
      setPosts(prev =>
        prev.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: Date.now(),
                    author: user?.displayName || 'Anonymous',
                    content,
                    date: new Date().toISOString().slice(0, 10),
                  },
                ],
              }
            : post
        )
      );
      setCommentContent(prev => ({ ...prev, [postId]: '' }));
      setCommenting(prev => ({ ...prev, [postId]: false }));
    } catch (err) {
      setCommentError(prev => ({ ...prev, [postId]: 'Failed to comment. Please try again.' }));
      setCommenting(prev => ({ ...prev, [postId]: false }));
    }
  };

  // Handle join group
  const handleJoinGroup = groupName => {
    setJoinGroupError('');
    if (joinedGroups.includes(groupName)) {
      setJoinGroupError('Already joined this group.');
      return;
    }
    setJoinedGroups(prev => [...prev, groupName]);
    setNewPostGroup(groupName);
  };

  // Handle send message
  const handleSendMessage = async e => {
    e.preventDefault();
    setMessageError('');
    setMessaging(true);
    try {
      if (!messageRecipient || !messageContent.trim()) {
        setMessageError('Recipient and message are required.');
        setMessaging(false);
        return;
      }
      // Mock: just close modal and clear fields
      setMessageModalOpen(false);
      setMessageRecipient('');
      setMessageContent('');
      setMessaging(false);
    } catch (err) {
      setMessageError('Failed to send message. Please try again.');
      setMessaging(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Social & Community Feed
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your Groups</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {joinedGroups.length === 0 ? (
              <span className="text-gray-500 text-sm">You have not joined any groups.</span>
            ) : (
              joinedGroups.map(group => (
                <span
                  key={group}
                  className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-semibold text-xs"
                >
                  {group}
                </span>
              ))
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {groups
              .filter(g => !joinedGroups.includes(g.name))
              .map(g => (
                <button
                  key={g.id}
                  className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold text-xs hover:bg-green-200 transition-colors"
                  onClick={() => handleJoinGroup(g.name)}
                >
                  Join {g.name}
                </button>
              ))}
          </div>
          {joinGroupError && (
            <div className="text-red-600 text-sm mt-2">{joinGroupError}</div>
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Create a Post</h3>
          <form onSubmit={handlePostSubmit} className="space-y-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="post-group">
                Group
              </label>
              <select
                id="post-group"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={newPostGroup}
                onChange={e => setNewPostGroup(e.target.value)}
                disabled={posting}
              >
                <option value="">Select group</option>
                {joinedGroups.map(group => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="post-content">
                Content
              </label>
              <textarea
                id="post-content"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows={3}
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                disabled={posting}
              />
            </div>
            {postError && (
              <div className="text-red-600 text-sm">{postError}</div>
            )}
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold transition-colors ${
                posting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={posting}
            >
              {posting ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Feed</h3>
          {posts.length === 0 ? (
            <div className="text-gray-500 text-sm">No posts yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {posts.map(post => (
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
                    <button
                      className="px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        setMessageModalOpen(true);
                        setMessageRecipient(post.author);
                      }}
                    >
                      Message {post.author}
                    </button>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Comments</h4>
                    <ul className="space-y-1 mb-2">
                      {post.comments.length === 0 ? (
                        <li className="text-gray-500 text-xs">No comments yet.</li>
                      ) : (
                        post.comments.map(comment => (
                          <li key={comment.id} className="flex items-center justify-between">
                            <span className="text-blue-700 font-semibold text-xs">{comment.author}</span>
                            <span className="text-gray-700 text-xs">{comment.content}</span>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </li>
                        ))
                      )}
                    </ul>
                    <form
                      onSubmit={e => handleCommentSubmit(post.id, e)}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        className="flex-1 px-2 py-1 border rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Add a comment..."
                        value={commentContent[post.id] || ''}
                        onChange={e =>
                          setCommentContent(prev => ({
                            ...prev,
                            [post.id]: e.target.value,
                          }))
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
                    {commentError[post.id] && (
                      <div className="text-red-600 text-xs mt-1">{commentError[post.id]}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {messageModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h4 className="text-lg font-semibold text-blue-600 mb-4">Send Message</h4>
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="recipient">
                    Recipient
                  </label>
                  <input
                    id="recipient"
                    type="text"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    value={messageRecipient}
                    onChange={e => setMessageRecipient(e.target.value)}
                    disabled={messaging}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1" htmlFor="message-content">
                    Message
                  </label>
                  <textarea
                    id="message-content"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                    rows={3}
                    value={messageContent}
                    onChange={e => setMessageContent(e.target.value)}
                    disabled={messaging}
                  />
                </div>
                {messageError && (
                  <div className="text-red-600 text-sm">{messageError}</div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                    onClick={() => {
                      setMessageModalOpen(false);
                      setMessageError('');
                      setMessageRecipient('');
                      setMessageContent('');
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold transition-colors ${
                      messaging ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
                    }`}
                    disabled={messaging}
                  >
                    {messaging ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

SocialFeed.propTypes = {};

export default SocialFeed;