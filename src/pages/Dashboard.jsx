import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';
import mockDataFactory from '../utils/mockDataFactory';

/**
 * Dashboard.jsx
 * Member dashboard landing page.
 * Shows personalized recommendations, engagement, quick links.
 */
function Dashboard() {
  const { user } = useContext(AppContext);

  // Demo: Get member data based on username (matches mock member id)
  const members = mockDataFactory.getMockMembers();
  const member = members.find(
    m => m.name.toLowerCase().includes(user?.displayName?.toLowerCase() || '')
  );

  // Demo: Recommendations based on plan/status
  const recommendations = [];
  if (member) {
    if (member.status === 'Active') {
      recommendations.push('Schedule your annual wellness visit.');
      recommendations.push('Review your plan benefits for 2024.');
      recommendations.push('Explore new providers in your area.');
    } else {
      recommendations.push('Reactivate your coverage to access benefits.');
      recommendations.push('Contact support for enrollment assistance.');
    }
  } else {
    recommendations.push('Complete your profile for personalized recommendations.');
  }

  // Demo: Engagement stats (mock)
  const engagement = member
    ? {
        visits: Math.floor(Math.random() * 5) + 1,
        messages: Math.floor(Math.random() * 3),
        reports: mockDataFactory.getMockReports(member.id).length,
      }
    : { visits: 0, messages: 0, reports: 0 };

  // Demo: Quick links
  const quickLinks = [
    { label: 'View Plan Details', href: '/plans' },
    { label: 'Find Providers', href: '/providers' },
    { label: 'Care Team', href: '#' },
    { label: 'Reports', href: '#' },
    { label: 'Contact Support', href: '/contact' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Welcome{user?.displayName ? `, ${user.displayName}` : ''}!
        </h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Personalized Recommendations</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            {recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Your Engagement</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{engagement.visits}</div>
              <div className="text-xs text-gray-600">Visits</div>
            </div>
            <div className="bg-blue-50 rounded p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{engagement.messages}</div>
              <div className="text-xs text-gray-600">Messages</div>
            </div>
            <div className="bg-blue-50 rounded p-3 text-center">
              <div className="text-xl font-bold text-blue-600">{engagement.reports}</div>
              <div className="text-xs text-gray-600">Reports</div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            {quickLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;