import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * ReportForm.jsx
 * Form for creating/submitting compliance reports (mocked).
 * Used in ComplianceReporting page.
 */
function ReportForm({ onSubmit, submitting }) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (!title.trim() || !summary.trim() || !date.trim()) {
        setError('Title, summary, and date are required.');
        return;
      }
      await onSubmit({ title, summary, date });
      setSuccess('Report submitted successfully.');
      setTitle('');
      setSummary('');
      setDate('');
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="report-title">
          Title
        </label>
        <input
          id="report-title"
          type="text"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="report-date">
          Date
        </label>
        <input
          id="report-date"
          type="date"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          value={date}
          onChange={e => setDate(e.target.value)}
          disabled={submitting}
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1" htmlFor="report-summary">
          Summary
        </label>
        <textarea
          id="report-summary"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={3}
          value={summary}
          onChange={e => setSummary(e.target.value)}
          disabled={submitting}
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-sm">{success}</div>
      )}
      <button
        type="submit"
        className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold transition-colors ${
          submitting ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
        }`}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit Report'}
      </button>
    </form>
  );
}

ReportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
};

export default ReportForm;