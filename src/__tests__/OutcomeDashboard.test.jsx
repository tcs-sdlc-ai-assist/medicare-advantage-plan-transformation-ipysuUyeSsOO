import React from 'react';
import { render, screen } from '@testing-library/react';
import OutcomeDashboard from '../pages/OutcomeDashboard';
import { AppContext } from '../context/AppContext';

describe('OutcomeDashboard', () => {
  const mockUser = {
    displayName: 'John Doe',
    role: 'member',
    username: 'jdoe',
    email: 'jdoe@example.com',
  };

  function renderWithContext(ui, { user = mockUser } = {}) {
    return render(
      <AppContext.Provider value={{ user }}>
        {ui}
      </AppContext.Provider>
    );
  }

  test('renders Outcomes Dashboard page and metrics', () => {
    renderWithContext(<OutcomeDashboard />);
    expect(screen.getByText(/Outcomes Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Visualize key outcomes metrics/i)).toBeInTheDocument();
    expect(screen.getByText(/Hospitalization Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Medication Adherence/i)).toBeInTheDocument();
    expect(screen.getByText(/Preventive Visits/i)).toBeInTheDocument();
    expect(screen.getByText(/Readmission Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Value-Based Score/i)).toBeInTheDocument();
  });

  test('renders metric values and trends', () => {
    renderWithContext(<OutcomeDashboard />);
    expect(screen.getByText('2.1')).toBeInTheDocument();
    expect(screen.getByText('89')).toBeInTheDocument();
    expect(screen.getByText('74')).toBeInTheDocument();
    expect(screen.getByText('7.8')).toBeInTheDocument();
    expect(screen.getByText('4.2')).toBeInTheDocument();
    expect(screen.getAllByText(/▲ Up|▼ Down/).length).toBeGreaterThan(0);
    expect(screen.getByText('▲ Up')).toBeInTheDocument();
    expect(screen.getByText('▼ Down')).toBeInTheDocument();
  });

  test('renders hospitalization trend chart', () => {
    renderWithContext(<OutcomeDashboard />);
    expect(screen.getByText(/Hospitalization Trend \(YTD\)/i)).toBeInTheDocument();
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Jun')).toBeInTheDocument();
  });

  test('renders medication adherence trend chart', () => {
    renderWithContext(<OutcomeDashboard />);
    expect(screen.getByText(/Medication Adherence Trend \(YTD\)/i)).toBeInTheDocument();
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Jun')).toBeInTheDocument();
  });

  test('shows demo disclaimer', () => {
    renderWithContext(<OutcomeDashboard />);
    expect(screen.getByText(/Metrics are for demonstration only/i)).toBeInTheDocument();
  });
});