<script>
import Logo from '../lib/Logo.svelte';
import Button from '../lib/Button.svelte';
import Settings from '../lib/Settings.svelte';
</script>

<main>

  <Settings />
  <Logo />
  <h1>WorldInfo</h1>

  <Button text="Let's go!" href="/explorer"/>

  <p>
    Welcome to <a href="https://worldinfo.co.uk">WorldInfo</a>!
  </p>

  <p>
    Click the button to enter the data explorer.
  </p>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #49c22b;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem ;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  a {
    color: #49c22b;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>