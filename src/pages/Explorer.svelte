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

h2 {
  text-align: center;
  margin: 5px;
}

</style>

<Header />

<h2>Line Charts</h2>

<div class="flex-container">
    <Card title="Population" body="View or compare population figures." link="/population/gb"/>
    <Card title="GDP" body="View or compare GDP figures." link="/gdp/gb"/>
    <Card title="Unemployment" body="View or compare unemployment figures." link="/unemployment/gb"/>
</div>

<h2>Circle Charts</h2>
<div class="flex-container">
  <Card title="Exports" body="View a country's exports." link="/export/gb/2021"/>
  <Card title="Imports" body="View a country's imports." link="/import/gb/now"/>
</div>