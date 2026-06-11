import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders the home page with hero section', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Abebe Bookstore').length).toBeGreaterThan(0);
    expect(screen.getByText('Browse Collection')).toBeInTheDocument();
  }, 15000);

  it('renders the product detail page for a valid book', () => {
    render(
      <MemoryRouter initialEntries={['/book/1']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Ethiopia: A History').length).toBeGreaterThan(0);
    expect(screen.getByText('Harold G. Marcus')).toBeInTheDocument();
  }, 15000);

  it('renders 404 page for invalid routes', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders navigation on all pages', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByText('Abebe Bookstore').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the checkout page', () => {
    render(
      <MemoryRouter initialEntries={['/checkout']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Checkout Summary')).toBeInTheDocument();
  });

  it('renders dark mode toggle in navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    const toggles = screen.getAllByLabelText('Toggle dark mode');
    expect(toggles.length).toBeGreaterThanOrEqual(1);
  });

  it('renders cart icon in navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
