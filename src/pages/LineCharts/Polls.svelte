<script>

import Footer from "../../lib/util/Footer.svelte";
import Header from "../../lib/util/Header.svelte";
import Line from "../../lib/graph/Line.svelte";
import { getCode } from "../../store.js";
import Multiselect from "svelte-multiselect";
import { select_options } from "svelte/internal";

export let party;

if (party === "all") party = "con+lab+reform+green+libdem+snp"

const height = window.innerHeight*0.8;
const width = Math.max(window.innerWidth*0.8, 1000);

const opts = [
	{
		label: "Conservatives",
		value: "con"
	},
	{
		label: "Labour",
		value: "lab"
	},
	{
		label: "Liberal Democrats",
		value: "libdem"
	},
	{
		label: "Green Party",
		value: "green"
	},
	{
		label: "SNP",
		value: "snp"
	},
	{
		label: "Reform UK",
		value: "reform"
	}
];

let selected = Array.from(party.split("+"), p => opts.find(q => q.value === p));

getCode().set(party);

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
	window.history.replaceState({}, '', `/poll/${path}`);
}

</script>

<style>
.container {
    display: flex;
	justify-content: center;
}
</style>

<Header />

<Multiselect id='poll' --sms-text-color="#49c22b" --sms-max-height="200px" --sms-max-width="500px" options={opts} bind:selected on:change={update}>
</Multiselect>

<div class="container">
<Line api="poll?party=" code="{party}" options="{{
    "title": "UK Polls since 2020",
	"axes": {
		"bottom": {
			"title": "Date conducted",
			"mapsTo": "date",
			"scaleType": "time"
		},
		"left": {
			"mapsTo": "value",
			"title": "Share (%)",
			"scaleType": "linear"
		}
	},
    "color" : {
        "scale": {
            "Conservatives": "#0390fc",
            "Labour": "#fc0303",
            "SNP": "#fff959",
            "Green Party": "#34fa3b",
            "Reform UK": "#34d5eb",
            "Liberal Democrats": "#fcbf17"
        }
    },
	"experimental": true,
	"zoomBar": {
		"top": {
			"enabled": true,
		    "initialZoomDomain": [
			    "2020-01-01T00:00:00.000Z",
			    "2022-07-01T00:00:00.000Z"
		    ]
		},
	},
	"height": `${height}px`,
    "width": `${width}px`
}}" />
</div>

<Footer />