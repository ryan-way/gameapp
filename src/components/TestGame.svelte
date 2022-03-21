<script lang="ts">
  import { onMount } from 'svelte';
  import Board from './layout/Board.svelte';
  import type { Cell } from '../data/cell';
  import type { Test } from '../data/test';
  import { TestGameRepository } from '../repository/testgame';

  export let repo = new TestGameRepository();
  export let id: number;

  let game: Test.Test;
  let turn: 'X' | 'O' = 'X';

  onMount(async () => {
    game = await repo.GetOne(id);
  });

  function onClick(cell: Cell<any>) {
    cell.Value = turn;
    turn = turn == 'X' ? 'O' : 'X';
    game = game;
  }
</script>

{#if game}
  <Board rows={3} columns={3}>
    {#each game.board.flat() as cell, idx}
      <td
        class="solved"
        on:click={() => onClick(cell)}
        data-testid="Board{Math.floor(idx / 9)}{idx % 9}"
      >
        {cell.Value}
      </td>
    {/each}
  </Board>
{:else}
  <p>...loading game</p>
{/if}

<style>
  td {
    display: flex;
    border: 0.25px solid;
    justify-content: center;
    align-items: center;
    font-size: 40px;
  }
</style>
