<script lang="ts">
  import { SudokuSolver } from '../ai/sudokusolver';
  import Board from '../components/Board.svelte';
  import { SudokuRepository } from '../repository/sudoku';
  
  export let repo = new SudokuRepository();
  export let id: number;

  let game = repo.GetOne(id);

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
