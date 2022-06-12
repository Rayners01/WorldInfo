<script>

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
	import { getThemeStore } from "../../store.js";
	import Switch from "../util/Switch.svelte";
import { toggle_class } from "svelte/internal";

	export let api;
	export let options;

	let source;

	let log = false;

	const fetchData = (async () => {
		const response = await fetch(process.env.API_URL + api);
    	const json =  await response.json();
		options.axes.left.title = json.info.value
		source = json.info.source
		return json;
	})();

	const toggle = () => {
		options.axes.left.scaleType = log ? "log" : "linear";
	}

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
<Switch bind:value={log} onClick={(() => toggle())} label="Logarithmic" fontSize={24} design="slider" />
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
