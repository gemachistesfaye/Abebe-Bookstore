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
    expect(screen.getByText('Ethiopia: A History')).toBeInTheDocument();
    expect(screen.getByText('by Harold G. Marcus')).toBeInTheDocument();
    expect(screen.getByText('ETB 550')).toBeInTheDocument();
  });

  it('renders the book description', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getByText(/The definitive guide/)).toBeInTheDocument();
  });

  it('renders category badge', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('renders reader rating stars', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getByText('Reader Rating')).toBeInTheDocument();
  });

  it('renders call to action button', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getByText('Call us for Order')).toBeInTheDocument();
  });

  it('renders add to cart button for in-stock books', () => {
    renderWithRouter(['/book/1']);
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('adds item to cart when clicking add to cart', async () => {
    const user = userEvent.setup();
    renderWithRouter(['/book/1']);
    await user.click(screen.getByText('Add to Cart'));
    expect(screen.getByText('Added to Cart')).toBeInTheDocument();
  });

  it('renders not found message for invalid book ID', () => {
    renderWithRouter(['/book/999']);
    expect(screen.getByText('Book details not found.')).toBeInTheDocument();
  });

  it('renders back button that navigates to home', async () => {
    const user = userEvent.setup();
    renderWithRouter(['/book/1']);

    const backButton = screen.getByText('Back to Collection');
    expect(backButton).toBeInTheDocument();

    await user.click(backButton);
    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });
});
