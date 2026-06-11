import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FeaturedProducts from './FeaturedProducts';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('FeaturedProducts', () => {
  it('renders the section heading', () => {
    renderWithRouter(<FeaturedProducts />);
    expect(screen.getByText("Ethiopia's Living Library")).toBeInTheDocument();
  });

  it('renders all 18 books initially', () => {
    renderWithRouter(<FeaturedProducts />);
    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(18);
  });

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

  it('filters books by search query', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);

    const searchInput = screen.getByPlaceholderText('Search classics...');
    await user.type(searchInput, 'Ethiopia');

    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(5); // Ethiopia: A History, A History of Modern Ethiopia, Made in Ethiopia, An Ethiopian Fairy Tale, The Flavors of Ethiopia
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

    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(3); // 3 History books
  });

  it('filters books by language', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FeaturedProducts />);

    const languageSelect = screen.getByDisplayValue('All Languages');
    await user.selectOptions(languageSelect, 'Afaan Oromo');

    const bookCards = screen.getAllByRole('link');
    expect(bookCards.length).toBe(3); // 3 Afaan Oromo books
  });
});
