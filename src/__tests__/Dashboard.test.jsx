import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { AppContext } from '../context/AppContext';

describe('Dashboard', () => {
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

  test('renders Dashboard page and welcome message', () => {
    renderWithContext(<Dashboard />);
    expect(screen.getByText(/Welcome, John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Personalized Recommendations/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Engagement/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick Links/i)).toBeInTheDocument();
  });

  test('renders personalized recommendations for active member', () => {
    renderWithContext(<Dashboard />);
    expect(screen.getByText(/Schedule your annual wellness visit/i)).toBeInTheDocument();
    expect(screen.getByText(/Review your plan benefits for 2024/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore new providers in your area/i)).toBeInTheDocument();
  });

  test('renders personalized recommendations for inactive member', () => {
    renderWithContext(<Dashboard />, {
      user: { displayName: 'Robert Lee', role: 'member', username: 'rlee', email: 'rlee@example.com' },
    });
    expect(screen.getByText(/Reactivate your coverage to access benefits/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact support for enrollment assistance/i)).toBeInTheDocument();
  });

  test('renders personalized recommendations for no member', () => {
    renderWithContext(<Dashboard />, { user: null });
    expect(screen.getByText(/Complete your profile for personalized recommendations/i)).toBeInTheDocument();
  });

  test('renders engagement metrics', () => {
    renderWithContext(<Dashboard />);
    expect(screen.getByText(/Visits/i)).toBeInTheDocument();
    expect(screen.getByText(/Messages/i)).toBeInTheDocument();
    expect(screen.getByText(/Reports/i)).toBeInTheDocument();
  });

  test('renders quick links', () => {
    renderWithContext(<Dashboard />);
    expect(screen.getByText('View Plan Details')).toBeInTheDocument();
    expect(screen.getByText('Find Providers')).toBeInTheDocument();
    expect(screen.getByText('Care Team')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Contact Support')).toBeInTheDocument();
  });
});