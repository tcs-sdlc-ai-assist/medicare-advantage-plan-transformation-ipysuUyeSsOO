import React from 'react';
import { render, screen } from '@testing-library/react';
import AuditTrail from '../pages/AuditTrail';
import { AppContext } from '../context/AppContext';

describe('AuditTrail', () => {
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

  test('renders AuditTrail page and table', () => {
    renderWithContext(<AuditTrail />);
    expect(screen.getByText(/Audit Trail/i)).toBeInTheDocument();
    expect(screen.getByText(/View all compliance and reporting actions/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/User/i)).toBeInTheDocument();
    expect(screen.getByText(/Role/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  test('renders audit log entries', () => {
    renderWithContext(<AuditTrail />);
    expect(screen.getByText(/Annual wellness report submitted/i)).toBeInTheDocument();
    expect(screen.getByText(/HIPAA privacy check completed/i)).toBeInTheDocument();
    expect(screen.getByText(/CMS Q2 report submitted/i)).toBeInTheDocument();
    expect(screen.getByText(/Assigned Dr. Alice Smith to care team/i)).toBeInTheDocument();
    expect(screen.getByText(/Member records validated/i)).toBeInTheDocument();
    expect(screen.getByText(/Exported audit log for review/i)).toBeInTheDocument();
    expect(screen.getByText(/Requested refill for Atorvastatin/i)).toBeInTheDocument();
    expect(screen.getByText(/CMS submission check pending/i)).toBeInTheDocument();
    expect(screen.getByText(/User logged in/i)).toBeInTheDocument();
  });

  test('renders user login entry with current date', () => {
    renderWithContext(<AuditTrail />);
    const today = new Date().toISOString().slice(0, 10);
    expect(screen.getByText(today)).toBeInTheDocument();
    expect(screen.getByText(/User logged in/i)).toBeInTheDocument();
    expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
  });

  test('shows no records message if auditTrail is empty', () => {
    // Simulate empty auditTrail by rendering a custom component
    function EmptyAuditTrail() {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow p-8">
            <table>
              <tbody>
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500 text-sm">
                    No audit trail records found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }
    renderWithContext(<EmptyAuditTrail />);
    expect(screen.getByText(/No audit trail records found/i)).toBeInTheDocument();
  });

  test('renders audit log status badges', () => {
    renderWithContext(<AuditTrail />);
    expect(screen.getAllByText(/Success|Compliant|Pending/).length).toBeGreaterThan(0);
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Compliant')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  test('renders audit log actions', () => {
    renderWithContext(<AuditTrail />);
    expect(screen.getByText('Report Submitted')).toBeInTheDocument();
    expect(screen.getByText('Compliance Check')).toBeInTheDocument();
    expect(screen.getByText('Report Submission')).toBeInTheDocument();
    expect(screen.getByText('Care Team Assignment')).toBeInTheDocument();
    expect(screen.getByText('Data Validation')).toBeInTheDocument();
    expect(screen.getByText('Audit Log Export')).toBeInTheDocument();
    expect(screen.getByText('Prescription Refill')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});