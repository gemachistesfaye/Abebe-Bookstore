import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Contact from './Contact';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Contact', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the section heading', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText('+251 97 660 1074')).toBeInTheDocument();
    expect(screen.getByText('info@abebebookstore.com')).toBeInTheDocument();
    expect(screen.getByText(/Near Harar Ras Hotel/)).toBeInTheDocument();
  });

  it('renders form fields', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    renderWithRouter(<Contact />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('allows typing in form fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<Contact />);

    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello!');

    expect(screen.getByLabelText('Name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Message')).toHaveValue('Hello!');
  });

  it('shows success message on successful form submission', async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    renderWithRouter(<Contact />);

    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello!');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/Thank you for your message/)).toBeInTheDocument();
    });
  });

  it('shows error message on failed form submission', async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed' }),
    } as Response);

    renderWithRouter(<Contact />);

    await user.type(screen.getByLabelText('Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email'), 'john@example.com');
    await user.type(screen.getByLabelText('Message'), 'Hello!');
    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText('Failed to send message.')).toBeInTheDocument();
    });
  });
});
