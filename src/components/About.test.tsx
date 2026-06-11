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
    expect(screen.getByText('About Our Bookstore')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/Serving our community/)).toBeInTheDocument();
  });

  it('renders three feature cards', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('Community Focused')).toBeInTheDocument();
    expect(screen.getByText('Quality Products')).toBeInTheDocument();
    expect(screen.getByText('Expert Service')).toBeInTheDocument();
  });
});
