import React from 'react';
import PropTypes from 'prop-types';

/**
 * ApplicationChannelTabs.jsx
 * Tabs for switching between application intake channels.
 * Used in ApplicationIntake page.
 * @param {Object} props
 * @param {Array<Object>} props.channels - Array of channel objects { key, label, icon, description }
 * @param {string} props.selectedChannel - Currently selected channel key
 * @param {Function} props.onSelect - Handler for selecting a channel (channelKey)
 * @param {boolean} [props.disabled] - If true, disables tab switching
 */
function ApplicationChannelTabs({
  channels = [],
  selectedChannel = '',
  onSelect,
  disabled = false,
}) {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {channels.map(channel => (
        <button
          key={channel.key}
          className={`flex items-center gap-2 px-4 py-2 rounded font-semibold text-sm transition-colors border ${
            selectedChannel === channel.key
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-700'
          }`}
          onClick={() => !disabled && typeof onSelect === 'function' && onSelect(channel.key)}
          disabled={disabled}
          aria-selected={selectedChannel === channel.key}
          aria-label={channel.label}
          type="button"
        >
          {channel.icon && <span className="text-xl">{channel.icon}</span>}
          {channel.label}
        </button>
      ))}
    </div>
  );
}

ApplicationChannelTabs.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
      description: PropTypes.string,
    })
  ).isRequired,
  selectedChannel: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ApplicationChannelTabs;