import React from 'react';
import PropTypes from 'prop-types';

/**
 * UnifiedPatientProfile.jsx
 * Displays unified patient data (claims, EMR, pharmacy; mocked).
 * Used in UnifiedPatientView page.
 * @param {Object} props
 * @param {Object} props.member - Patient demographic info.
 * @param {Array<Object>} props.claims - Claims history.
 * @param {Array<Object>} props.emr - EMR records.
 * @param {Array<Object>} props.pharmacy - Pharmacy records.
 * @param {boolean} [props.loading] - Loading state.
 * @param {string} [props.error] - Error message.
 */
function UnifiedPatientProfile({
  member,
  claims = [],
  emr = [],
  pharmacy = [],
  loading = false,
  error = '',
}) {
  if (loading) {
    return (
      <div className="text-blue-600 text-center py-8">Loading patient data...</div>
    );
  }
  if (error) {
    return (
      <div className="text-red-600 text-center py-8">{error}</div>
    );
  }
  if (!member) {
    return (
      <div className="text-gray-500 text-center py-8">
        No patient profile found. Please log in as a member.
      </div>
    );
  }
  return (
    <>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Patient Demographics</h3>
        <div className="grid grid-cols-2 gap-4 bg-blue-50 rounded p-4">
          <div>
            <div className="font-semibold text-blue-700">Name</div>
            <div className="text-gray-700">{member.name}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700">Date of Birth</div>
            <div className="text-gray-700">{member.dob}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700">Address</div>
            <div className="text-gray-700">{member.address}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700">Phone</div>
            <div className="text-gray-700">{member.phone}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700">Email</div>
            <div className="text-gray-700">{member.email}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700">Plan</div>
            <div className="text-gray-700">{member.plan}</div>
          </div>
          <div>
            <div className="font-semibold text-blue-700">Status</div>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${
              member.status === 'Active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {member.status}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Claims History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Date</th>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Provider</th>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Type</th>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Amount</th>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Status</th>
                <th className="py-2 px-3 text-xs font-semibold text-gray-600">Diagnosis</th>
              </tr>
            </thead>
            <tbody>
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500 text-sm">
                    No claims found.
                  </td>
                </tr>
              ) : (
                claims.map(claim => (
                  <tr key={claim.id} className="hover:bg-blue-50 transition-colors">
                    <td className="py-2 px-3 text-sm text-gray-700">{claim.date}</td>
                    <td className="py-2 px-3 text-sm text-blue-700 font-semibold">{claim.provider}</td>
                    <td className="py-2 px-3 text-sm text-gray-600">{claim.type}</td>
                    <td className="py-2 px-3 text-sm text-gray-700">{claim.amount}</td>
                    <td className="py-2 px-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        claim.status === 'Processed'
                          ? 'bg-green-100 text-green-700'
                          : claim.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-600">{claim.diagnosis}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-2">EMR (Electronic Medical Record)</h3>
        {emr.length === 0 ? (
          <div className="text-gray-500 text-sm">No EMR records found.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {emr.map(record => (
              <li key={record.id} className="py-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-blue-700">{record.provider}</span>
                  <span className="text-xs text-gray-400">{record.date}</span>
                </div>
                <div className="text-gray-700 mb-2">{record.summary}</div>
                <div className="flex flex-wrap gap-4 mb-2">
                  <div>
                    <span className="font-semibold text-gray-700 text-xs">Allergies:</span>
                    <span className="ml-1 text-gray-600 text-xs">
                      {record.allergies && record.allergies.length > 0 ? record.allergies.join(', ') : 'None'}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 text-xs">Conditions:</span>
                    <span className="ml-1 text-gray-600 text-xs">
                      {record.conditions && record.conditions.length > 0 ? record.conditions.join(', ') : 'None'}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 text-xs">{record.notes}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">Pharmacy</h3>
        {pharmacy.length === 0 ? (
          <div className="text-gray-500 text-sm">No pharmacy records found.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {pharmacy.map(rx => (
              <li key={rx.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-blue-700">{rx.medication}</div>
                  <div className="text-gray-700 text-xs">
                    {rx.dosage} &middot; {rx.frequency}
                  </div>
                  <div className="text-gray-500 text-xs">Pharmacy: {rx.pharmacy}</div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-xs font-semibold rounded px-2 py-1 ${
                    rx.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {rx.status}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    Refill due: {rx.refillDue}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6 text-gray-500 text-xs">
        All patient data is simulated for demonstration purposes. No real PHI/PII is shown.
      </div>
    </>
  );
}

UnifiedPatientProfile.propTypes = {
  member: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    ssn: PropTypes.string,
    address: PropTypes.string,
    dob: PropTypes.string,
    plan: PropTypes.string,
    status: PropTypes.string,
  }),
  claims: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      diagnosis: PropTypes.string.isRequired,
    })
  ),
  emr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      allergies: PropTypes.arrayOf(PropTypes.string),
      conditions: PropTypes.arrayOf(PropTypes.string),
      notes: PropTypes.string,
    })
  ),
  pharmacy: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      medication: PropTypes.string.isRequired,
      dosage: PropTypes.string.isRequired,
      frequency: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      refillDue: PropTypes.string.isRequired,
      pharmacy: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default UnifiedPatientProfile;