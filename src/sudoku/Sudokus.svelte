<script lang='ts'>
  import { getContext } from "svelte";
  import { Window, key } from "../window";
  import type { ISudokuEntity } from '../ipc/entity/ISudokuEntity';
  import { Link } from "svelte-routing";
  import Board from "../Board.svelte";

  const data: Window = getContext(key);

  let games: Promise<ISudokuEntity[]> = data.db.getSudokuEntities();
  const gameLink: string = '/sudoku/';

  games.then(game => {
    console.log(game[0].board[0][0]);
  })
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