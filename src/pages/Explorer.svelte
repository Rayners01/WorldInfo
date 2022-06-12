<script>
import Header from "../lib/util/Header.svelte";


import Card from "../lib/util/Card.svelte";

</script>

<style>

.flex-container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
}

</style>

<Header />

<div class="flex-container">
    <Card title="Population" body="Explore population" link="/population/gb"/>
    <Card title="GDP" body="Explore GDP" link="/gdp/gb"/>
    <Card title="Unemployment" body="Explore Unemployment" link="/unemployment/gb"/>
</div>