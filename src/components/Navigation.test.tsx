import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navigation', () => {
  it('renders the bookstore name', () => {
    renderWithRouter(<Navigation />);
    expect(screen.getByText('Abebe Bookstore')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    renderWithRouter(<Navigation />);
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /products/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders the mobile menu toggle button', () => {
    renderWithRouter(<Navigation />);
    const menuButton = screen.getByRole('button', { name: '' });
    expect(menuButton).toBeInTheDocument();
  });
});
