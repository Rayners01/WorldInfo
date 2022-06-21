<script>

import Election from "../lib/graph/map/Constituency.svelte";

export let year;

export let location, navigate;
location = "";
navigate = "";

</script>

<Election year="{year}" />