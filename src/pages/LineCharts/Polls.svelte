<script>

import Footer from "../../lib/util/Footer.svelte";
import Header from "../../lib/util/Header.svelte";
import Line from "../../lib/graph/Line.svelte";

export let party;

if (party === "all") party = "con+lab+reform+green+libdem+snp"

const height = window.innerHeight*0.8;
const width = Math.max(window.innerWidth*0.8, 1000);

</script>

<style>
.container {
    display: flex;
	justify-content: center;
}
</style>

<Header />
<div class="container">
<Line api="poll?party={party}" options="{{
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