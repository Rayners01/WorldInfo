<script>
    import * as d3 from "d3";
    import Header from "../../util/Header.svelte"
    let dataset = [];
    import Circle from "../../util/Circle.svelte";
  import { geoPath } from "d3";
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
      "Con": "#0390fc",
      "Lab": "#fc0303",
      "SNP": "#fff959",
      "Green": "#34fa3b",
      "LD": "#fcbf17",
      "PC": "#00ff80",
      "DUP": "#782a2a",
      "SF": "#2b7552",
      "Alliance": "#a88b32",
      "SDLP": "#014714",
      "Spk": "#6e6e6e"
    }
    const fullName = {
      "Con": "Conservatives",
      "Lab": "Labour",
      "SNP": "Scottish National Party",
      "Green": "Green Party",
      "LD": "Liberal Democrats",
      "PC": "Plaid Cymru",
      "DUP": "Democratic Unionist Party",
      "SF": "Sinn Fein",
      "Alliance": "Alliance Party NI",
      "SDLP": "Social Democratic & Labour Party",
      "Spk": "Speaker"
    }
    let json;
    const fetchData = (async () => {
      const response = await fetch(process.env.API_URL + "election");
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
      console.log(event);
      selected = party;
      const cPath = dataset.find(x => x["properties"]["PCON20NM"].toLowerCase() === name.toLowerCase());
      /*points = "";
      cPath["geometry"]["coordinates"][0].forEach(s => {
        points = points + `${s[0]},${s[1]} `;
      });
      console.log(points);*/
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
    top: 3px;
    left: 3px;
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
        style="--fill: {colour[getPartyFromName(data["properties"]["PCON20NM"])["party"]]}; --stroke: none"
        on:click={(e) => onClick(e, data["properties"]["PCON20NM"])}
        on:mouseenter={onMouseEnter}
        on:mouseleave={onMouseLeave}
      />
      {/each}
      {#each Object.keys(fullName) as name, i}
      <rect x="500" y="{400+15*i}" width="10" height="10" style="fill:{colour[name]};stroke-width:2;stroke:black" />
      <text x="515" y="{410+15*i}">{fullName[name]}</text>
      {/each}
    </svg>
    <div id="tooltip">
      {#if visible}
      <div class="tt">
        <button class="close" on:click={close}>&#10006;</button>
        <p>Constituency: {selected["constituency"]}</p>
        <p>Party: {fullName[selected["party"]]}</p>
        <p>Result: {selected["result"]}</p>
        <p>Majority: {selected["majority"]}</p>
        <svg width="80" height="80">
          <path d={constPath(constData)} style="--fill: {colour[selected["party"]]}; --stroke: black">
          </path>
        </svg>
      </div>
      {/if}
    </div>
  
  </div>
  {/await}
  
  </main>