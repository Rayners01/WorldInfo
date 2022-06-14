<script>
	import { CirclePackChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
    import { getThemeStore } from "../../store.js";

    export let api;
    export let options;

    const fetchData = (async () => {
		const response = await fetch(process.env.API_URL + api);
    	const json =  await response.json();
		return json;
	})();

    let dark;

	getThemeStore().subscribe((b) => {
		dark = b ? "g90" : "white";
	})

    const height = window.innerHeight*0.8;
	const width = Math.max(window.innerWidth*0.8, 1000);

    options.height = `${height}px`;
    options.width = `${width}px`;

    //TODO: Add country select + year select.
</script>

<style>
.container {
    display: flex;
	justify-content: center;
}
</style>

{#await fetchData}
    Loading...
{:then data} 
<div class="container">
<CirclePackChart
data={data}
options={options}
data-carbon-theme={dark}
/>
</div>
{/await}