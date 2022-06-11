<script>
	import Logo from "../lib/Logo.svelte";

    import Line from "../lib/graph/Line.svelte";
	import Settings from "../lib/Settings.svelte";
	const code = window.location.pathname.replace("/population/", "");
	const height = window.innerHeight*0.8;
	const width = window.innerWidth*0.8;
</script>

<style>
#container {
	display: flex;
	justify-content: center;
}

main {
	text-align: center;
    padding: 1em;
    margin: 0 auto;
}
</style>

<main>
<Settings />

<Logo size="4rem" align="center" />

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