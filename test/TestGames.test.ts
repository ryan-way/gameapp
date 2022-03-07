/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import TestGames from '../src/testgame/TestGames.svelte';
import testdata from '../src/main/testdata';
import { mock, instance, when } from 'ts-mockito';
import { Test } from '../src/data/test';
import { TestGameRepository } from '../src/repository/testgame';

test('should render Tests', () => {
  const tests = testdata.get(Test.Test.name).map((board, idx) => {
    return { id: idx, board: board } as unknown as Test.Test;
  });
  const mockedRepo = mock(TestGameRepository);
  when(mockedRepo.GetAll()).thenResolve(tests);
  const results = render(TestGames, { repo: instance(mockedRepo) });
  for (let i = 1; i <= tests.length; i++) {
    expect(() => results.findByText(1)).not.toThrow();
  }
});
