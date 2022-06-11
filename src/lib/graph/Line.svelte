<script>

	import { LineChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
	import { getDarkMode } from "../../store.js";

	export let api;
	export let options;

	const fetchData = (async () => {
		const response = await fetch(process.env.API_URL + api);
    	return await response.json();
	})();

	const dark = getDarkMode() ? "g90" : "white";

</script>

{#await fetchData}
<p>Loading...</p>
{:then data}
<LineChart
	data={data.data}
	options={options}
	data-carbon-theme={dark}
	/>
{/await}
