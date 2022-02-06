export type TBValue = ' ' | 'X' | 'O';

export type TestBoard = [
  [{ Value: TBValue }, { Value: TBValue }, { Value: TBValue }],
  [{ Value: TBValue }, { Value: TBValue }, { Value: TBValue }],
  [{ Value: TBValue }, { Value: TBValue }, { Value: TBValue }]
];

export interface ITestEntity {
  id: number;
  board: TestBoard;
}
