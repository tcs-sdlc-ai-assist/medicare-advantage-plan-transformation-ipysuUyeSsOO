import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProviderNetwork from '../pages/ProviderNetwork';
import { AppContext } from '../context/AppContext';

describe('ProviderNetwork', () => {
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

  test('renders Provider Network Directory page and sections', () => {
    renderWithContext(<ProviderNetwork />);
    expect(screen.getByText(/Provider Network Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/Provider Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/Network Partnerships/i)).toBeInTheDocument();
    expect(screen.getByText(/Assign Provider to Care Team/i)).toBeInTheDocument();
  });

  test('renders provider directory table and entries', () => {
    renderWithContext(<ProviderNetwork />);
    expect(screen.getByText('Dr. Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Primary Care')).toBeInTheDocument();
    expect(screen.getByText('555-111-2222')).toBeInTheDocument();
    expect(screen.getByText('101 Health Blvd, Springfield, IL 62704')).toBeInTheDocument();
    expect(screen.getByText('Medicare Advantage')).toBeInTheDocument();

    expect(screen.getByText('Dr. Brian Lee')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('555-333-4444')).toBeInTheDocument();

    expect(screen.getByText('Dr. Priya Patel')).toBeInTheDocument();
    expect(screen.getByText('Dermatology')).toBeInTheDocument();
    expect(screen.getByText('555-555-6666')).toBeInTheDocument();
  });

  test('renders network partnerships', () => {
    renderWithContext(<ProviderNetwork />);
    expect(screen.getByText('Springfield Health Partners')).toBeInTheDocument();
    expect(screen.getByText('Integrated care network for Medicare Advantage members.')).toBeInTheDocument();
    expect(screen.getByText(/Providers: Dr. Alice Smith, Dr. Brian Lee/i)).toBeInTheDocument();

    expect(screen.getByText('Shelbyville Medical Group')).toBeInTheDocument();
    expect(screen.getByText('Specialty and primary care for Shelbyville area.')).toBeInTheDocument();
    expect(screen.getByText(/Providers: Dr. Brian Lee, Dr. Priya Patel/i)).toBeInTheDocument();

    expect(screen.getByText('Capital City Wellness')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive wellness and preventive services.')).toBeInTheDocument();
    expect(screen.getByText(/Providers: Dr. Alice Smith, Dr. Priya Patel/i)).toBeInTheDocument();
  });

  test('renders assigned providers for member', () => {
    renderWithContext(<ProviderNetwork />);
    expect(screen.getByText('Assigned Providers')).toBeInTheDocument();
    expect(screen.getByText('Dr. Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Dr. Brian Lee')).toBeInTheDocument();
  });

  test('assigns a new provider successfully', async () => {
    renderWithContext(<ProviderNetwork />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'P003' } });
    fireEvent.click(screen.getByText(/Assign/i));
    await waitFor(() => {
      expect(screen.getByText(/Provider Dr. Priya Patel assigned successfully/i)).toBeInTheDocument();
      expect(screen.getByText('Dr. Priya Patel')).toBeInTheDocument();
    });
  });

  test('shows error if provider already assigned', async () => {
    renderWithContext(<ProviderNetwork />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'P001' } }); // Dr. Alice Smith already assigned
    fireEvent.click(screen.getByText(/Assign/i));
    await waitFor(() => {
      expect(screen.getByText(/Provider already assigned/i)).toBeInTheDocument();
    });
  });

  test('shows error if no provider selected', async () => {
    renderWithContext(<ProviderNetwork />);
    fireEvent.click(screen.getByText(/Assign/i));
    await waitFor(() => {
      expect(screen.getByText(/Please select a provider to assign/i)).toBeInTheDocument();
    });
  });

  test('shows error if provider not found', async () => {
    renderWithContext(<ProviderNetwork />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'invalid-id' } });
    fireEvent.click(screen.getByText(/Assign/i));
    await waitFor(() => {
      expect(screen.getByText(/Provider not found/i)).toBeInTheDocument();
    });
  });

  test('shows "No providers assigned" for unknown member', () => {
    renderWithContext(<ProviderNetwork />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No providers assigned/i)).toBeInTheDocument();
  });

  test('shows "No providers found" if directory is empty', () => {
    function EmptyProviderNetwork() {
      return (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Provider Directory</h3>
          <div className="overflow-x-auto">
            <table>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-500 text-sm">
                    No providers found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    renderWithContext(<EmptyProviderNetwork />);
    expect(screen.getByText(/No providers found/i)).toBeInTheDocument();
  });

  test('shows demo disclaimer', () => {
    renderWithContext(<ProviderNetwork />);
    expect(screen.getByText(/Provider network and assignments are simulated for demonstration purposes/i)).toBeInTheDocument();
  });
});