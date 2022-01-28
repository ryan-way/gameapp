<script lang="ts">
  import { getContext } from 'svelte';
  import type { ITestEntity } from './ipc/entity/ITestEntity';
  import { Window, key } from './window';

  export let id: number;

  const data: Window = getContext(key);
  let game: Promise<ITestEntity> = data.db.getTestEntity(id);

  let turn: 'X' | 'O' = 'X';
  let name: string = 'Ryan';

  function onClick(x: number, y: number) {
    game = game.then(entity => {
      if (entity.board[x][y] != ' ') return entity;

      entity.board[x][y] = turn;
      turn = turn == 'X' ? 'O' : 'X';
      return entity;
    });
  }
</script>

{#await game}
  <p>...loading game</p>
{:then entity}
  <table class="center">
    {#each entity.board as row, x}
      <tr>
        {#each row as cell, y}
          <td on:click={() => onClick(x, y)}>{cell}</td>
        {/each}
      </tr>
    {/each}
  </table>
{/await}

<style>
  table {
    width: 500px;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
    font-size: 120px;
    text-align: center;
  }

  table,
  td {
    border: 1px solid;
    border-collapse: collapse;
  }
</style>
