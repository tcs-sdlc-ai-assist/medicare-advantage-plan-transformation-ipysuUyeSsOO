import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import mockDataFactory from '../utils/mockDataFactory';

/**
 * ProviderNetwork.jsx
 * Provider network directory and partnerships (mocked).
 * Members can select/assign providers.
 */
function ProviderNetwork() {
  const { user } = useContext(AppContext);

  // Mocked provider data
  const providers = mockDataFactory.getMockProviders();

  // Demo: Member's assigned providers (mocked, based on care team)
  const members = mockDataFactory.getMockMembers();
  const member = members.find(
    m => m.name.toLowerCase().includes(user?.displayName?.toLowerCase() || '')
  );
  const assignedProviders = member
    ? mockDataFactory.getMockCareTeam(member.id).map(team => team.provider)
    : [];

  // Provider selection state
  const [selectedProviderId, setSelectedProviderId] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [assignSuccess, setAssignSuccess] = useState('');
  const [assigned, setAssigned] = useState(assignedProviders);

  // Partnership info (mocked)
  const partnerships = [
    {
      id: 'pn1',
      name: 'Springfield Health Partners',
      description: 'Integrated care network for Medicare Advantage members.',
      providers: ['Dr. Alice Smith', 'Dr. Brian Lee'],
    },
    {
      id: 'pn2',
      name: 'Shelbyville Medical Group',
      description: 'Specialty and primary care for Shelbyville area.',
      providers: ['Dr. Brian Lee', 'Dr. Priya Patel'],
    },
    {
      id: 'pn3',
      name: 'Capital City Wellness',
      description: 'Comprehensive wellness and preventive services.',
      providers: ['Dr. Alice Smith', 'Dr. Priya Patel'],
    },
  ];

  // Handle provider assignment
  const handleAssignProvider = async e => {
    e.preventDefault();
    setAssignError('');
    setAssignSuccess('');
    setAssigning(true);
    try {
      if (!selectedProviderId) {
        setAssignError('Please select a provider to assign.');
        setAssigning(false);
        return;
      }
      const provider = providers.find(p => p.id === selectedProviderId);
      if (!provider) {
        setAssignError('Provider not found.');
        setAssigning(false);
        return;
      }
      if (assigned.includes(provider.name)) {
        setAssignError('Provider already assigned.');
        setAssigning(false);
        return;
      }
      // Simulate async assignment
      await new Promise(resolve => setTimeout(resolve, 700));
      setAssigned(prev => [...prev, provider.name]);
      setAssignSuccess(`Provider ${provider.name} assigned successfully.`);
      setAssigning(false);
    } catch (err) {
      setAssignError('Failed to assign provider. Please try again.');
      setAssigning(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Provider Network Directory
        </h2>
        <p className="text-gray-700 mb-6">
          Browse the Medicare Advantage provider network and partnerships. Assign providers to your care team for personalized care coordination. All data is demo/mock for simulation.
        </p>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Provider Directory</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-3 text-xs font-semibold text-gray-600">Name</th>
                  <th className="py-2 px-3 text-xs font-semibold text-gray-600">Specialty</th>
                  <th className="py-2 px-3 text-xs font-semibold text-gray-600">Phone</th>
                  <th className="py-2 px-3 text-xs font-semibold text-gray-600">Address</th>
                  <th className="py-2 px-3 text-xs font-semibold text-gray-600">Network</th>
                </tr>
              </thead>
              <tbody>
                {providers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-gray-500 text-sm">
                      No providers found.
                    </td>
                  </tr>
                ) : (
                  providers.map(provider => (
                    <tr key={provider.id} className="hover:bg-blue-50 transition-colors">
                      <td className="py-2 px-3 text-sm font-semibold text-blue-700">{provider.name}</td>
                      <td className="py-2 px-3 text-sm text-gray-600">{provider.specialty}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{provider.phone}</td>
                      <td className="py-2 px-3 text-sm text-gray-700">{provider.address}</td>
                      <td className="py-2 px-3 text-sm text-gray-600">{provider.network}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Network Partnerships</h3>
          <ul className="divide-y divide-gray-200">
            {partnerships.map(partner => (
              <li key={partner.id} className="py-3">
                <div className="font-semibold text-blue-700">{partner.name}</div>
                <div className="text-gray-700 text-sm mb-1">{partner.description}</div>
                <div className="text-xs text-gray-500">
                  Providers: {partner.providers.join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Assign Provider to Care Team</h3>
          <form onSubmit={handleAssignProvider} className="flex items-center gap-4 mb-3">
            <select
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={selectedProviderId}
              onChange={e => setSelectedProviderId(e.target.value)}
              disabled={assigning}
            >
              <option value="">Select provider</option>
              {providers.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name} ({provider.specialty})
                </option>
              ))}
            </select>
            <button
              type="submit"
              className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold transition-colors ${
                assigning ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={assigning}
            >
              {assigning ? 'Assigning...' : 'Assign'}
            </button>
          </form>
          {assignError && (
            <div className="text-red-600 text-sm mb-2">{assignError}</div>
          )}
          {assignSuccess && (
            <div className="text-green-600 text-sm mb-2">{assignSuccess}</div>
          )}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Assigned Providers</h4>
            {assigned.length === 0 ? (
              <div className="text-gray-500 text-xs">No providers assigned.</div>
            ) : (
              <ul className="flex flex-wrap gap-2">
                {assigned.map(name => (
                  <li
                    key={name}
                    className="px-3 py-1 rounded bg-green-100 text-green-700 font-semibold text-xs"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="text-gray-500 text-xs">
          Provider network and assignments are simulated for demonstration purposes. No real provider selection or care team changes occur.
        </div>
      </div>
    </div>
  );
}

ProviderNetwork.propTypes = {};

export default ProviderNetwork;