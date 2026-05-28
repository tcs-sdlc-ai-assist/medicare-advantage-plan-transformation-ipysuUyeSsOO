import React from 'react';
import PropTypes from 'prop-types';

/**
 * TaskList.jsx
 * Displays care coordination tasks (mocked).
 * Used in CareTeam and Dashboard pages.
 * @param {Object} props
 * @param {Array<Object>} props.tasks - Array of task objects.
 * @param {string} [props.title] - Optional section title.
 */
function TaskList({ tasks = [], title = 'Care Coordination Tasks' }) {
  return (
    <div>
      {title && (
        <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      )}
      {tasks.length === 0 ? (
        <div className="text-gray-500 text-sm">No tasks assigned.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map(task => (
            <li key={task.id} className="py-2 flex items-center justify-between">
              <div>
                <span className="font-semibold text-gray-700">{task.title}</span>
                {task.assignedTo && (
                  <span className="ml-2 text-blue-600 text-sm">{task.assignedTo}</span>
                )}
              </div>
              <span className={`text-xs font-semibold rounded px-2 py-1 ${
                task.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : task.status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      assignedTo: PropTypes.string,
      status: PropTypes.oneOf(['Pending', 'Completed', 'Failed']).isRequired,
    })
  ),
  title: PropTypes.string,
};

export default TaskList;