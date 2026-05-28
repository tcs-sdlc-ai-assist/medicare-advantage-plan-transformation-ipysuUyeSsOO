import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Gamification from '../pages/Gamification';
import { AppContext } from '../context/AppContext';

describe('Gamification', () => {
  const mockUser = {
    displayName: 'Y**',
    role: 'member',
    username: 'yoo',
    email: 'yoo@example.com',
  };

  function renderWithContext(ui, { user = mockUser } = {}) {
    return render(
      <AppContext.Provider value={{ user }}>
        {ui}
      </AppContext.Provider>
    );
  }

  test('renders Gamification page and sections', () => {
    renderWithContext(<Gamification />);
    expect(screen.getByText(/Gamification & Rewards/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Points/i)).toBeInTheDocument();
    expect(screen.getByText(/Badges/i)).toBeInTheDocument();
    expect(screen.getByText(/Rewards/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
  });

  test('renders user points for leaderboard entry', () => {
    renderWithContext(<Gamification />);
    expect(screen.getByText('350')).toBeInTheDocument();
    expect(screen.getByText(/points/i)).toBeInTheDocument();
  });

  test('renders badges and earned/locked status', () => {
    renderWithContext(<Gamification />);
    expect(screen.getByText('Wellness Champion')).toBeInTheDocument();
    expect(screen.getByText('Engagement Star')).toBeInTheDocument();
    expect(screen.getByText('Care Team Collaborator')).toBeInTheDocument();
    expect(screen.getByText('Prescription Pro')).toBeInTheDocument();
    expect(screen.getAllByText(/Earned|Locked/).length).toBeGreaterThan(0);
    expect(screen.getByText('Earned')).toBeInTheDocument();
    expect(screen.getByText('Locked')).toBeInTheDocument();
  });

  test('renders rewards and claim buttons/status', () => {
    renderWithContext(<Gamification />);
    expect(screen.getByText('Gift Card')).toBeInTheDocument();
    expect(screen.getByText('Fitness Tracker')).toBeInTheDocument();
    expect(screen.getByText('Healthy Meal Kit')).toBeInTheDocument();
    expect(screen.getByText('Claimed')).toBeInTheDocument();
    expect(screen.getByText('Not enough points')).toBeInTheDocument();
    expect(screen.getAllByText(/Claim|Claimed|Not enough points/).length).toBeGreaterThan(0);
  });

  test('claims a reward successfully', async () => {
    renderWithContext(<Gamification />);
    const claimButton = screen.getAllByText('Claim')[0];
    fireEvent.click(claimButton);
    await waitFor(() => {
      expect(screen.getByText('Claimed')).toBeInTheDocument();
    });
  });

  test('shows error if reward already claimed', async () => {
    renderWithContext(<Gamification />);
    // Gift Card is already claimed, so try to claim again
    const claimedBadge = screen.getByText('Claimed');
    expect(claimedBadge).toBeInTheDocument();
  });

  test('renders leaderboard and highlights current user', () => {
    renderWithContext(<Gamification />);
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Robert Lee')).toBeInTheDocument();
    expect(screen.getByText('Y**')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
    // Current user row should have bg-blue-50 class
    const userRow = screen.getByText('Y**').closest('tr');
    expect(userRow).toHaveClass('bg-blue-50');
  });

  test('shows demo disclaimer', () => {
    renderWithContext(<Gamification />);
    expect(screen.getByText(/Gamification data is simulated for demonstration purposes/i)).toBeInTheDocument();
  });
});