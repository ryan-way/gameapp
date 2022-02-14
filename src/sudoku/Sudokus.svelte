<script lang='ts'>
  import { getContext } from "svelte";
  import { Sudoku } from '../data/sudoku';
  import { Link } from "svelte-routing";
  import Board from "../common/Board.svelte";
  import { IDatabase, IRepository, key } from "../service/database";

  const data = getContext(key) as IDatabase;
  const repo: IRepository<Sudoku.Sudoku> = data.GetRepository(new Sudoku.Sudoku());
  let games: Promise<Sudoku.Sudoku[]> = repo.GetAll();

  const gameLink: string = '/sudoku/';
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