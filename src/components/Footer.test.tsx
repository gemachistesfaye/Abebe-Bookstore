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

  it('renders category links', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('Amharic Literature')).toBeInTheDocument();
    expect(screen.getByText('English Books')).toBeInTheDocument();
  });

  it('renders developer info', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText('+251 97 660 1074')).toBeInTheDocument();
    expect(screen.getByText('gemachistesfaye36@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Telegram Channel')).toBeInTheDocument();
    expect(screen.getByText('GitHub Profile')).toBeInTheDocument();
  });

  it('renders copyright', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
  });
});
