<script lang="ts">
  import { onMount } from 'svelte';
  import { SudokuSolver } from '../ai/sudokusolver';
  import Board from './layout/Board.svelte';
  import type { Sudoku } from '../dto/sudoku';
  import { Board as Puzzle, Value } from '../dto/sudoku';
  import { SudokuRepository } from '../repository/sudoku';
  import { SudokuChecker } from '../validation/sudokuchecker';
  import { log } from '../service/service';

  export let repo = new SudokuRepository();
  export let id: number;

  let game: Sudoku;
  let solver: SudokuSolver;
  let checker: SudokuChecker;
  let showSolution = false;
  let howAmIDoing = '';
  let selectedNum: Value = Value.One;
  let board: Puzzle;

  onMount(async () => {
    try {
      game = await repo.GetOne(id);
      board = [...game.board];
      for (var i = 0; i < 9; i++) {
        board[i] = [...board[i]];
      }
      for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
          board[i][j] = { Value: board[i][j].Value };
        }
      }
      checker = new SudokuChecker(game.board);
      solver = new SudokuSolver(game.board);
      solver.Solve();
    } catch (e) {
      log().Error(e.stack);
      log().Error(e);
    }
  });

  function Solve() {
    for (let i = 0; i < game.board.length; i++) {
      for (let j = 0; j < game.board[i].length; j++) {
        if (game.board[i][j].Value != ' ') continue;
        game.board[i][j].Value = solver.board[i][j].Value;
      }
    }
  }

  function Hint() {
    for (let i = 0; i < game.board.length; i++) {
      for (let j = 0; j < game.board[i].length; j++) {
        if (game.board[i][j].Value != ' ') continue;
        game.board[i][j].Value = solver.board[i][j].Value;
        return;
      }
    }
  }

  function Check() {
    howAmIDoing = '...checking';
    setTimeout(() => {
      if (checker.Check()) {
        howAmIDoing = 'Great!';
      } else {
        howAmIDoing = 'Errors Found';
      }
      setTimeout(Clear, 1000);
    }, 1000);
  }

  function Clear() {
    howAmIDoing = '';
  }

  function Reset() {
    game.board = board;
    board = [...game.board];
    for (var i = 0; i < 9; i++) {
      board[i] = [...board[i]];
    }
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        board[i][j] = { Value: board[i][j].Value };
      }
    }
  }

  function UpdateSelectedNum({ key }) {
    if (Value[key]) selectedNum = key;
  }

  function onCellClick(idx) {
    let x = idx % 9;
    let y = Math.floor(idx / 9);
    if (board[y][x].Value !== ' ') return;
    game.board[y][x].Value =
      game.board[y][x].Value == selectedNum ? Value.Empty : selectedNum;
    game.board = game.board;
  }
</script>

<svelte:window on:keydown={UpdateSelectedNum} />

<sudoku>
  {#if game}
    <div class="boards" class:oneCol={!showSolution}>
      <Board border>
        {#each game.board.flat() as cell, idx}
          <div
            class="solved"
            data-testid="Board{Math.floor(idx / 9)}{idx % 9}"
            on:click={() => onCellClick(idx)}
          >
            {cell.Value}
          </div>
        {/each}
      </Board>
      {#if showSolution}
        <Board border>
          {#each solver.Board.flat() as cell}
            {#if cell.Candidates.length == 1}
              <div class="solved">{cell.Candidates}</div>
            {:else}
              <Board border rows={3} columns={3}>
                {#each cell.Candidates as candidate}
                  <div class="candidate">{candidate}</div>
                {/each}
              </Board>
            {/if}
          {/each}
        </Board>
      {/if}
    </div>
    <div class="numpad">
      <Board rows={3} columns={3}>
        {#each Array.from(Array(9).keys()).map(x => x + 1) as num, idx}
          <div
            class:selected={num == selectedNum}
            class="num"
            on:click={() => UpdateSelectedNum({ key: `${num}` })}
          >
            {num}
          </div>
        {/each}
      </Board>
    </div>
    <div class="features">
      <button on:click={Solve}>Solve</button>
      <button on:click={Hint}>Hint</button>
      <button on:click={Reset}>Reset</button>
      <button on:click={Check}>How Am I Doing?</button>
      {#if howAmIDoing} {howAmIDoing} {/if}
    </div>
    <div class="options">
      <span>
        <input type="checkbox" bind:checked={showSolution} />
        Show Solution
      </span>
    </div>
  {:else}
    <p>...loading</p>
  {/if}
</sudoku>

<style>
  div.options {
    display: flex;
    justify-content: center;
  }
  div.options span input {
    margin-right: 5px;
  }
  div.features {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
  }
  div.features button {
    margin: 5px;
  }
  div.numpad {
    margin: 20px;
    display: flex;
    justify-content: center;
    font-size: 40px;
  }
  div.selected {
    color: black;
    background: orange;
  }
  div.num {
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
  }
  div.boards {
    width: 900px;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
  }
  div.oneCol {
    grid-template-columns: 50%;
  }
  button {
    align-self: center;
  }
  div.solved {
    font-size: 40px;
    display: flex;
    border: 0.25px solid;
    justify-content: center;
    align-items: center;
  }
  div.candidate {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: small;
  }
</style>
