import { afterEach, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { App } from './app.js';

afterEach(cleanup);

it('shows the app name', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: 'Kanri' })).toBeDefined();
});
