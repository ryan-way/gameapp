<script lang="ts">
  import { SudokuSolver } from '../ai/sudokusolver';
  import Board from '../components/Board.svelte';
  import { Sudoku } from '../data/sudoku';
  import type { IRepository } from '../service/database';
  import { data } from '../service';

  export let id: number;

  const repo: IRepository<Sudoku.Sudoku> = $data.GetRepository(
    new Sudoku.Sudoku()
  );
  let game: Promise<Sudoku.Sudoku> = repo.GetOne(id);

  let solver: SudokuSolver;
  game.then(entity => {
    solver = new SudokuSolver(entity.board);
  });

  function SolveOne() {
    game = game.then(entity => {
      console.log('Solving One...');
      if (solver.SolveOne()) {
        console.log('Solved one');
      }
      return entity;
    });
  }
</script>

{#await game}
  <p>...loading game</p>
{:then entity}
  <Board fontSize="40px" height="500px" width="500px" data={entity.board} />

  <button on:click={SolveOne}>Solve</button>
{/await}

<style>
  button {
    align-self: center;
  }
</style>
