import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders header and footer', () => {
    render(<App />);
    expect(screen.getByText(/Medicare Advantage Demo/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });

  test('renders main welcome section', () => {
    render(<App />);
    expect(screen.getByText(/Welcome to the Medicare Advantage Demo/i)).toBeInTheDocument();
    expect(screen.getByText(/Compare plans and benefits/i)).toBeInTheDocument();
    expect(screen.getByText(/Find healthcare providers/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact support for assistance/i)).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Plans')).toBeInTheDocument();
    expect(screen.getByText('Providers')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders mobile nav toggle', () => {
    render(<App />);
    const toggleButton = screen.getByLabelText('Toggle navigation');
    expect(toggleButton).toBeInTheDocument();
  });
});