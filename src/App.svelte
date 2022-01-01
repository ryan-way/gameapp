<script lang="ts">
  import type { ITestEntity } from './ipc/entity/ITestEntity';

  export let name: string;
  export let promise: Promise<ITestEntity[]>;
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
  {#await promise}
    <p>...waiting</p>
  {:then entities}
    {#each entities as entity}
      <p>{entity.id}</p>
      <table class="center">
        {#each entity.board as row}
          <tr>
            {#each row as cell}
              <td class="border">{cell}</td>
            {/each}
          </tr>
        {/each}
      </table>
    {/each}
  {:catch error}
    <p style="color:red">{error.message}</p>
  {/await}
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  table.center {
    margin-left: auto;
    margin-right: auto;
  }

  td.border {
    border: 1px solid black;
  }
</style>
