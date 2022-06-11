<script>

  export let text;
  const go = () => {
    console.log("Go!")
  }
</script>

<a href="/population/gb">
<button on:click={go}>
  {text}
</button>
</a>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #187801;
    background-color: #caffbd;
    border-radius: 2em;
    border: 2px solid #caffbd;
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #33fc03;
  }

  button:active {
    background-color: #9cde8c;
  }
</style>
