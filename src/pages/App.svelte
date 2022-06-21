<script>
import Footer from "../lib/util/Footer.svelte";

import { Router, Route } from "svelte-navigator";
import Explorer from "./Explorer.svelte";
import Home from "./Home.svelte";
import Imports from "./CircleCharts/Imports.svelte";
import Exports from "./CircleCharts/Exports.svelte";
import Polls from "./LineCharts/Polls.svelte";
import Line from "./LineCharts/WBLine.svelte";
import Election from "./Election.svelte";

export let location, navigate;
location = "";
navigate = "";
</script>

<Router primary={false}>
    <Route path="/" component={Home} />
    <Route path="explorer" component={Explorer} />
    <Route path="line/:api_path/:code" component={Line} />
    <Route path="import/:code/:year" component={Imports} />
    <Route path="export/:code/:year" component={Exports} />
    <Route path="poll/:party" component={Polls} />
    <Route path="ge/:year" component={Election} />
</Router>
<Footer />