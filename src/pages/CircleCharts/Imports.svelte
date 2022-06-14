<script>
import Circle from "../../lib/graph/Circle.svelte";
import Header from "../../lib/util/Header.svelte";

export let code;
export let year;

</script>


<Header />

<Circle api="trade?code={code}&year={year}&type=1" options={{
	"title": "Imports (US$)",
	"canvasZoom": {
		"enabled": true
	}
}}/>