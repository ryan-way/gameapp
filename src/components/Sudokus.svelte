<script lang="ts">
  import { onMount } from 'svelte';

  import Board from './layout/Board.svelte';
  import type { Sudoku } from '../data/sudoku';
  import { SudokuRepository } from '../repository/sudoku';

  export let repo = new SudokuRepository();
  let games: Sudoku.Sudoku[];

  const gameLink: string = '/sudoku/';

  onMount(async () => {
    games = await repo.GetAll();
  });
</script>

{#if games}
  {#each games as game}
    <a href={gameLink + game.id}>
      <p style="text-align: left;">{game.id}</p>
      <Board>
        {#each game.board.flat() as cell}
          <td>{cell.Value}</td>
        {/each}
      </Board>
    </a>
  {/each}
{:else}
  <p>...fetching games</p>
{/if}

<style>
  td {
    display: flex;
    border: 0.25px solid;
    justify-content: center;
    align-items: center;
  }
</style>
