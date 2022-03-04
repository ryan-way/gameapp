<script lang="ts">
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

  import { SudokuSolver } from '../ai/sudokusolver';
  import Board from '../components/Board.svelte';
  import type { Sudoku } from '../data/sudoku';
  import { SudokuRepository } from '../repository/sudoku';

  export let repo = new SudokuRepository();
  export let id: number;

  let game: Sudoku.Sudoku;
  let solver: SudokuSolver;


  onMount(async () => {
    game = await repo.GetOne(id);
    solver = new SudokuSolver(game.board);
  })

  function SolveOne() {
    console.log('Solving One...');
    if (solver.SolveOne()) {
      console.log('Solved one');
      game = game;
    }
  }
</script>

{#if game}
  <Board fontSize="40px" height="500px" width="500px" data={game.board} />

  <button on:click={SolveOne}>Solve</button>
{:else}
  <p>...loading</p>
{/if}

<style>
  button {
    align-self: center;
  }
</style>
