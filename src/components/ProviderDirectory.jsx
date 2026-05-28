import React from 'react';
import PropTypes from 'prop-types';

/**
 * ProviderDirectory.jsx
 * Displays provider network directory (mocked).
 * Used in ProviderNetwork page.
 * @param {Object} props
 * @param {Array<Object>} props.providers - Array of provider objects.
 */
function ProviderDirectory({ providers = [] }) {
  return (
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
  );
}

ProviderDirectory.propTypes = {
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
};

export default ProviderDirectory;