import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CareTeam from '../pages/CareTeam';
import { AppContext } from '../context/AppContext';

describe('CareTeam', () => {
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

  test('renders Care Team Management page and sections', () => {
    renderWithContext(<CareTeam />);
    expect(screen.getByText(/Care Team Management/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Care Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Team Tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Team Communications/i)).toBeInTheDocument();
    expect(screen.getByText(/Assign Provider/i)).toBeInTheDocument();
  });

  test('renders care team roster for member', () => {
    renderWithContext(<CareTeam />);
    expect(screen.getByText(/Primary Care/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Cardiology/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Brian Lee/i)).toBeInTheDocument();
  });

  test('renders team tasks', () => {
    renderWithContext(<CareTeam />);
    expect(screen.getByText(/Schedule follow-up appointment/i)).toBeInTheDocument();
    expect(screen.getByText(/Review lab results/i)).toBeInTheDocument();
    expect(screen.getByText(/Update care plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Brian Lee/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Priya Patel/i)).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('renders team communications', () => {
    renderWithContext(<CareTeam />);
    expect(screen.getByText(/Annual wellness visit scheduled for next week/i)).toBeInTheDocument();
    expect(screen.getByText(/Cardiology report uploaded/i)).toBeInTheDocument();
    expect(screen.getByText(/Requested prescription refill/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Brian Lee/i)).toBeInTheDocument();
    expect(screen.getByText(/Member/i)).toBeInTheDocument();
  });

  test('opens assign provider modal and validates fields', () => {
    renderWithContext(<CareTeam />);
    fireEvent.click(screen.getByText(/Assign Provider/i));
    expect(screen.getByText(/Assign Provider/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Provider/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Assign/i));
    expect(screen.getByText(/Role and provider are required/i)).toBeInTheDocument();
  });

  test('assigns provider to care team', () => {
    renderWithContext(<CareTeam />);
    fireEvent.click(screen.getByText(/Assign Provider/i));
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'Dermatology' } });
    fireEvent.change(screen.getByLabelText(/Provider/i), { target: { value: 'Dr. Priya Patel' } });
    fireEvent.click(screen.getByText(/Assign/i));
    expect(screen.queryByText(/Assign Provider/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Dermatology/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Priya Patel/i)).toBeInTheDocument();
  });

  test('cancel assign provider modal', () => {
    renderWithContext(<CareTeam />);
    fireEvent.click(screen.getByText(/Assign Provider/i));
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByText(/Assign Provider/i)).not.toBeInTheDocument();
  });

  test('shows no care team assigned for unknown member', () => {
    renderWithContext(<CareTeam />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No care team assigned/i)).toBeInTheDocument();
  });
});