<script>
    import settings_icon from '../assets/settings.svg'
    import Overlay from './Overlay.svelte'
    import Switch from './util/Switch.svelte';
    import { get } from 'svelte/store';
    import { theme } from '../store.js';
    export const duration = "2s"

    let current = false;

    let active = false;

    let vartheme = get(theme);

    function action() {
      active = !active;

    }

    function toggle() {
      theme.set(vartheme);
    }
</script>

<style>

.icon {
  height: 40px;
}

.hover {
  animation: var(--duration) linear 0s infinite normal none running rotate;
}

.container {
  float: left;
  position: absolute;
  z-index: 2;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

.settings-container {
  position: absolute; 
  z-index: 1000;
  left: 0; 
  right: 0; 
  margin-left: auto; 
  margin-right: auto;
  width: 250px;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.settings {
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
}

.close {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  bottom: 40px;
  right: 220px;
  position: absolute;
  font-size: 20px;
}

.white {
  background-color: white;
}

.blank {
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

</style>

  
<div class="container">

  <button class="blank" on:click={action} on:mouseenter={() => current = true} on:mouseleave={() => current = false}>
    <img class="{current ? 'icon hover' : 'icon'}" style="--duration: {duration}" src={settings_icon} alt="Settings">
  </button>

</div>

{#if active}
<Overlay />
<div class="settings-container">
  <div class="{`settings${vartheme ? " dark-mode" : " white"}`}">
    <button class="close" on:click={action}>&#10006;</button>
    <Switch bind:value={vartheme} onClick={() => toggle()} label="Enable dark mode" fontSize={24} design="slider" />
  </div>
</div>
{/if}
