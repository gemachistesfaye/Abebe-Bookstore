import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider, useCart } from '../context/CartContext';
import { books } from '../data/books';

function TestComponent() {
  const { state, dispatch, cartCount, cartTotal, isInWishlist, isInCart } = useCart();
  return (
    <div>
      <span data-testid="cart-count">{cartCount}</span>
      <span data-testid="cart-total">{cartTotal}</span>
      <span data-testid="cart-items">{state.items.length}</span>
      <span data-testid="wishlist-count">{state.wishlist.length}</span>
      <span data-testid="is-wishlisted-1">{isInWishlist(1).toString()}</span>
      <span data-testid="is-in-cart-1">{isInCart(1).toString()}</span>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', book: books[0] })}>Add Book 1</button>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', book: books[0] })}>Add Book 1 Again</button>
      <button onClick={() => dispatch({ type: 'ADD_TO_CART', book: books[1] })}>Add Book 2</button>
      <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', bookId: 1 })}>Remove Book 1</button>
      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: 1, quantity: 3 })}>Set Book 1 qty 3</button>
      <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY', bookId: 1, quantity: 0 })}>Set Book 1 qty 0</button>
      <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear Cart</button>
      <button onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', bookId: 1 })}>Toggle Wishlist 1</button>
      <button onClick={() => dispatch({ type: 'TOGGLE_WISHLIST', bookId: 1 })}>Toggle Wishlist 1 Again</button>
    </div>
  );
}

function renderWithProviders(component: React.ReactNode) {
  return render(
    <BrowserRouter>
      <CartProvider>{component}</CartProvider>
    </BrowserRouter>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty cart', () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('0');
  });

  it('starts with empty wishlist', () => {
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId('wishlist-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-wishlisted-1')).toHaveTextContent('false');
  });

  it('adds item to cart', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(screen.getByTestId('cart-total')).toHaveTextContent(String(books[0].price));
    expect(screen.getByTestId('is-in-cart-1')).toHaveTextContent('true');
  });

  it('increments quantity when adding same item twice', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    await user.click(screen.getByText('Add Book 1 Again'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-total')).toHaveTextContent(String(books[0].price * 2));
  });

  it('adds multiple different items', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    await user.click(screen.getByText('Add Book 2'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('2');
  });

  it('removes item from cart', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    await user.click(screen.getByText('Remove Book 1'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-in-cart-1')).toHaveTextContent('false');
  });

  it('updates quantity', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    await user.click(screen.getByText('Set Book 1 qty 3'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('3');
  });

  it('removes item when quantity set to 0', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    await user.click(screen.getByText('Set Book 1 qty 0'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-in-cart-1')).toHaveTextContent('false');
  });

  it('clears entire cart', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    await user.click(screen.getByText('Add Book 2'));
    await user.click(screen.getByText('Clear Cart'));
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items')).toHaveTextContent('0');
  });

  it('toggles wishlist items', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    expect(screen.getByTestId('is-wishlisted-1')).toHaveTextContent('false');
    await user.click(screen.getByText('Toggle Wishlist 1'));
    expect(screen.getByTestId('is-wishlisted-1')).toHaveTextContent('true');
    await user.click(screen.getByText('Toggle Wishlist 1 Again'));
    expect(screen.getByTestId('is-wishlisted-1')).toHaveTextContent('false');
  });

  it('persists cart to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Add Book 1'));
    const stored = JSON.parse(localStorage.getItem('abebe-cart') || '{}');
    expect(stored.items).toHaveLength(1);
    expect(stored.items[0].book.id).toBe(books[0].id);
    expect(stored.items[0].quantity).toBe(1);
  });

  it('persists wishlist to localStorage', async () => {
    const user = userEvent.setup();
    renderWithProviders(<TestComponent />);
    await user.click(screen.getByText('Toggle Wishlist 1'));
    const stored = JSON.parse(localStorage.getItem('abebe-cart') || '{}');
    expect(stored.wishlist).toContain(1);
  });
});
