import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import mockDataFactory from '../utils/mockDataFactory';

/**
 * UnifiedPatientView.jsx
 * Unified patient profile. Integrates claims, EMR, pharmacy data (mocked).
 */
function UnifiedPatientView() {
  const { user } = useContext(AppContext);

  // Demo: Get member data based on username (matches mock member id)
  const members = mockDataFactory.getMockMembers();
  const member = members.find(
    m => m.name.toLowerCase().includes(user?.displayName?.toLowerCase() || '')
  );

  // Mocked claims data
  const [claims] = useState(
    member
      ? [
          {
            id: 'C001',
            date: '2024-05-15',
            provider: 'Dr. Alice Smith',
            type: 'Office Visit',
            amount: '$120',
            status: 'Processed',
            diagnosis: 'Routine checkup',
          },
          {
            id: 'C002',
            date: '2024-04-28',
            provider: 'Dr. Brian Lee',
            type: 'Specialist Visit',
            amount: '$220',
            status: 'Processed',
            diagnosis: 'Cardiology consult',
          },
          {
            id: 'C003',
            date: '2024-03-10',
            provider: 'LabCorp',
            type: 'Lab Test',
            amount: '$80',
            status: 'Pending',
            diagnosis: 'Blood panel',
          },
        ]
      : []
  );

  // Mocked EMR data
  const [emr] = useState(
    member
      ? [
          {
            id: 'E001',
            date: '2024-05-15',
            provider: 'Dr. Alice Smith',
            summary: 'Annual wellness visit. Vitals normal.',
            allergies: ['Penicillin'],
            conditions: ['Hypertension'],
            notes: 'Recommended regular exercise.',
          },
          {
            id: 'E002',
            date: '2024-04-28',
            provider: 'Dr. Brian Lee',
            summary: 'Cardiology consult. EKG normal.',
            allergies: [],
            conditions: ['Hypertension'],
            notes: 'Continue current medication.',
          },
        ]
      : []
  );

  // Mocked pharmacy data
  const [pharmacy] = useState(
    member
      ? [
          {
            id: 'P001',
            date: '2024-06-01',
            medication: 'Atorvastatin',
            dosage: '20mg',
            frequency: 'Once daily',
            status: 'Active',
            refillDue: '2024-06-15',
            pharmacy: 'Springfield Pharmacy',
          },
          {
            id: 'P002',
            date: '2024-05-20',
            medication: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            status: 'Active',
            refillDue: '2024-06-20',
            pharmacy: 'Springfield Pharmacy',
          },
        ]
      : []
  );

  // Loading/error states (mocked, always loaded)
  const [loading] = useState(false);
  const [error] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Unified Patient Profile
        </h2>
        <p className="text-gray-700 mb-6">
          View integrated patient data including claims, EMR, and pharmacy information. All data is demo/mock for simulation.
        </p>
        {loading ? (
          <div className="text-blue-600 text-center py-8">Loading patient data...</div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">{error}</div>
        ) : !member ? (
          <div className="text-gray-500 text-center py-8">
            No patient profile found. Please log in as a member.
          </div>
        ) : (
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
                            {record.allergies.length > 0 ? record.allergies.join(', ') : 'None'}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700 text-xs">Conditions:</span>
                          <span className="ml-1 text-gray-600 text-xs">
                            {record.conditions.length > 0 ? record.conditions.join(', ') : 'None'}
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
        )}
      </div>
    </div>
  );
}

UnifiedPatientView.propTypes = {};

export default UnifiedPatientView;