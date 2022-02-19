/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import TestGames from '../src/testgame/TestGames.svelte';
import testdata from '../src/main/testdata';
import { overrides } from '../src/service';
import { mock, instance, when } from 'ts-mockito';
import type { IDatabase, IRepository } from '../src/service/database';
import { Test, instance as inst } from '../src/data/test';

const testgames = testdata.get(Test.Test.name).map((board, idx) => {
  return { id: idx, board: board } as unknown as Test.Test;
});

const promise = Promise.resolve(testgames);

const mockedRepo: IRepository<Test.Test> = mock<IRepository<Test.Test>>();
when(mockedRepo.GetAll()).thenReturn(promise);
const repo: IRepository<Test.Test> = instance(mockedRepo);

const mockedData: IDatabase = mock<IDatabase>();
when(mockedData.GetRepository<Test.Test>(inst)).thenReturn(repo);
const data: IDatabase = instance(mockedData);
overrides.data.set(data);

const results = render(TestGames);

test('should render TestGame', () => {
  for (let i = 1; i <= testgames.length; i++) {
    expect(() => results.findByText(1)).not.toThrow();
  }
});
