<script>
import Header from "../lib/util/Header.svelte";


import Card from "../lib/util/Card.svelte";

</script>

<style>

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

h2 {
  text-align: center;
  margin: 5px;
}

</style>

<Header />

<h2>General</h2>

<div class="flex-container">
    <Card img_path="assets/population.png" title="Population" body="View or compare population figures." link="/line/population/gb"/>
    <Card img_path="assets/poverty.png" title="Poverty (relative)" body="View or compare poverty figures." link="/line/pov_rel/gb"/>
</div>

<h2>Economic</h2>

<div class="flex-container">
  <Card img_path="assets/gdp.png" title="GDP" body="View or compare GDP figures." link="/line/gdp/gb"/>
  <Card img_path="assets/unemployment.png" title="Unemployment" body="View or compare unemployment figures." link="/line/unemployment/gb"/>
  <Card img_path="assets/exports.png" title="Exports" body="View a country's exports." link="/export/gb/2021"/>
  <Card img_path="assets/imports.png" title="Imports" body="View a country's imports." link="/import/gb/now"/>
  <Card img_path="assets/gdp.png" title="GDP Per Capita" body="View a country's GDP per capita." link="/line/gdp_pc/gb"/>
</div>

<h2>Political</h2>
<div class="flex-container">
  <Card img_path="assets/poll.png" title="UK Opinion Polls" body="View political polls in the UK." link="/poll/all" />
  <Card img_path="../../assets/explorer/election.png" title="UK 2019 General Election" body="View 2019 GE results by constituency." link="/ge_2019" />
</div>