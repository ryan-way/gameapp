<script lang="ts">
  import { getContext } from 'svelte';
  import { Link } from 'svelte-routing';
  import type { Test } from '../data/test';
  import Board from '../common/Board.svelte';
  import { IDatabase, key as dbKey } from "../service/database";
  
  const db: IDatabase = getContext(dbKey);
  let games: Promise<Test.Test[]> = db.getTestEntities();
  
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
