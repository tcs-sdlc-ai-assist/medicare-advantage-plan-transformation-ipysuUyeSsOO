import React from 'react';
import PropTypes from 'prop-types';

/**
 * PersonalizedRecommendations.jsx
 * Displays personalized recommendations/nudges (mocked).
 * Used in Dashboard page.
 * @param {Object} props
 * @param {Array<string>} props.recommendations - Array of recommendation strings.
 * @param {string} [props.title] - Optional section title.
 */
function PersonalizedRecommendations({ recommendations = [], title = 'Personalized Recommendations' }) {
  return (
    <div className="mb-6">
      {title && (
        <h3 className="text-lg font-medium text-gray-700 mb-2">{title}</h3>
      )}
      {recommendations.length === 0 ? (
        <div className="text-gray-500 text-sm">No recommendations available.</div>
      ) : (
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {recommendations.map((rec, idx) => (
            <li key={idx}>{rec}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

PersonalizedRecommendations.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
};

export default PersonalizedRecommendations;