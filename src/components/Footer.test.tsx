import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Footer', () => {
  it('renders the bookstore name', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Abebe Bookstore')).toBeInTheDocument();
  });

  it('renders quick links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders developer contact info', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('+251 97 660 1074')).toBeInTheDocument();
    expect(screen.getByText('gemachistesfaye36@gmail.com')).toBeInTheDocument();
  });

  it('renders copyright with current year', () => {
    renderWithRouter(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}.*Abebe Bookstore`))).toBeInTheDocument();
  });
});
