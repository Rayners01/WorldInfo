<script>
    import settings_icon from '../assets/settings.svg'
    import Overlay from './Overlay.svelte'
    export const duration = "2s"

    let current = false;

    let active = false;

    function action() {
      active = !active;
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
  background: white;
}

</style>

  
<div class="container">

  <span on:click={action} on:mouseenter={() => current = true} on:mouseleave={() => current = false}>
    <img class="{current ? 'icon hover' : 'icon'}" style="--duration: {duration}" src={settings_icon} alt="Settings">
  </span>

</div>

{#if active}
<Overlay />
<div class="settings-container">
  <div class="settings">
    <p>Settings</p>
  </div>
</div>
{/if}
