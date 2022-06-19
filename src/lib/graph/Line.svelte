<script>

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
	import { getCode, getThemeStore } from "../../store.js";
	import Switch from "../util/Switch.svelte";

	import Circle from "../util/Circle.svelte";

	export let code;
	export let api;
	export let options;

	let source;

	let log = false;

	const fetchData = (async () => {
		const response = await fetch(process.env.API_URL + api + code);
    	const json =  await response.json();
		if (json.info) {
			options.axes.left.title = json.info.value;
			options.title = json.info.value;
			source = json.info.source;
			return json.data
		}
		return json;
	});

	const toggle = () => {
		options.axes.left.scaleType = log ? "log" : "linear";
	}

	let dark;

	getThemeStore().subscribe((b) => {
		dark = b ? "g90" : "white";
	})

	let promise = fetchData();

	getCode().subscribe((c) => {
		code = c;
		promise = fetchData();
	});

</script>

<style>
.source {
	position: relative;
}
.container {
	position: absolute;
}
</style>

{#await promise}
<LineChart
	options={options}
	data-carbon-theme={dark}
	/>
	<Circle color="#3977e3" />
{:then data}
<div class="container">
<Switch bind:value={log} onClick={(() => toggle())} label="Logarithmic" fontSize={24} design="slider" />
<LineChart
	data={data}
	options={options}
	data-carbon-theme={dark}
	/>
</div>
{#if source}
<div class="source">
	<p>Source: {source}</p> 
</div>
{/if}
{/await}
