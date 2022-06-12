<script>
import Footer from "../lib/util/Footer.svelte";

import { Router, Route } from "svelte-navigator";
import Explorer from "./Explorer.svelte";
import Home from "./Home.svelte";
import Gdp from "./LineCharts/GDP.svelte";
import Population from "./LineCharts/Population.svelte";
import Unemployment from "./LineCharts/Unemployment.svelte";
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="population/:code" component={Population} />
	<Route path="explorer" component={Explorer} />
    <Route path="gdp/:code" component={Gdp} />
    <Route path="unemployment/:code" component={Unemployment} />
</Router>

<Footer />