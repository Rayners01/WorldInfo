<script>
import Header from "../lib/util/Header.svelte";


import Card from "../lib/util/Card.svelte";

</script>

<style>

.flex-container {
  display: flex;
  flex-wrap: nowrap;
}

</style>

<Header />

<div class="flex-container">
    <Card title="Population" body="Explore population" link="/population/gb"/>
    <Card title="Placeholder 1" body="Explore placeholder" link="/placeholder"/>
    <Card title="Placeholder 2" body="Explore placeholder" link="/placeholder"/>
    <Card title="Placeholder 3" body="Explore placeholder" link="/placeholder"/>
</div>