import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import ProductDetails from './ProductDetails';

const renderWithRouter = (initialEntries: string[]) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <CartProvider>
        <Routes>
          <Route path="/book/:id" element={<ProductDetails />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
};

describe('ProductDetails', () => {
  it('renders book details for a valid book ID', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getAllByText('Ethiopia: A History').length).toBeGreaterThan(0);
    expect(screen.getByText('Harold G. Marcus')).toBeInTheDocument();
    expect(screen.getByText('ETB 550')).toBeInTheDocument();
  });

  it('renders the book description', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getByText(/The definitive guide/)).toBeInTheDocument();
  });

  it('renders category badge', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getAllByText('History').length).toBeGreaterThan(0);
  });

  it('renders add to cart button for in-stock books', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders not found message for invalid book ID', () => {
    renderWithRouter(['/book/999']);
    expect(screen.getByText('Book Not Found')).toBeInTheDocument();
  });

  it('renders back button that navigates to home', async () => {
    const user = userEvent.setup();
    renderWithRouter(['/book/1']);

    const backButton = screen.getByText('Back to all books');
    expect(backButton).toBeInTheDocument();

    await user.click(backButton);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
