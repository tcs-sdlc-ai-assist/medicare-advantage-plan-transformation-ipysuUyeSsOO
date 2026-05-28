import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * CareTeamRoster.jsx
 * Displays care team assignments and allows (mocked) assignment.
 * Used in CareTeam page.
 * @param {Object} props
 * @param {Array<Object>} props.team - Array of care team members.
 * @param {Array<Object>} props.providers - Array of available providers for assignment.
 * @param {Function} props.onAssign - Handler for assigning a provider (role, providerName).
 */
function CareTeamRoster({ team = [], providers = [], onAssign }) {
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [assignError, setAssignError] = useState('');

  const handleAssignProvider = e => {
    e.preventDefault();
    setAssignError('');
    if (!selectedRole || !selectedProvider) {
      setAssignError('Role and provider are required.');
      return;
    }
    if (typeof onAssign === 'function') {
      onAssign(selectedRole, selectedProvider);
    }
    setAssignModalOpen(false);
    setSelectedRole('');
    setSelectedProvider('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-700">Care Team Roster</h3>
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
          onClick={() => setAssignModalOpen(true)}
        >
          Assign Provider
        </button>
      </div>
      {team.length === 0 ? (
        <div className="text-gray-500 text-sm">No care team assigned.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {team.map((member, idx) => (
            <li key={idx} className="py-2 flex items-center justify-between">
              <div>
                <span className="font-semibold text-blue-700">{member.role}</span>
                <span className="ml-2 text-gray-700">{member.provider}</span>
              </div>
              <div className="text-gray-500 text-sm">{member.contact}</div>
            </li>
          ))}
        </ul>
      )}
      {assignModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h4 className="text-lg font-semibold text-blue-600 mb-4">Assign Provider</h4>
            <form onSubmit={handleAssignProvider} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="role">
                  Role
                </label>
                <select
                  id="role"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value)}
                >
                  <option value="">Select role</option>
                  <option value="Primary Care">Primary Care</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="provider">
                  Provider
                </label>
                <select
                  id="provider"
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={selectedProvider}
                  onChange={e => setSelectedProvider(e.target.value)}
                >
                  <option value="">Select provider</option>
                  {providers.map(p => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.specialty})
                    </option>
                  ))}
                </select>
              </div>
              {assignError && (
                <div className="text-red-600 text-sm">{assignError}</div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setAssignModalOpen(false);
                    setAssignError('');
                    setSelectedRole('');
                    setSelectedProvider('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

CareTeamRoster.propTypes = {
  team: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      contact: PropTypes.string.isRequired,
    })
  ),
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      phone: PropTypes.string,
      address: PropTypes.string,
      network: PropTypes.string,
    })
  ),
  onAssign: PropTypes.func,
};

export default CareTeamRoster;