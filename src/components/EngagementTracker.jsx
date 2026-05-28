import React from 'react';
import PropTypes from 'prop-types';

/**
 * EngagementTracker.jsx
 * Tracks and displays member engagement metrics (mocked).
 * Used in Dashboard and OutcomeDashboard pages.
 * @param {Object} props
 * @param {Object} props.metrics - Engagement metrics: { visits, messages, reports, tasks, logins }
 * @param {string} [props.title] - Optional section title.
 * @param {string} [props.description] - Optional description.
 */
function EngagementTracker({
  metrics = {},
  title = 'Engagement Tracker',
  description = '',
}) {
  const {
    visits = 0,
    messages = 0,
    reports = 0,
    tasks = 0,
    logins = 0,
  } = metrics;

  const items = [
    {
      label: 'Visits',
      value: visits,
      icon: '👁️',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Messages',
      value: messages,
      icon: '💬',
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Reports',
      value: reports,
      icon: '📄',
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      label: 'Tasks',
      value: tasks,
      icon: '📝',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      label: 'Logins',
      value: logins,
      icon: '🔑',
      color: 'text-gray-600 bg-gray-100',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      {title && (
        <h3 className="text-lg font-medium text-blue-600 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-700 mb-4">{description}</p>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map(item => (
          <div
            key={item.label}
            className={`flex flex-col items-center rounded p-4 shadow-sm ${item.color}`}
          >
            <span className="text-2xl mb-2">{item.icon}</span>
            <span className="text-xl font-bold">{item.value}</span>
            <span className="text-xs text-gray-600 mt-1">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-gray-500 text-xs">
        Engagement metrics are simulated for demonstration purposes. No real activity is tracked.
      </div>
    </div>
  );
}

EngagementTracker.propTypes = {
  metrics: PropTypes.shape({
    visits: PropTypes.number,
    messages: PropTypes.number,
    reports: PropTypes.number,
    tasks: PropTypes.number,
    logins: PropTypes.number,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
};

export default EngagementTracker;