<script lang="ts">
  import { onMount } from 'svelte';

  import Board from './layout/Board.svelte';
  import type { Test } from '../data/test';
  import { TestGameRepository } from '../repository/testgame';

  export let repo = new TestGameRepository();
  let games: Test.Test[];

  const gameLink: string = '/testgame/';

  onMount(async () => {
    games = await repo.GetAll();
  });
</script>

{#if games}
  {#each games as game}
    <a href={gameLink + game.id}>
      <p style="text-align: left;">{game.id}</p>
      <Board rows={3} columns={3}>
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
