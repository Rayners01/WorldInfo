<script>
	import Line from "../lib/graph/Line.svelte";
	import Multiselect from "svelte-multiselect";

	export let name;

	export let api_path

	const code = window.location.pathname.toLowerCase().replace(`/${name.toLowerCase()}/`, "");
	let selected = [];
	const height = window.innerHeight*0.8;
	const width = Math.max(window.innerWidth*0.8, 1000);
	
	const fetchCountries = (async () => {
		const response = await fetch(process.env.API_URL + "list");
    	const obj = await response.json();
		let options = []
		Object.keys(obj).forEach(o => {
			options.push({
				label: obj[o]["name"],
				value: o
			})
		});
		const c = code.split("+");
		c.forEach(cd => {
			selected.push({ label: obj[cd.toUpperCase()]["name"], value: cd.toUpperCase() });
		});
		return options;
	})();

	const update = () => {
		let vals = []
		selected.forEach((o) => {
			vals.push(o.value);
		});
		const path = vals.join("+")
		window.location.href = `/${name.toLowerCase()}/` + path;
	}

	const options = {
			"title": `${name}`,
			"axes": {
				"bottom": {
					"title": "Date",
					"mapsTo": "key",
					"scaleType": "labels"
				},
				"left": {
					"mapsTo": "value",
					"scaleType": "linear"
				}
			},
			"height": `${height}px`,
			"width": `${width}px`
	}

	const onResize = () => {
		options.height = `${window.innerHeight*0.8}px`;
		options.width = `${Math.max(window.innerWidth*0.8, 1000)}px`;
	}

</script>

<style>
.container {
	display: flex;
	justify-content: center;
}
</style>

<main>
		{#await fetchCountries}
		Loading...
			{:then data} 
			<Multiselect id='country' --sms-text-color="#49c22b" --sms-max-height="200px" --sms-max-width="500px" options={data} bind:selected on:change={update}>
			</Multiselect>
		{/await}

	<div class="container">
		<Line api="linedata?indicator={api_path}&code={code}" options="{options}" />
	</div>
</main>

<svelte:window on:resize={onResize} />