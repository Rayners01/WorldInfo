<script>
import Footer from "../lib/util/Footer.svelte";

import { Router, Route } from "svelte-navigator";
import Explorer from "./Explorer.svelte";
import Home from "./Home.svelte";
import Gdp from "./LineCharts/GDP.svelte";
import Population from "./LineCharts/Population.svelte";
import Unemployment from "./LineCharts/Unemployment.svelte";
import Imports from "./CircleCharts/Imports.svelte";
import Exports from "./CircleCharts/Exports.svelte";
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="population/:code" component={Population} />
	<Route path="explorer" component={Explorer} />
    <Route path="gdp/:code" component={Gdp} />
    <Route path="unemployment/:code" component={Unemployment} />
    <Route path="import/:code/:year" component={Imports} />
    <Route path="export/:code/:year" component={Exports} />
</Router>

<Footer />