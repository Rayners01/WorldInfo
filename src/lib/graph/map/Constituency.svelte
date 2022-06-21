<script>
    import * as d3 from "d3";
    import Header from "../../util/Header.svelte"
    let dataset = [];
    import Circle from "../../util/Circle.svelte";

    export let year;

    d3.json(
       "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/Westminster_Parliamentary_Constituencies_December_2020_UK_BUC/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson"
    ).then((data) => {
       dataset = data["features"];
    });
    var width = 690,
      height = 950;
    let selected = {};
    let visible = false;
    let lastClicked;
    var projection = d3.geoAlbers()
      .center([1.5, 55.2])
      .rotate([4.4, 0])
      .parallels([50, 50])
      .scale(4950)
      .translate([width / 2, height / 2]);
    var path = d3.geoPath().projection(projection);
    const colour = {
      "con": "#0390fc",
      "lab": "#fc0303",
      "snp": "#fff959",
      "green": "#34fa3b",
      "ld": "#fcbf17",
      "pc": "#00ff80",
      "dup": "#782a2a",
      "sf": "#2b7552",
      "alliance": "#a88b32",
      "sdlp": "#014714",
      "spk": "#ffffff",
      "ind": "#6e6e6e",
      "du": "#782a2a",
      "uup": "#02245c"
    }
    const fullName = {
      "con": "Conservatives",
      "lab": "Labour",
      "snp": "Scottish National Party",
      "green": "Green Party",
      "ld": "Liberal Democrats",
      "pc": "Plaid Cymru",
      "dup": "Democratic Unionist Party",
      "sf": "Sinn Fein",
      "alliance": "Alliance Party NI",
      "sdlp": "Social Democratic & Labour Party",
      "spk": "Speaker",
      "ind": "Independent",
      "uup": "Ulster Unionist Party"
    }
    let json;
    const fetchData = (async () => {
      const response = await fetch(process.env.API_URL + "election?year=" + year);
      json =  await response.json();
      return json;
    })();
    const getPartyFromName = (name) => {
      const v = json.find(j => j["constituency"].toLowerCase() === name.toLowerCase());
      return v;
    }
    
    let constData;
    const onClick = (event, name) => {
      if (lastClicked) {
        lastClicked.style.setProperty('--stroke', 'none');
        if (lastClicked === event.target) {
          lastClicked = null;
          visible = false;
          return;
        }
      }
      lastClicked = event.target;
      event.target.style.setProperty('--stroke', 'purple');
      const index = json.findIndex(x => x["constituency"] === name);
      const party = json[index];
      const x = event.layerX;
      const y = event.layerY;
      selected = party;
      const cPath = dataset.find(x => x["properties"]["PCON20NM"].toLowerCase() === name.toLowerCase());
      constData = cPath;
      constProj = d3.geoMercator().fitSize([80, 80], cPath);
      constPath = d3.geoPath().projection(constProj);
      d3.select("#tooltip")
        .style("left", `${x+30}px`)
        .style("top", `${y-30}px`)
        .style("position", "absolute");
      visible = true;
      lastClicked = event.target;
    }
    const onMouseEnter = (event) => {
      event.target.style.setProperty('--stroke', 'black');
    }
    const onMouseLeave = (event) => {
      if (event.target !== lastClicked)
      event.target.style.setProperty('--stroke', 'none');
    }
    var constProj;
    var constPath;
    const close = () => {
      visible = false;
      lastClicked.style.setProperty('--stroke', 'none');
    }
  </script>
  
  <style>
  div {
      display: flex;
      justify-content: center;
  }
  path {
    fill: var(--fill);
    stroke: var(--stroke);
    cursor: pointer;
  }
  .tt {
    background-color: white;
    border: solid 1px black;
    color: black;
    border-radius: 10px;
    padding: 25px;
    display: inline;
    z-index: 1;
  }
  .close {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    top: 3%;
    left: 3%;
    position: absolute;
    font-size: 20px;
    color: black;
  }
  p {
    font-size: 8pt;
  }
  </style>
    
  <main>
  
  <Header />
    
  {#await fetchData}
  <Circle color="#3977e3" />
  {:then} 
  
  <div class="container">
    <svg {width} {height} overflow="scroll">
      {#each dataset as data}
      <path
        d={path(data)}
        style="--fill: {colour[getPartyFromName(data["properties"]["PCON20NM"])["party"].toLowerCase()]}; --stroke: none"
        on:click={(e) => onClick(e, data["properties"]["PCON20NM"])}
        on:mouseenter={onMouseEnter}
        on:mouseleave={onMouseLeave}
      />
      {/each}
      {#each Object.keys(fullName) as name, i}
      <rect x="430" y="{300+15*i}" width="10" height="10" style="fill:{colour[name.toLowerCase()]};stroke-width:2;stroke:black" />
      <text x="445" y="{310+15*i}">{fullName[name]}</text>
      {/each}
    </svg>
    <div id="tooltip">
      {#if visible}
      <div class="tt">
        <button class="close" on:click={close}>&#10006;</button>
        <p>Constituency: {selected["constituency"]}</p>
        <p>Party: {fullName[selected["party"].toLowerCase()]}</p>
        <p>Result: {selected["result"]}</p>
        <p>Majority: {selected["majority"]}</p>
        <svg width="80" height="80">
          <path d={constPath(constData)} style="--fill: {colour[selected["party"].toLowerCase()]}; --stroke: black">
          </path>
        </svg>
      </div>
      {/if}
    </div>
  
  </div>
  {/await}
  
  </main>