<script lang="ts">
  import { getContext } from 'svelte';
  import { Link } from 'svelte-routing';
  import { Window, key as windowKey } from './window';
  import type { ITestEntity } from './ipc/entity/ITestEntity';

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
      <table>
        {#each entity.board as row}
          <tr>
            {#each row as cell}
              <td>{cell}</td>
            {/each}
          </tr>
        {/each}
      </table>
    </Link>
  {/each}
{:catch error}
  <p style="color:red">{error.message}</p>
{/await}

<style>
  table {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  table,
  td {
    border: 1px solid;
    border-collapse: collapse;
  }
</style>
