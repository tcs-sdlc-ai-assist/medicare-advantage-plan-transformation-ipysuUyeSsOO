import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * TeamChatSim.jsx
 * Simulated team communication UI (mocked).
 * Used in CareTeam page.
 * @param {Object} props
 * @param {Array<Object>} props.messages - Array of team messages.
 * @param {Array<string>} props.participants - Array of participant names.
 * @param {string} props.currentUser - Current user's display name.
 */
function TeamChatSim({
  messages = [],
  participants = [],
  currentUser = 'You',
}) {
  const [chatMessages, setChatMessages] = useState(messages);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSend = async e => {
    e.preventDefault();
    setSendError('');
    setSending(true);
    try {
      if (!newMessage.trim()) {
        setSendError('Message cannot be empty.');
        setSending(false);
        return;
      }
      // Simulate async send
      await new Promise(resolve => setTimeout(resolve, 500));
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: currentUser,
          message: newMessage,
          date: new Date().toISOString().slice(0, 10),
        },
      ]);
      setNewMessage('');
      setSending(false);
    } catch (err) {
      setSendError('Failed to send message. Please try again.');
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h3 className="text-lg font-medium text-blue-600 mb-2">Team Chat</h3>
      <div className="mb-2 text-gray-700 text-sm">
        Communicate with your care team members. All messages are simulated for demo purposes.
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          <span className="font-semibold text-gray-700 text-xs">Participants:</span>
          {participants.length === 0 ? (
            <span className="text-gray-500 text-xs">No participants.</span>
          ) : (
            participants.map(name => (
              <span
                key={name}
                className={`px-3 py-1 rounded text-xs font-semibold ${
                  name === currentUser
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {name}
              </span>
            ))
          )}
        </div>
      </div>
      <div className="h-48 overflow-y-auto border rounded mb-4 bg-gray-50 p-3">
        {chatMessages.length === 0 ? (
          <div className="text-gray-500 text-sm">No messages yet.</div>
        ) : (
          <ul className="space-y-2">
            {chatMessages.map(msg => (
              <li
                key={msg.id}
                className={`flex items-start ${
                  msg.sender === currentUser ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded shadow-sm ${
                    msg.sender === currentUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">
                    {msg.sender}
                    <span className="ml-2 text-xs text-gray-300">
                      {msg.date}
                    </span>
                  </div>
                  <div className="text-sm">{msg.message}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleSend} className="flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          disabled={sending}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold text-sm transition-colors ${
            sending ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          disabled={sending}
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
      {sendError && (
        <div className="text-red-600 text-sm mt-2">{sendError}</div>
      )}
      <div className="mt-4 text-gray-500 text-xs">
        Messages are not persisted and are for demonstration only.
      </div>
    </div>
  );
}

TeamChatSim.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      sender: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ),
  participants: PropTypes.arrayOf(PropTypes.string),
  currentUser: PropTypes.string,
};

export default TeamChatSim;