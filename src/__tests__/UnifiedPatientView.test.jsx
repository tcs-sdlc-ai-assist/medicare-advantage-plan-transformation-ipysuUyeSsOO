import React from 'react';
import { render, screen } from '@testing-library/react';
import UnifiedPatientView from '../pages/UnifiedPatientView';
import { AppContext } from '../context/AppContext';

describe('UnifiedPatientView', () => {
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

  test('renders Unified Patient Profile page and sections', () => {
    renderWithContext(<UnifiedPatientView />);
    expect(screen.getByText(/Unified Patient Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Patient Demographics/i)).toBeInTheDocument();
    expect(screen.getByText(/Claims History/i)).toBeInTheDocument();
    expect(screen.getByText(/EMR \(Electronic Medical Record\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Pharmacy/i)).toBeInTheDocument();
  });

  test('renders patient demographics for member', () => {
    renderWithContext(<UnifiedPatientView />);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/01\/23\/1970/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St, Springfield, IL 62704/i)).toBeInTheDocument();
    expect(screen.getByText(/555-123-4567/i)).toBeInTheDocument();
    expect(screen.getByText(/jdoe@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan A/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
  });

  test('renders claims history for member', () => {
    renderWithContext(<UnifiedPatientView />);
    expect(screen.getByText(/2024-05-15/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Office Visit/i)).toBeInTheDocument();
    expect(screen.getByText(/\$120/i)).toBeInTheDocument();
    expect(screen.getByText(/Processed/i)).toBeInTheDocument();
    expect(screen.getByText(/Routine checkup/i)).toBeInTheDocument();

    expect(screen.getByText(/2024-04-28/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Brian Lee/i)).toBeInTheDocument();
    expect(screen.getByText(/Specialist Visit/i)).toBeInTheDocument();
    expect(screen.getByText(/\$220/i)).toBeInTheDocument();
    expect(screen.getByText(/Cardiology consult/i)).toBeInTheDocument();

    expect(screen.getByText(/2024-03-10/i)).toBeInTheDocument();
    expect(screen.getByText(/LabCorp/i)).toBeInTheDocument();
    expect(screen.getByText(/Lab Test/i)).toBeInTheDocument();
    expect(screen.getByText(/\$80/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
    expect(screen.getByText(/Blood panel/i)).toBeInTheDocument();
  });

  test('renders EMR records for member', () => {
    renderWithContext(<UnifiedPatientView />);
    expect(screen.getByText(/Annual wellness visit. Vitals normal/i)).toBeInTheDocument();
    expect(screen.getByText(/Cardiology consult. EKG normal/i)).toBeInTheDocument();
    expect(screen.getByText(/Penicillin/i)).toBeInTheDocument();
    expect(screen.getByText(/Hypertension/i)).toBeInTheDocument();
    expect(screen.getByText(/Recommended regular exercise/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue current medication/i)).toBeInTheDocument();
  });

  test('renders pharmacy records for member', () => {
    renderWithContext(<UnifiedPatientView />);
    expect(screen.getByText(/Atorvastatin/i)).toBeInTheDocument();
    expect(screen.getByText(/20mg/i)).toBeInTheDocument();
    expect(screen.getByText(/Once daily/i)).toBeInTheDocument();
    expect(screen.getByText(/Springfield Pharmacy/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Refill due: 2024-06-15/i)).toBeInTheDocument();

    expect(screen.getByText(/Lisinopril/i)).toBeInTheDocument();
    expect(screen.getByText(/10mg/i)).toBeInTheDocument();
    expect(screen.getByText(/Refill due: 2024-06-20/i)).toBeInTheDocument();
  });

  test('shows no patient profile for unknown member', () => {
    renderWithContext(<UnifiedPatientView />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No patient profile found/i)).toBeInTheDocument();
  });

  test('shows no claims found for unknown member', () => {
    renderWithContext(<UnifiedPatientView />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No claims found/i)).toBeInTheDocument();
  });

  test('shows no EMR records found for unknown member', () => {
    renderWithContext(<UnifiedPatientView />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No EMR records found/i)).toBeInTheDocument();
  });

  test('shows no pharmacy records found for unknown member', () => {
    renderWithContext(<UnifiedPatientView />, {
      user: { displayName: 'Nonexistent User', role: 'member', username: 'nouser', email: 'nouser@example.com' },
    });
    expect(screen.getByText(/No pharmacy records found/i)).toBeInTheDocument();
  });

  test('shows demo disclaimer', () => {
    renderWithContext(<UnifiedPatientView />);
    expect(screen.getByText(/All patient data is simulated for demonstration purposes/i)).toBeInTheDocument();
  });
});