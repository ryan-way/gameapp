<script lang="ts">
  import { onMount } from 'svelte';

  import Board from '../components/Board.svelte';
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
  <Board
    on:cellClick={event => onClick(event.detail.cell)}
    fontSize="120px"
    height="500px"
    width="500px"
    data={game.board}
  />
{:else}
  <p>...loading game</p>
{/if}

<style>
</style>
