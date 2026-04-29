import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders login screen when there is no auth token', () => {
    localStorage.clear();

    render(<App />);

    expect(screen.getByRole('heading', { name: /border customs dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
