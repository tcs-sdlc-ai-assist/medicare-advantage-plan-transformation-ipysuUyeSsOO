import React from 'react';
import PropTypes from 'prop-types';

/**
 * AuditTrailViewer.jsx
 * Displays audit trail logs in a table format (mocked).
 * Used in AuditTrail page.
 * @param {Object} props
 * @param {Array<Object>} props.logs - Array of audit trail log entries.
 */
function AuditTrailViewer({ logs }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-3 text-xs font-semibold text-gray-600">Date</th>
            <th className="py-2 px-3 text-xs font-semibold text-gray-600">User</th>
            <th className="py-2 px-3 text-xs font-semibold text-gray-600">Role</th>
            <th className="py-2 px-3 text-xs font-semibold text-gray-600">Action</th>
            <th className="py-2 px-3 text-xs font-semibold text-gray-600">Details</th>
            <th className="py-2 px-3 text-xs font-semibold text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-4 text-center text-gray-500 text-sm">
                No audit trail records found.
              </td>
            </tr>
          ) : (
            logs.map(entry => (
              <tr key={entry.id} className="hover:bg-blue-50 transition-colors">
                <td className="py-2 px-3 text-sm text-gray-700">{entry.date}</td>
                <td className="py-2 px-3 text-sm font-semibold text-blue-700">{entry.user}</td>
                <td className="py-2 px-3 text-sm text-gray-600">{entry.role.charAt(0).toUpperCase() + entry.role.slice(1)}</td>
                <td className="py-2 px-3 text-sm text-gray-700">{entry.action}</td>
                <td className="py-2 px-3 text-sm text-gray-600">{entry.details}</td>
                <td className="py-2 px-3 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    entry.status === 'Success'
                      ? 'bg-green-100 text-green-700'
                      : entry.status === 'Compliant'
                      ? 'bg-green-50 text-green-700'
                      : entry.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

AuditTrailViewer.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      action: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AuditTrailViewer;