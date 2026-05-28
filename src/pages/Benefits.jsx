import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import mockDataFactory from '../utils/mockDataFactory';

/**
 * Benefits.jsx
 * Benefits and prescription module.
 * View targeted benefits, prescription info (mocked).
 */
function Benefits() {
  const { user } = useContext(AppContext);

  // Demo: Get member data based on username (matches mock member id)
  const members = mockDataFactory.getMockMembers();
  const member = members.find(
    m => m.name.toLowerCase().includes(user?.displayName?.toLowerCase() || '')
  );

  // Demo: Get plan details
  const plans = mockDataFactory.getMockPlans();
  const plan = member ? plans.find(p => p.name === member.plan) : null;

  // Demo: Targeted benefits (mocked)
  const targetedBenefits = plan
    ? plan.benefits.map((benefit, idx) => ({
        name: benefit,
        description:
          benefit === 'Dental'
            ? 'Routine cleanings, exams, and basic dental care.'
            : benefit === 'Vision'
            ? 'Annual eye exams, glasses/contacts allowance.'
            : benefit === 'Prescription Drugs'
            ? 'Coverage for generic and brand medications.'
            : benefit === 'Hearing'
            ? 'Hearing exams and hearing aid allowance.'
            : 'Additional benefit.',
      }))
    : [];

  // Demo: Prescription info (mocked)
  const prescriptions = member
    ? [
        {
          name: 'Atorvastatin',
          dosage: '20mg',
          frequency: 'Once daily',
          status: 'Active',
          refillDue: '2024-06-15',
        },
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once daily',
          status: 'Active',
          refillDue: '2024-06-20',
        },
      ]
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Benefits & Prescriptions
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your Plan</h3>
          {plan ? (
            <div className="mb-3">
              <div className="font-semibold text-blue-700">{plan.name}</div>
              <div className="text-gray-700 text-sm">{plan.description}</div>
              <div className="text-gray-500 text-xs">Premium: {plan.premium}</div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No plan assigned. Please contact support.</div>
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Targeted Benefits</h3>
          {targetedBenefits.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {targetedBenefits.map((benefit, idx) => (
                <li key={idx} className="py-2">
                  <div className="font-semibold text-blue-700">{benefit.name}</div>
                  <div className="text-gray-700 text-sm">{benefit.description}</div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 text-sm">No benefits available.</div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Prescriptions</h3>
          {prescriptions.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {prescriptions.map((rx, idx) => (
                <li key={idx} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-blue-700">{rx.name}</div>
                    <div className="text-gray-700 text-xs">
                      {rx.dosage} &middot; {rx.frequency}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span
                      className={`text-xs font-semibold rounded px-2 py-1 ${
                        rx.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {rx.status}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      Refill due: {rx.refillDue}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500 text-sm">No prescriptions found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

Benefits.propTypes = {};

export default Benefits;