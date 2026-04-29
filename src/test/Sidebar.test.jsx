import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Sidebar from '../components/Sidebar';

function createManager() {
  return {
    mode: 'grid',
    setMode: vi.fn(),
    windows: [
      { id: 'w1', title: 'Window 1', minimized: true, closed: false },
      { id: 'w2', title: 'Window 2', minimized: false, closed: true },
    ],
    restoreWindow: vi.fn(),
    backendFavorites: [],
    localFavorites: [],
    saveLocalFavorite: vi.fn(),
    saveBackendFavorite: vi.fn(),
    removeBackendFavorite: vi.fn(),
    removeLocalFavorite: vi.fn(),
    clearLocalFavorites: vi.fn(),
    clearBackendFavorites: vi.fn(),
    applyPayload: vi.fn(),
  };
}

describe('Sidebar', () => {
  it('switches desktop buttons', () => {
    const onDesktopChange = vi.fn();
    render(
      <Sidebar manager={createManager()} activeDesktop="desktop-1" onDesktopChange={onDesktopChange} token="" />
    );

    fireEvent.click(screen.getByTitle('Փաստաթղթեր'));
    expect(onDesktopChange).toHaveBeenCalledWith('desktop-2');
  });

  it('shows minimized badge when minimized windows exist', () => {
    render(<Sidebar manager={createManager()} activeDesktop="desktop-1" onDesktopChange={() => {}} token="" />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
