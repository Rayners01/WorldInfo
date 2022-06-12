<script>
    import Header from "../lib/util/Header.svelte";
	import Line from "../lib/graph/Line.svelte";
	import Multiselect from "svelte-multiselect";

	const code = window.location.pathname.replace("/population/", "");
	let selected = [];
	const height = window.innerHeight*0.8;
	const width = window.innerWidth*0.8;
	const fetchCountries = (async () => {
		const response = await fetch(process.env.API_URL + "list");
    	const obj = await response.json();
		let options = []
		Object.keys(obj).forEach(o => {
			options.push({
				label: obj[o],
				value: o
			})
		});
		const c = code.split("+");
		c.forEach(cd => {
			selected.push({ label: obj[cd.toUpperCase()], value: cd.toUpperCase() });
		});
		return options;
	})();
	const update = () => {
		let vals = []
		selected.forEach((o) => {
			vals.push(o.value);
		});
		const path = vals.join("+")
		window.location.href = "/population/" + path;
	}
</script>

<style>
#container {
	display: flex;
	justify-content: center;
}
</style>

<main>
	<Header />
		{#await fetchCountries}
		Loading...
			{:then data} 
			<Multiselect id='country' --sms-text-color="#49c22b" --sms-max-width="400px" options={data} bind:selected on:change={update}>
			</Multiselect>
		{/await}

	<div id="container">
		<Line api="population?code={code}" options="{{
			"title": "Population",
			"axes": {
				"bottom": {
					"title": "Date",
					"mapsTo": "key",
					"scaleType": "labels"
				},
				"left": {
					"mapsTo": "value",
					"title": "Population",
					"scaleType": "linear"
				}
			},
			"height": `${height}px`,
			"width": `${width}px`
		}}" />
	</div>
</main>