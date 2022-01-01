<script lang="ts">
  import { Router, Link, Route } from 'svelte-routing';
  import type { ITestEntity } from './ipc/entity/ITestEntity';

  export let promise: Promise<ITestEntity[]>;

  import Home from './Home.svelte';
  import About from './About.svelte';
  import Blog from './Blog.svelte';

  export let url: string = '/';
</script>

<main>
  <Router {url}>
    <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="blog">Blog</Link>
    </nav>
    <div>
      <Route path="blog" component={Blog} />
      <Route path="about" component={About} />
      <Route path="/"><Home /></Route>
    </div>
  </Router>
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
  table.center {
    margin-left: auto;
    margin-right: auto;
  }

  td.border {
    border: 1px solid black;
  }
</style>
