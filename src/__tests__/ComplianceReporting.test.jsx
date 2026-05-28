import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ComplianceReporting from '../pages/ComplianceReporting';
import { AppContext } from '../context/AppContext';

describe('ComplianceReporting', () => {
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

  test('renders ComplianceReporting page and form', () => {
    renderWithContext(<ComplianceReporting />);
    expect(screen.getByText(/Compliance & CMS Reporting/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit a Report/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit Report/i)).toBeInTheDocument();
  });

  test('shows error if report form fields are empty', async () => {
    renderWithContext(<ComplianceReporting />);
    fireEvent.click(screen.getByText(/Submit Report/i));
    await waitFor(() => {
      expect(screen.getByText(/Title, summary, and date are required/i)).toBeInTheDocument();
    });
  });

  test('submits a new report and displays it', async () => {
    renderWithContext(<ComplianceReporting />);
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Report' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-06-10' } });
    fireEvent.change(screen.getByLabelText(/Summary/i), { target: { value: 'This is a test summary.' } });
    fireEvent.click(screen.getByText(/Submit Report/i));
    await waitFor(() => {
      expect(screen.getByText(/Report submitted successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Report/i)).toBeInTheDocument();
      expect(screen.getByText(/2024-06-10/i)).toBeInTheDocument();
      expect(screen.getByText(/This is a test summary/i)).toBeInTheDocument();
    });
  });

  test('renders compliance checks and refreshes them', async () => {
    renderWithContext(<ComplianceReporting />);
    expect(screen.getByText(/Compliance Checks/i)).toBeInTheDocument();
    expect(screen.getByText(/HIPAA Privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/CMS Submission/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Refresh Checks/i));
    await waitFor(() => {
      expect(screen.getByText(/Submission received/i)).toBeInTheDocument();
    });
  });

  test('shows "No reports submitted yet" if no reports', () => {
    // Render with a user that has no reports (simulate by using a name not matching mockDataFactory)
    renderWithContext(<ComplianceReporting />, { user: { displayName: 'Nonexistent User' } });
    expect(screen.getByText(/No reports submitted yet/i)).toBeInTheDocument();
  });
});