import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageName from '../components/PageName';

describe('PageName', () => {
  it('renders provided title', () => {
    render(<PageName title="Տրանսպորտ. միջոցներ" />);
    expect(screen.getByText('Տրանսպորտ. միջոցներ')).toBeInTheDocument();
  });
});
