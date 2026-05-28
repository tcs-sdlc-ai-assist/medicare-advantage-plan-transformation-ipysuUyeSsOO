import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import mockDataFactory from '../utils/mockDataFactory';

/**
 * CareTeam.jsx
 * Care team management module.
 * View/assign care team, tasks, and team communications (mocked).
 */
function CareTeam() {
  const { user } = useContext(AppContext);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [assignError, setAssignError] = useState('');
  const [team, setTeam] = useState(() => {
    // Find member by username (matches mock member id)
    const members = mockDataFactory.getMockMembers();
    const member = members.find(
      m => m.name.toLowerCase().includes(user?.displayName?.toLowerCase() || '')
    );
    return member ? mockDataFactory.getMockCareTeam(member.id) : [];
  });

  // Demo: Providers for assignment
  const providers = mockDataFactory.getMockProviders();

  // Demo: Team tasks (mocked)
  const tasks = [
    { id: 1, title: 'Schedule follow-up appointment', assignedTo: 'Dr. Alice Smith', status: 'Pending' },
    { id: 2, title: 'Review lab results', assignedTo: 'Dr. Brian Lee', status: 'Completed' },
    { id: 3, title: 'Update care plan', assignedTo: 'Dr. Priya Patel', status: 'Pending' },
  ];

  // Demo: Team communications (mocked)
  const communications = [
    {
      id: 1,
      sender: 'Dr. Alice Smith',
      message: 'Annual wellness visit scheduled for next week.',
      date: '2024-06-01',
    },
    {
      id: 2,
      sender: 'Dr. Brian Lee',
      message: 'Cardiology report uploaded.',
      date: '2024-05-28',
    },
    {
      id: 3,
      sender: 'Member',
      message: 'Requested prescription refill.',
      date: '2024-05-25',
    },
  ];

  const handleAssignProvider = e => {
    e.preventDefault();
    setAssignError('');
    if (!selectedRole || !selectedProvider) {
      setAssignError('Role and provider are required.');
      return;
    }
    // Add to team (mock, no backend)
    setTeam(prev =>
      [...prev, {
        role: selectedRole,
        provider: selectedProvider,
        contact: providers.find(p => p.name === selectedProvider)?.phone || '',
      }]
    );
    setAssignModalOpen(false);
    setSelectedRole('');
    setSelectedProvider('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Care Team Management
        </h2>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-700">Your Care Team</h3>
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
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Team Tasks</h3>
          <ul className="divide-y divide-gray-200">
            {tasks.map(task => (
              <li key={task.id} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-gray-700">{task.title}</span>
                  <span className="ml-2 text-blue-600 text-sm">{task.assignedTo}</span>
                </div>
                <span className={`text-xs font-semibold rounded px-2 py-1 ${
                  task.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Team Communications</h3>
          <ul className="divide-y divide-gray-200">
            {communications.map(comm => (
              <li key={comm.id} className="py-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-700">{comm.sender}</span>
                  <span className="text-xs text-gray-400">{comm.date}</span>
                </div>
                <div className="text-gray-700">{comm.message}</div>
              </li>
            ))}
          </ul>
        </div>
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
    </div>
  );
}

CareTeam.propTypes = {};

export default CareTeam;