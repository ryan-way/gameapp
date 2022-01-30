<script lang="ts">export let data: any[][];
  export let fontSize: string;
  export let height: string;
  export let width: string;

</script>

<table style="font-size: {fontSize}; height: {height}; width: {width};">
  {#each data as row, y}
    <tr>
      {#each row as cell, x}
        <td>{cell}</td>
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
