import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../context/AppContext';

/**
 * OutcomeDashboard.jsx
 * Outcomes dashboard. Visualizes hospitalization, adherence, and value-based metrics (mocked).
 */
function OutcomeDashboard() {
  const { user } = useContext(AppContext);

  // Mocked metrics
  const [metrics] = useState([
    {
      id: 1,
      name: 'Hospitalization Rate',
      value: 2.1,
      unit: '%',
      trend: 'down',
      description: 'Percentage of members hospitalized in past year.',
      benchmark: 3.5,
    },
    {
      id: 2,
      name: 'Medication Adherence',
      value: 89,
      unit: '%',
      trend: 'up',
      description: 'Members adherent to prescribed medications.',
      benchmark: 85,
    },
    {
      id: 3,
      name: 'Preventive Visits',
      value: 74,
      unit: '%',
      trend: 'up',
      description: 'Members completing annual wellness/preventive visits.',
      benchmark: 70,
    },
    {
      id: 4,
      name: 'Readmission Rate',
      value: 7.8,
      unit: '%',
      trend: 'down',
      description: '30-day hospital readmission rate.',
      benchmark: 8.5,
    },
    {
      id: 5,
      name: 'Value-Based Score',
      value: 4.2,
      unit: '/5',
      trend: 'up',
      description: 'CMS value-based performance score.',
      benchmark: 4.0,
    },
  ]);

  // Mocked chart data for hospitalization trend
  const hospitalizationTrend = [
    { month: 'Jan', value: 2.5 },
    { month: 'Feb', value: 2.3 },
    { month: 'Mar', value: 2.2 },
    { month: 'Apr', value: 2.1 },
    { month: 'May', value: 2.1 },
    { month: 'Jun', value: 2.0 },
  ];

  // Mocked chart data for adherence trend
  const adherenceTrend = [
    { month: 'Jan', value: 86 },
    { month: 'Feb', value: 87 },
    { month: 'Mar', value: 88 },
    { month: 'Apr', value: 89 },
    { month: 'May', value: 89 },
    { month: 'Jun', value: 90 },
  ];

  // Simple chart rendering (mocked, no external libs)
  const renderLineChart = (data, color) => (
    <svg viewBox="0 0 180 60" className="w-full h-16">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={data
          .map((d, i) => {
            const x = (i / (data.length - 1)) * 170 + 5;
            const y = 55 - ((d.value - Math.min(...data.map(dd => dd.value))) /
              (Math.max(...data.map(dd => dd.value)) - Math.min(...data.map(dd => dd.value)) || 1)) * 45;
            return `${x},${y}`;
          })
          .join(' ')}
      />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * 170 + 5;
        const y = 55 - ((d.value - Math.min(...data.map(dd => dd.value))) /
          (Math.max(...data.map(dd => dd.value)) - Math.min(...data.map(dd => dd.value)) || 1)) * 45;
        return (
          <circle key={d.month} cx={x} cy={y} r="3" fill={color} />
        );
      })}
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Outcomes Dashboard
        </h2>
        <p className="text-gray-700 mb-6">
          Visualize key outcomes metrics including hospitalization, medication adherence, preventive visits, and value-based performance. All metrics are demo/mock data.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {metrics.map(metric => (
            <div key={metric.id} className="bg-blue-50 rounded-lg p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-blue-700">{metric.name}</span>
                <span className={`text-xs font-semibold rounded px-2 py-1 ${
                  metric.trend === 'up'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {metric.trend === 'up' ? '▲ Up' : '▼ Down'}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-blue-600">{metric.value}</span>
                <span className="text-sm text-gray-600">{metric.unit}</span>
              </div>
              <div className="text-xs text-gray-500 mb-2">
                Benchmark: {metric.benchmark}{metric.unit}
              </div>
              <div className="text-gray-700 text-sm">{metric.description}</div>
            </div>
          ))}
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Hospitalization Trend (YTD)</h3>
          <div className="bg-gray-100 rounded p-4">
            {renderLineChart(hospitalizationTrend, '#2563eb')}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {hospitalizationTrend.map(d => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Medication Adherence Trend (YTD)</h3>
          <div className="bg-gray-100 rounded p-4">
            {renderLineChart(adherenceTrend, '#22c55e')}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {adherenceTrend.map(d => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-gray-500 text-xs">
          Metrics are for demonstration only. For real outcomes, consult CMS and provider reports.
        </div>
      </div>
    </div>
  );
}

OutcomeDashboard.propTypes = {};

export default OutcomeDashboard;