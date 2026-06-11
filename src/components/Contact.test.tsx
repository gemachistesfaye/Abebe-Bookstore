import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Contact from './Contact';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Contact', () => {
  it('renders the section heading', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('+251 91 234 5678')).toBeInTheDocument();
    expect(screen.getByText('info@abebebookstore.com')).toBeInTheDocument();
  });

  it('renders form fields', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByPlaceholderText('Your Name *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message *')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows typing in form fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Contact />);

    await user.type(screen.getByPlaceholderText('Your Name *'), 'John Doe');
    await user.type(screen.getByPlaceholderText('Your Email *'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Your Message *'), 'Hello!');

    expect(screen.getByPlaceholderText('Your Name *')).toHaveValue('John Doe');
    expect(screen.getByPlaceholderText('Your Email *')).toHaveValue('john@example.com');
    expect(screen.getByPlaceholderText('Your Message *')).toHaveValue('Hello!');
  });
});
