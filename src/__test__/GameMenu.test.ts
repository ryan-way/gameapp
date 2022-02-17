/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import GameMenu from '../GameMenu.svelte';

test('should render Game Menu', () => {
  const results = render(GameMenu);

  expect(() => results.getByText('Sudoku')).not.toThrow();
});
