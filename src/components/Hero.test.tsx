import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from './Hero';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Hero', () => {
  it('renders the bookstore name', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText('Abebe Bookstore')).toBeInTheDocument();
  });

  it('renders the description', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText(/Discover a curated collection/)).toBeInTheDocument();
  });

  it('renders the browse button', () => {
    renderWithRouter(<Hero />);
    expect(screen.getByText('Browse Collection')).toBeInTheDocument();
  });
});
