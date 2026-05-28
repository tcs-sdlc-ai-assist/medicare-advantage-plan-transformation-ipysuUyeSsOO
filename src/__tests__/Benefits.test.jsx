import React from 'react';
import { render, screen } from '@testing-library/react';
import Benefits from '../pages/Benefits';
import { AppContext } from '../context/AppContext';

describe('Benefits', () => {
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

  test('renders Benefits & Prescriptions page and sections', () => {
    renderWithContext(<Benefits />);
    expect(screen.getByText(/Benefits & Prescriptions/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Plan/i)).toBeInTheDocument();
    expect(screen.getByText(/Targeted Benefits/i)).toBeInTheDocument();
    expect(screen.getByText(/Prescriptions/i)).toBeInTheDocument();
  });

  test('renders plan details for member', () => {
    renderWithContext(<Benefits />);
    expect(screen.getByText(/Plan A/i)).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive coverage/i)).toBeInTheDocument();
    expect(screen.getByText(/Premium: \$120\/month/i)).toBeInTheDocument();
  });

  test('renders targeted benefits for member', () => {
    renderWithContext(<Benefits />);
    expect(screen.getByText(/Dental/i)).toBeInTheDocument();
    expect(screen.getByText(/Routine cleanings, exams, and basic dental care/i)).toBeInTheDocument();
    expect(screen.getByText(/Vision/i)).toBeInTheDocument();
    expect(screen.getByText(/Annual eye exams, glasses\/contacts allowance/i)).toBeInTheDocument();
    expect(screen.getByText(/Prescription Drugs/i)).toBeInTheDocument();
    expect(screen.getByText(/Coverage for generic and brand medications/i)).toBeInTheDocument();
  });

  test('renders prescription info for member', () => {
    renderWithContext(<Benefits />);
    expect(screen.getByText(/Atorvastatin/i)).toBeInTheDocument();
    expect(screen.getByText(/20mg/i)).toBeInTheDocument();
    expect(screen.getByText(/Once daily/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Refill due: 2024-06-15/i)).toBeInTheDocument();

    expect(screen.getByText(/Lisinopril/i)).toBeInTheDocument();
    expect(screen.getByText(/10mg/i)).toBeInTheDocument();
    expect(screen.getByText(/Refill due: 2024-06-20/i)).toBeInTheDocument();
  });

  test('shows no plan assigned for unknown member', () => {
    renderWithContext(<Benefits />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No plan assigned/i)).toBeInTheDocument();
  });

  test('shows no benefits available for unknown member', () => {
    renderWithContext(<Benefits />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No benefits available/i)).toBeInTheDocument();
  });

  test('shows no prescriptions found for unknown member', () => {
    renderWithContext(<Benefits />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No prescriptions found/i)).toBeInTheDocument();
  });
});