<script>
	import { CirclePackChart } from "@carbon/charts-svelte";

	import "@carbon/styles/css/styles.css";
	import "@carbon/charts/styles.css";
    import { getThemeStore } from "../../store.js";
	import Circle from "../util/Circle.svelte";

    export let api;
    export let options;
	export let title;

	let total;

    const fetchData = (async () => {
		const response = await fetch(process.env.API_URL + api);
    	const json =  await response.json();
		options.title = title.replace("[country]", json["info"]["country"]).replace("[year]", json["info"]["year"]);
		total = json["info"]["total"];
		return json["dataset"];
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
.circle {
    display: flex;
	justify-content: center;
}

.container {
	position: absolute;
}

.total {
	text-align: center;
	position: relative;
}
</style>

{#await fetchData}
<Circle color="#3977e3" />
{:then data} 
<div class=circle>
<div class="container">
<CirclePackChart
data={data}
options={options}
data-carbon-theme={dark}
/>
</div>
</div>
<div class="total">
	<p>Total: ${total}</p> 
</div>
{/await}