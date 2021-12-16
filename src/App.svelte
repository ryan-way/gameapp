<script lang="ts">
  import { Router, Link, Route } from 'svelte-routing';

  import Home from './Home.svelte';
  import About from './About.svelte';
  import Blog from './Blog.svelte';

  export let url: string = '/';
</script>

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
