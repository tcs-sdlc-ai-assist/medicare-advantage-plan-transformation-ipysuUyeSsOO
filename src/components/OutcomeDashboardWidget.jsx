import React from 'react';
import PropTypes from 'prop-types';

/**
 * OutcomeDashboardWidget.jsx
 * Widget for visualizing outcome metrics (hospitalization, adherence, value-based care).
 * Used in OutcomeDashboard page.
 * @param {Object} props
 * @param {Array<Object>} props.metrics - Array of outcome metrics.
 * @param {Array<Object>} props.trendData - Chart data for trend visualization.
 * @param {string} props.trendColor - Color for chart line.
 * @param {string} props.title - Widget title.
 * @param {string} props.description - Widget description.
 */
function OutcomeDashboardWidget({
  metrics = [],
  trendData = [],
  trendColor = '#2563eb',
  title = '',
  description = '',
}) {
  // Simple line chart rendering (mocked, no external libs)
  const renderLineChart = (data, color) => (
    <svg viewBox="0 0 180 60" className="w-full h-16">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={data
          .map((d, i) => {
            const x = (i / (data.length - 1)) * 170 + 5;
            const y =
              55 -
              ((d.value - Math.min(...data.map(dd => dd.value))) /
                ((Math.max(...data.map(dd => dd.value)) - Math.min(...data.map(dd => dd.value)) || 1)) *
                45);
            return `${x},${y}`;
          })
          .join(' ')}
      />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * 170 + 5;
        const y =
          55 -
          ((d.value - Math.min(...data.map(dd => dd.value))) /
            ((Math.max(...data.map(dd => dd.value)) - Math.min(...data.map(dd => dd.value)) || 1)) *
            45);
        return <circle key={d.month} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {title && (
        <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-700 mb-4">{description}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-blue-50 rounded-lg p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-semibold text-blue-700">{metric.name}</span>
              <span
                className={`text-xs font-semibold rounded px-2 py-1 ${
                  metric.trend === 'up'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {metric.trend === 'up' ? '▲ Up' : '▼ Down'}
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-blue-600">{metric.value}</span>
              <span className="text-sm text-gray-600">{metric.unit}</span>
            </div>
            <div className="text-xs text-gray-500 mb-2">
              Benchmark: {metric.benchmark}
              {metric.unit}
            </div>
            <div className="text-gray-700 text-sm">{metric.description}</div>
          </div>
        ))}
      </div>
      {trendData.length > 0 && (
        <div className="mb-4">
          <div className="bg-gray-100 rounded p-4">
            {renderLineChart(trendData, trendColor)}
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              {trendData.map(d => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="text-gray-500 text-xs">
        Metrics are for demonstration only. For real outcomes, consult CMS and provider reports.
      </div>
    </div>
  );
}

OutcomeDashboardWidget.propTypes = {
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      unit: PropTypes.string.isRequired,
      trend: PropTypes.oneOf(['up', 'down']).isRequired,
      description: PropTypes.string.isRequired,
      benchmark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  trendData: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  trendColor: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default OutcomeDashboardWidget;