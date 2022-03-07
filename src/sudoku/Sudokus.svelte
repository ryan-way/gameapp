<script lang="ts">
  import { onMount } from 'svelte';

  import Board from '../components/Board.svelte';
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
      <p style="text-align: center;">{game.id}</p>
      <Board data={game.board} />
    </a>
  {/each}
{:else}
  <p>...fetching games</p>
{/if}

<style></style>
