/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/svelte';
import { Test } from '../src/data/test';
import testdata from '../src/main/testdata';
import { mock, instance, when } from 'ts-mockito';
import { TestGameRepository } from '../src/repository/testgame';
import TestGame from '../src/testgame/TestGame.svelte';
import { fireEvent } from '@testing-library/dom';

test('should render Test Game', () => {
  const test = testdata
    .get(Test.Test.name)
    .map((board, idx) => {
      return { id: idx, board: board } as unknown as Test.Test;
    })
    .at(0);
  const list = test.board.flat().map(cell => cell.Value);
  const values = new Set<Test.Value>(list);
  const mockedRepo = mock(TestGameRepository);
  when(mockedRepo.GetOne(1)).thenResolve(test);
  const results = render(TestGame, { repo: instance(mockedRepo), id: 1 });
  expect(() => {
    values.forEach(value => {
      results.findAllByAltText(value).then(items => {
        expect(items).toHaveLength(list.filter(x => x == value).length);
      });
    });
  }).not.toThrow();
});

test('should take turn', async () => {
  const test = testdata
    .get(Test.Test.name)
    .map((board, idx) => {
      return { id: idx, board: board } as unknown as Test.Test;
    })
    .at(0);
  const mockedRepo = mock(TestGameRepository);
  when(mockedRepo.GetOne(1)).thenResolve(test);
  const { findByTestId } = render(TestGame, {
    repo: instance(mockedRepo),
    id: 1,
  });
  let cell = await findByTestId('Board02');
  await fireEvent.click(cell);
  cell = await findByTestId('Board02');
  expect(cell).toHaveTextContent('X');
});
