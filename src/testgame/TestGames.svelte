<script lang="ts">
  import { onMount } from 'svelte';

  import Board from '../components/Board.svelte';
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
      <p style="text-align: center;">{game.id}</p>
      <Board data={game.board} />
    </a>
  {/each}
{:else}
  <p>...fetching games</p>
{/if}

<style></style>
