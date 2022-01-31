<script lang="ts">
  import { getContext } from 'svelte';
  import { Link } from 'svelte-routing';
  import { Window, key as windowKey } from '../window';
  import type { ITestEntity } from '../ipc/entity/ITestEntity';
  import Board from '../Board.svelte';

  const data: Window = getContext(windowKey);

  let games: Promise<ITestEntity[]> = data.db.getTestEntities();
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
