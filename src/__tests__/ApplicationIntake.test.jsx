import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ApplicationIntake from '../pages/ApplicationIntake';
import { AppContext } from '../context/AppContext';

describe('ApplicationIntake', () => {
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

  test('renders Application Intake page and channel tabs', () => {
    renderWithContext(<ApplicationIntake />);
    expect(screen.getByText(/Application Intake/i)).toBeInTheDocument();
    expect(screen.getByText(/Online Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Paper Application/i)).toBeInTheDocument();
    expect(screen.getByText(/Broker Assisted/i)).toBeInTheDocument();
    expect(screen.getByText(/Provider Referral/i)).toBeInTheDocument();
  });

  test('shows channel-specific instructions for portal', () => {
    renderWithContext(<ApplicationIntake />);
    expect(screen.getByText(/Please complete all fields and submit online/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan Selection/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Notes/i)).toBeInTheDocument();
  });

  test('shows channel-specific instructions for paper', () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Paper Application/i));
    expect(screen.getByText(/Mail to: Medicare Advantage Intake/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan Selection/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Notes/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Phone/i)).not.toBeInTheDocument();
  });

  test('shows channel-specific instructions for broker', () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Broker Assisted/i));
    expect(screen.getByText(/A licensed broker will contact you/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan Selection/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Notes/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
  });

  test('shows channel-specific instructions for provider', () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Provider Referral/i));
    expect(screen.getByText(/Provider will submit your application/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Plan Selection/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Additional Notes/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
  });

  test('shows error if required fields are missing for portal', async () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Submit Application/i));
    await waitFor(() => {
      expect(screen.getByText(/Name, plan, and channel are required/i)).toBeInTheDocument();
    });
  });

  test('shows error if email is missing for portal', async () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Plan Selection/i), { target: { value: 'Plan A' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    await waitFor(() => {
      expect(screen.getByText(/Email is required for portal applications/i)).toBeInTheDocument();
    });
  });

  test('shows error if phone is missing for broker', async () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Broker Assisted/i));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Plan Selection/i), { target: { value: 'Plan B' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    await waitFor(() => {
      expect(screen.getByText(/Phone is required for broker-assisted applications/i)).toBeInTheDocument();
    });
  });

  test('submits portal application successfully', async () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jdoe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Plan Selection/i), { target: { value: 'Plan A' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    await waitFor(() => {
      expect(screen.getByText(/Application submitted successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/Application Submitted/i)).toBeInTheDocument();
      expect(screen.getByText(/A confirmation email will be sent to/i)).toBeInTheDocument();
    });
  });

  test('submits broker application successfully', async () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Broker Assisted/i));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '555-123-4567' } });
    fireEvent.change(screen.getByLabelText(/Plan Selection/i), { target: { value: 'Plan C' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    await waitFor(() => {
      expect(screen.getByText(/Application submitted successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/Application Submitted/i)).toBeInTheDocument();
      expect(screen.getByText(/A broker will contact you at/i)).toBeInTheDocument();
    });
  });

  test('submits paper application successfully', async () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Paper Application/i));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Plan Selection/i), { target: { value: 'Plan B' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    await waitFor(() => {
      expect(screen.getByText(/Application submitted successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/Application Submitted/i)).toBeInTheDocument();
      expect(screen.getByText(/Please mail your printed application/i)).toBeInTheDocument();
    });
  });

  test('submits provider application successfully', async () => {
    renderWithContext(<ApplicationIntake />);
    fireEvent.click(screen.getByText(/Provider Referral/i));
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Phone/i), { target: { value: '555-123-4567' } });
    fireEvent.change(screen.getByLabelText(/Plan Selection/i), { target: { value: 'Plan A' } });
    fireEvent.click(screen.getByText(/Submit Application/i));
    await waitFor(() => {
      expect(screen.getByText(/Application submitted successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/Application Submitted/i)).toBeInTheDocument();
      expect(screen.getByText(/Your provider will handle the submission process/i)).toBeInTheDocument();
    });
  });

  test('shows demo disclaimer', () => {
    renderWithContext(<ApplicationIntake />);
    expect(screen.getByText(/This is a simulated intake process/i)).toBeInTheDocument();
  });
});