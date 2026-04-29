import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import TopNav from '../components/TopNav';

vi.mock('react-bootstrap/Offcanvas', () => {
  const Offcanvas = ({ children, show }) => (show ? <div data-testid="offcanvas">{children}</div> : null);
  Offcanvas.Header = ({ children }) => <div>{children}</div>;
  Offcanvas.Title = ({ children }) => <div>{children}</div>;
  Offcanvas.Body = ({ children }) => <div>{children}</div>;
  return { default: Offcanvas };
});

describe('TopNav', () => {
  it('renders nothing when user is missing', () => {
    const { container } = render(
      <MemoryRouter>
        <TopNav user={null} onLogout={() => {}} setTheme={() => {}} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it('opens account menu and triggers logout', () => {
    const onLogout = vi.fn();
    render(
      <MemoryRouter initialEntries={['/transport']}>
        <TopNav user={{ name: 'Test', email: 'test@example.com' }} onLogout={onLogout} setTheme={() => {}} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Test'));
    fireEvent.click(screen.getByRole('button', { name: /log out/i }));

    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});
