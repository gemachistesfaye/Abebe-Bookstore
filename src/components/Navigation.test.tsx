import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Navigation from './Navigation';

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <CartProvider>{component}</CartProvider>
    </BrowserRouter>
  );
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

  it('renders dark mode toggle', () => {
    renderWithRouter(<Navigation />);
    const toggles = screen.getAllByLabelText('Toggle dark mode');
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it('renders cart icon', () => {
    renderWithRouter(<Navigation />);
    const cartIcons = screen.getAllByRole('button').filter(
      btn => btn.querySelector('.lucide-shopping-bag')
    );
    expect(cartIcons.length).toBeGreaterThanOrEqual(1);
  });
});
