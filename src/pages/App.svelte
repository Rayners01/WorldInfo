<script>
import { Router, Route } from "svelte-navigator";
import Home from "./Home.svelte";
import Population from "./Population.svelte";
</script>

<Router>
    <Route path="/" component={Home} />
    <Route path="population/:code" component={Population} />
</Router>