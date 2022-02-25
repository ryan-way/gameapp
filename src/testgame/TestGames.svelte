<script lang="ts">
  import { links } from 'svelte-routing';
  import Board from '../components/Board.svelte';
  import type { Test } from '../data/test';
  import { TestGameRepository } from '../repository/testgame';

  export let repo = new TestGameRepository();
  let games: Promise<Test.Test[]> = repo.GetAll();

  const gameLink: string = '/testgame/';
</script>

<div use:links>
  {#await games}
    <p>...fetching games</p>
  {:then entities}
    {#each entities as entity}
      <a href={gameLink + entity.id}>
        <p style="text-align: center;">{entity.id}</p>
        <Board data={entity.board} />
      </a>
    {/each}
  {:catch error}
    <p style="color:red">{error.message}</p>
  {/await}
</div>

<style></style>
