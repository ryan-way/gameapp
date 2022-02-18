/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import GameMenu from '../GameMenu.svelte';

test('should render Sudoku Option', () => {
  const results = render(GameMenu);

  expect(() => results.getByText('Sudoku')).not.toThrow();
});

test('should render TestGame Option', () => {
  const results = render(GameMenu);

  expect(() => results.getByText('Test Game')).not.toThrow();
});
