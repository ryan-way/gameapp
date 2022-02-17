<script lang="ts">
  import { links } from 'svelte-routing';
  import { Test } from '../data/test';
  import Board from '../common/Board.svelte';
  import type { IRepository } from '../service/database';
  import { data } from '../service';

  const repo: IRepository<Test.Test> = $data.GetRepository(new Test.Test());

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
