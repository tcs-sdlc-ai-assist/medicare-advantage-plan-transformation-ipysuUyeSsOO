import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

/**
 * AuditTrail.jsx
 * Audit trail UI. Shows all compliance/reporting actions (mocked, read-only).
 */
function AuditTrail() {
  const { user } = useContext(AppContext);

  // Mocked audit trail data
  const [auditTrail] = useState([
    {
      id: 1,
      action: 'Report Submitted',
      user: 'Jane Smith',
      role: 'member',
      date: '2024-06-03',
      details: 'Annual wellness report submitted.',
      status: 'Success',
    },
    {
      id: 2,
      action: 'Compliance Check',
      user: 'System',
      role: 'admin',
      date: '2024-06-03',
      details: 'HIPAA privacy check completed.',
      status: 'Compliant',
    },
    {
      id: 3,
      action: 'Report Submission',
      user: 'John Doe',
      role: 'member',
      date: '2024-06-02',
      details: 'CMS Q2 report submitted.',
      status: 'Pending',
    },
    {
      id: 4,
      action: 'Care Team Assignment',
      user: 'Robert Lee',
      role: 'member',
      date: '2024-06-01',
      details: 'Assigned Dr. Alice Smith to care team.',
      status: 'Success',
    },
    {
      id: 5,
      action: 'Data Validation',
      user: 'System',
      role: 'admin',
      date: '2024-05-30',
      details: 'Member records validated.',
      status: 'Compliant',
    },
    {
      id: 6,
      action: 'Audit Log Export',
      user: 'Priya Patel',
      role: 'provider',
      date: '2024-05-29',
      details: 'Exported audit log for review.',
      status: 'Success',
    },
    {
      id: 7,
      action: 'Prescription Refill',
      user: 'Jane Smith',
      role: 'member',
      date: '2024-05-28',
      details: 'Requested refill for Atorvastatin.',
      status: 'Success',
    },
    {
      id: 8,
      action: 'Compliance Check',
      user: 'System',
      role: 'admin',
      date: '2024-05-27',
      details: 'CMS submission check pending.',
      status: 'Pending',
    },
    {
      id: 9,
      action: 'Login',
      user: user?.displayName || 'You',
      role: user?.role || 'member',
      date: new Date().toISOString().slice(0, 10),
      details: 'User logged in.',
      status: 'Success',
    },
  ]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Audit Trail
        </h2>
        <p className="text-gray-700 mb-6">
          View all compliance and reporting actions. This audit trail is read-only and includes system and user events.
        </p>
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
              {auditTrail.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500 text-sm">
                    No audit trail records found.
                  </td>
                </tr>
              ) : (
                auditTrail.map(entry => (
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
        <div className="mt-6 text-gray-500 text-xs">
          Audit logs are retained for compliance and review purposes. No actions can be edited or deleted.
        </div>
      </div>
    </div>
  );
}

AuditTrail.propTypes = {};

export default AuditTrail;