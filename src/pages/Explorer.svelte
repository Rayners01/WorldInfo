<script>
import Header from "../lib/util/Header.svelte";
import Card from "../lib/util/Card.svelte";
import Circle from "../lib/util/Circle.svelte";

const promise = (async () => {
  const response = await fetch(process.env.API_URL + "explorer");
  return response.json();
})();

export let location, navigate;
location = "";
navigate = "";

</script>

<style>

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h2 {
  text-align: center;
  margin: 5px;
}

</style>

<Header />

{#await promise}
<Circle />
{:then data} 
<h2>General</h2>

<div class="flex-container">
{#each data["general"] as datum}
<Card title={datum.title} body={datum.description} link={datum.slug}/>
{/each}
</div>

<h2>Economy</h2>

<div class="flex-container">
{#each data["economy"] as datum}
<Card title={datum.title} body={datum.description} link={datum.slug}/>
{/each}
</div>

<h2>Politics</h2>
<div class="flex-container">
{#each data["politics"] as datum}
<Card title={datum.title} body={datum.description} link={datum.slug}/>
{/each}
</div>
{/await}


