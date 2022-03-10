<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Cell } from '../data/cell';

  export let data: Cell<any>[][];
  export let fontSize: string = '';
  export let height: string = 'auto';
  export let width: string = 'auto';

  const dispatch = createEventDispatcher();

  function onCellClick(cell: Cell<any>) {
    dispatch('cellClick', {
      cell: cell,
    });
  }
</script>

<table style="font-size: {fontSize}; height: {height}; width: {width}; display:inline-table">
  {#each data as row, y}
    <tr>
      {#each row as cell, x}
        <td on:click={() => onCellClick(cell)} data-testid={`Board${y}${x}`}
          >{cell.Value}</td
        >
      {/each}
    </tr>
  {/each}
</table>

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
