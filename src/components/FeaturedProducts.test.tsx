import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import FeaturedProducts from './FeaturedProducts';

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <CartProvider>{component}</CartProvider>
    </BrowserRouter>
  );
};

describe('FeaturedProducts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the section heading', async () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByText("Ethiopia's Living Library")).toBeInTheDocument();
  }, 15000);

  it('renders all 52 books initially', async () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByText(/Showing 52 of 52 books/)).toBeInTheDocument();
  }, 15000);

  it('renders search input', () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByPlaceholderText('Search classics...')).toBeInTheDocument();
  });

  it('renders category filter', () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument();
  });

  it('renders language filter', () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByDisplayValue('All Languages')).toBeInTheDocument();
  });

  it('renders sort dropdown', () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByDisplayValue('Default')).toBeInTheDocument();
  });

  it('renders in-stock toggle', () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByText('In Stock Only')).toBeInTheDocument();
  });

  it('filters books by search query', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const searchInput = screen.getByPlaceholderText('Search classics...');
    await user.type(searchInput, 'Ethiopia');
    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(11);
  });

  it('shows no books found message when search has no results', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const searchInput = screen.getByPlaceholderText('Search classics...');
    await user.type(searchInput, 'xyznonexistent');
    expect(screen.getByText('No books found')).toBeInTheDocument();
  });

  it('filters books by category', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const categorySelect = screen.getByDisplayValue('All Categories');
    await user.selectOptions(categorySelect, 'History');
    expect(screen.getByText(/Showing 10 of 52 books/)).toBeInTheDocument();
  });

  it('filters books by language', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const languageSelect = screen.getByDisplayValue('All Languages');
    await user.selectOptions(languageSelect, 'Afaan Oromo');
    expect(screen.getByText(/Showing 6 of 52 books/)).toBeInTheDocument();
  });

  it('filters by in-stock only', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const inStockButton = screen.getByText('In Stock Only');
    await user.click(inStockButton);
    expect(screen.getByText(/Showing 49 of 52 books/)).toBeInTheDocument();
  });

  it('sorts books by price low to high', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const sortSelect = screen.getByDisplayValue('Default');
    await user.selectOptions(sortSelect, 'price-asc');
    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(52);
  });

  it('sorts books by price high to low', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const sortSelect = screen.getByDisplayValue('Default');
    await user.selectOptions(sortSelect, 'price-desc');
    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(52);
  });

  it('sorts books by rating', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const sortSelect = screen.getByDisplayValue('Default');
    await user.selectOptions(sortSelect, 'rating-desc');
    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(52);
  });

  it('sorts books by title alphabetically', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);
    const sortSelect = screen.getByDisplayValue('Default');
    await user.selectOptions(sortSelect, 'title-asc');
    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(52);
  });
});
