<script lang="ts">
  import { Link } from 'svelte-routing';
  import { Test } from '../data/test';
  import Board from '../common/Board.svelte';
  import type { IRepository } from '../service/database';
  import { data } from '../store';

  const repo: IRepository<Test.Test> = $data.GetRepository(new Test.Test());

  let games: Promise<Test.Test[]> = repo.GetAll();

  const gameLink: string = '/testgame/';
</script>

{#await games}
  <p>...fetching games</p>
{:then entities}
  {#each entities as entity}
    <Link to={gameLink + entity.id}>
      <p style="text-align: center;">{entity.id}</p>
      <Board data={entity.board} />
    </Link>
  {/each}
{:catch error}
  <p style="color:red">{error.message}</p>
{/await}

<style></style>
