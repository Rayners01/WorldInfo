<script>

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
	import { getDarkMode, getThemeStore } from "../../store.js";

	export let api;
	export let options;

	let source;

	const fetchData = (async () => {
		const response = await fetch(process.env.API_URL + api);
    	const json =  await response.json();
		options.axes.left.title = json.info.value
		source = json.info.source
		return json;
	})();

	let dark;

	getThemeStore().subscribe((b) => {
		dark = b ? "g90" : "white";
	})

</script>

<style>
.source {
	position: relative;
}
.container {
	position: absolute;
}
</style>

{#await fetchData}
<p>Loading...</p>
{:then data}
<div class="container">
<LineChart
	data={data.data}
	options={options}
	data-carbon-theme={dark}
	/>
</div>
<div class="source">
	<p>Source: {source}</p> 
</div>
{/await}
