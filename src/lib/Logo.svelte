<script>
    import logo from '../assets/world.png';

    export let size = "16rem";
    export let align = "center";
</script>

<div style="--align: {align};">
  <a href="/">
    <img src={logo} style="--size: {size};" alt="WorldInfo logo" />
  </a>
</div>

<style>
  img {
    height: var(--size);
    position: relative;
  }
  div {
    display: flex;
    justify-content: var(--align);
    padding: 10px;
  }
</style>