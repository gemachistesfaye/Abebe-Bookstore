import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from './About';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('About', () => {
  it('renders the section heading', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('About Abebe Bookstore')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/trusted source/)).toBeInTheDocument();
  });

  it('renders stats counters', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Books Available')).toBeInTheDocument();
    expect(screen.getByText('Years Serving')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });
});
