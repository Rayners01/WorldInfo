<script>
	import Line from "../../lib/graph/Line.svelte";
	import Multiselect from "svelte-multiselect";
    import Header from "../../lib/util/Header.svelte";
    import { getCode } from "../../store.js";

	export let location, navigate;
	location = "";
	navigate = "";

	export let api_path;
	export let code;

    getCode().set(code);

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
		if (selected.length == 0) {
			return;
		}
		let vals = []
		selected.forEach((o) => {
			vals.push(o.value);
		});
		const path = vals.join("+")
        getCode().set(path);
		window.history.replaceState({}, '', `/line/${api_path}/${path}`);
		//window.location.href = `/line/${api_path.toLowerCase()}/` + path;
	}

	const options = {
			"axes": {
				"bottom": {
					"title": "Date",
					"mapsTo": "key",
					"scaleType": "time"
				},
				"left": {
					"mapsTo": "value",
					"scaleType": "linear"
				}
			},
			"height": `${height}px`,
			"width": `${width}px`
	}

	let align;

	const setAlign = (() => align = window.innerWidth >= 1020 ? "center" : "left");

	setAlign();

	const onResize = () => {
		options.height = `${window.innerHeight*0.8}px`;
		options.width = `${Math.max(window.innerWidth*0.8, 1000)}px`;
		setAlign();
	}

</script>

<style>
.container {
	display: flex;
	justify-content: var(--align);
}

.country-container {
	margin-left: 5%;
}
</style>

<Header />

<div class="country-container">
{#await fetchCountries}
Loading...
	{:then data} 
	<Multiselect id='country' --sms-text-color="#49c22b" --sms-max-height="200px" --sms-max-width="500px" options={data} bind:selected on:change={update}>
	</Multiselect>
{/await}
</div>

<div class="container" style="--align: {align};">
	<Line api="linedata?indicator={api_path}&code=" code="{code}" options="{options}" />
</div>

<svelte:window on:resize={onResize} />