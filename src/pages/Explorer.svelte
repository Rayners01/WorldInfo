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

<h2>Societal</h2>

<div class="flex-container">
    <Card title="Population" body="View or compare population figures." link="/line/population/gb"/>
    <Card title="Poverty (relative)" body="View or compare poverty figures." link="/line/pov_rel/gb"/>
</div>

<h2>Economic</h2>

<div class="flex-container">
  <Card title="GDP" body="View or compare GDP figures." link="/line/gdp/gb"/>
  <Card title="Unemployment" body="View or compare unemployment figures." link="/line/unemployment/gb"/>
  <Card title="Exports" body="View a country's exports." link="/export/gb/2021"/>
  <Card title="Imports" body="View a country's imports." link="/import/gb/now"/>
</div>

<h2>Political</h2>
<div class="flex-container">
  <Card title="UK Opinion Polls" body="View political polls in the UK." link="/poll/all" />
</div>