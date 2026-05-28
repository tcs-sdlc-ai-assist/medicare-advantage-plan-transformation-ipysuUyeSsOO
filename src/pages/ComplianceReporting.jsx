import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import mockDataFactory from '../utils/mockDataFactory';

/**
 * ComplianceReporting.jsx
 * CMS reporting and compliance simulation module.
 * Generate/submit reports, view compliance checks (mocked).
 */
function ComplianceReporting() {
  const { user } = useContext(AppContext);

  // Demo: Get member data based on username (matches mock member id)
  const members = mockDataFactory.getMockMembers();
  const member = members.find(
    m => m.name.toLowerCase().includes(user?.displayName?.toLowerCase() || '')
  );

  // Demo: Mock reports
  const [reports, setReports] = useState(
    member ? mockDataFactory.getMockReports(member.id) : []
  );

  // Demo: Compliance checks (mocked)
  const complianceChecks = [
    {
      id: 1,
      name: 'HIPAA Privacy',
      status: 'Compliant',
      details: 'No violations detected in member data.',
    },
    {
      id: 2,
      name: 'CMS Submission',
      status: 'Pending',
      details: 'Report submission required for 2024 Q2.',
    },
    {
      id: 3,
      name: 'Data Accuracy',
      status: 'Compliant',
      details: 'Member records validated.',
    },
    {
      id: 4,
      name: 'Audit Trail',
      status: 'Compliant',
      details: 'All actions logged and auditable.',
    },
  ];

  // New report state
  const [newReportTitle, setNewReportTitle] = useState('');
  const [newReportSummary, setNewReportSummary] = useState('');
  const [newReportDate, setNewReportDate] = useState('');
  const [reportError, setReportError] = useState('');
  const [reportSuccess, setReportSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Submit new report handler
  const handleReportSubmit = async e => {
    e.preventDefault();
    setReportError('');
    setReportSuccess('');
    setSubmitting(true);
    try {
      if (!newReportTitle.trim() || !newReportSummary.trim() || !newReportDate.trim()) {
        setReportError('Title, summary, and date are required.');
        setSubmitting(false);
        return;
      }
      // Add report (mock)
      setReports(prev => [
        ...prev,
        {
          id: 'R' + Date.now(),
          title: newReportTitle,
          date: newReportDate,
          summary: newReportSummary,
        },
      ]);
      setReportSuccess('Report submitted successfully.');
      setNewReportTitle('');
      setNewReportSummary('');
      setNewReportDate('');
      setSubmitting(false);
    } catch (err) {
      setReportError('Failed to submit report. Please try again.');
      setSubmitting(false);
    }
  };

  // Simulate compliance check refresh
  const [refreshingChecks, setRefreshingChecks] = useState(false);
  const [checks, setChecks] = useState(complianceChecks);

  const handleRefreshChecks = async () => {
    setRefreshingChecks(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      // For demo, randomly set one check to "Compliant" if "Pending"
      setChecks(prev =>
        prev.map(check =>
          check.status === 'Pending'
            ? { ...check, status: 'Compliant', details: 'Submission received.' }
            : check
        )
      );
      setRefreshingChecks(false);
    } catch (err) {
      setRefreshingChecks(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Compliance & CMS Reporting
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Submit a Report</h3>
          <form onSubmit={handleReportSubmit} className="space-y-3">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="report-title">
                Title
              </label>
              <input
                id="report-title"
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={newReportTitle}
                onChange={e => setNewReportTitle(e.target.value)}
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
                value={newReportDate}
                onChange={e => setNewReportDate(e.target.value)}
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
                value={newReportSummary}
                onChange={e => setNewReportSummary(e.target.value)}
                disabled={submitting}
              />
            </div>
            {reportError && (
              <div className="text-red-600 text-sm">{reportError}</div>
            )}
            {reportSuccess && (
              <div className="text-green-600 text-sm">{reportSuccess}</div>
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
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your Reports</h3>
          {reports.length === 0 ? (
            <div className="text-gray-500 text-sm">No reports submitted yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {reports.map(report => (
                <li key={report.id} className="py-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-blue-700">{report.title}</span>
                    <span className="text-xs text-gray-400">{report.date}</span>
                  </div>
                  <div className="text-gray-700 text-sm">{report.summary}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-700">Compliance Checks</h3>
            <button
              className={`px-3 py-1 rounded bg-blue-600 text-white text-sm font-semibold transition-colors ${
                refreshingChecks ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={refreshingChecks}
              onClick={handleRefreshChecks}
            >
              {refreshingChecks ? 'Refreshing...' : 'Refresh Checks'}
            </button>
          </div>
          <ul className="divide-y divide-gray-200">
            {checks.map(check => (
              <li key={check.id} className="py-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-blue-700">{check.name}</span>
                  <span className="ml-2 text-gray-700 text-sm">{check.details}</span>
                </div>
                <span className={`text-xs font-semibold rounded px-2 py-1 ${
                  check.status === 'Compliant'
                    ? 'bg-green-100 text-green-700'
                    : check.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {check.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

ComplianceReporting.propTypes = {};

export default ComplianceReporting;