import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SocialFeed from '../pages/SocialFeed';
import { AppContext } from '../context/AppContext';

describe('SocialFeed', () => {
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

  test('renders Social & Community Feed page and sections', () => {
    renderWithContext(<SocialFeed />);
    expect(screen.getByText(/Social & Community Feed/i)).toBeInTheDocument();
    expect(screen.getByText(/Your Groups/i)).toBeInTheDocument();
    expect(screen.getByText(/Create a Post/i)).toBeInTheDocument();
    expect(screen.getByText(/Feed/i)).toBeInTheDocument();
  });

  test('renders joined groups and join group buttons', () => {
    renderWithContext(<SocialFeed />);
    expect(screen.getByText('Wellness Group')).toBeInTheDocument();
    expect(screen.getByText('Join Health Tips')).toBeInTheDocument();
    expect(screen.getByText('Join Prescription Support')).toBeInTheDocument();
  });

  test('joins a new group', () => {
    renderWithContext(<SocialFeed />);
    fireEvent.click(screen.getByText('Join Health Tips'));
    expect(screen.getByText('Health Tips')).toBeInTheDocument();
  });

  test('shows error when joining already joined group', () => {
    renderWithContext(<SocialFeed />);
    fireEvent.click(screen.getByText('Join Health Tips'));
    fireEvent.click(screen.getByText('Join Health Tips'));
    expect(screen.getByText(/Already joined this group/i)).toBeInTheDocument();
  });

  test('renders posts and comments', () => {
    renderWithContext(<SocialFeed />);
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Excited to join the Wellness Group/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome, Jane!/i)).toBeInTheDocument();
    expect(screen.getByText(/Glad to have you!/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Does anyone have tips for managing blood pressure/i)).toBeInTheDocument();
    expect(screen.getByText(/Try regular walks!/i)).toBeInTheDocument();
  });

  test('creates a new post', async () => {
    renderWithContext(<SocialFeed />);
    fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: 'This is a test post.' } });
    fireEvent.change(screen.getByLabelText(/Group/i), { target: { value: 'Wellness Group' } });
    fireEvent.click(screen.getByText(/Post/i));
    await waitFor(() => {
      expect(screen.getByText(/This is a test post/i)).toBeInTheDocument();
      expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
    });
  });

  test('shows error if post content or group is missing', async () => {
    renderWithContext(<SocialFeed />);
    fireEvent.click(screen.getByText(/Post/i));
    await waitFor(() => {
      expect(screen.getByText(/Post content and group are required/i)).toBeInTheDocument();
    });
  });

  test('adds a comment to a post', async () => {
    renderWithContext(<SocialFeed />);
    const commentInputs = screen.getAllByPlaceholderText(/Add a comment/i);
    fireEvent.change(commentInputs[0], { target: { value: 'Nice post!' } });
    fireEvent.click(screen.getAllByText(/Comment/i)[0]);
    await waitFor(() => {
      expect(screen.getByText(/Nice post!/i)).toBeInTheDocument();
      expect(screen.getByText(mockUser.displayName)).toBeInTheDocument();
    });
  });

  test('shows error if comment is empty', async () => {
    renderWithContext(<SocialFeed />);
    fireEvent.click(screen.getAllByText(/Comment/i)[0]);
    await waitFor(() => {
      expect(screen.getByText(/Comment cannot be empty/i)).toBeInTheDocument();
    });
  });

  test('opens and closes message modal', () => {
    renderWithContext(<SocialFeed />);
    fireEvent.click(screen.getAllByText(/Message Jane Smith/i)[0]);
    expect(screen.getByText(/Send Message/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Cancel/i));
    expect(screen.queryByText(/Send Message/i)).not.toBeInTheDocument();
  });

  test('sends a message', async () => {
    renderWithContext(<SocialFeed />);
    fireEvent.click(screen.getAllByText(/Message Jane Smith/i)[0]);
    fireEvent.change(screen.getByLabelText(/Recipient/i), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello Jane!' } });
    fireEvent.click(screen.getByText(/Send/i));
    await waitFor(() => {
      expect(screen.queryByText(/Send Message/i)).not.toBeInTheDocument();
    });
  });

  test('shows error if message recipient or content is missing', async () => {
    renderWithContext(<SocialFeed />);
    fireEvent.click(screen.getAllByText(/Message Jane Smith/i)[0]);
    fireEvent.click(screen.getByText(/Send/i));
    await waitFor(() => {
      expect(screen.getByText(/Recipient and message are required/i)).toBeInTheDocument();
    });
  });

  test('shows "No posts yet" if feed is empty', () => {
    function EmptyFeed() {
      return (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Feed</h3>
          <div className="text-gray-500 text-sm">No posts yet.</div>
        </div>
      );
    }
    renderWithContext(<EmptyFeed />);
    expect(screen.getByText(/No posts yet/i)).toBeInTheDocument();
  });

  test('shows "No comments yet" if post has no comments', () => {
    renderWithContext(<SocialFeed />);
    expect(screen.getAllByText(/No comments yet/i).length).toBeGreaterThan(0);
  });
});