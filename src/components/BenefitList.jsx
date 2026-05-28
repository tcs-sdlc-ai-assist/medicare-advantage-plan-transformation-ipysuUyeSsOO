import React from 'react';
import PropTypes from 'prop-types';

/**
 * BenefitList.jsx
 * Displays targeted benefits and prescription info (mocked).
 * Used in Benefits page.
 * @param {Object} props
 * @param {Array<Object>} props.benefits - Array of benefit objects.
 * @param {Array<Object>} props.prescriptions - Array of prescription objects.
 */
function BenefitList({ benefits = [], prescriptions = [] }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Targeted Benefits</h3>
        {benefits.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {benefits.map((benefit, idx) => (
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
  );
}

BenefitList.propTypes = {
  benefits: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
  prescriptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      dosage: PropTypes.string.isRequired,
      frequency: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      refillDue: PropTypes.string.isRequired,
    })
  ),
};

export default BenefitList;