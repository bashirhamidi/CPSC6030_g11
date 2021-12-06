
// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/stacked-bar-chart
function StackedBarChart(data, {
  x = (d, i) => i, // given d in data, returns the (ordinal) x-value
  y = d => d, // given d in data, returns the (quantitative) y-value
  z = () => 1, // given d in data, returns the (categorical) z-value
  title, // given d in data, returns the title text
  marginTop = 30, // top margin, in pixels
  marginRight = 0, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
  xDomain, // array of x-values
  xRange = [marginLeft, width - marginRight], // [left, right]
  xPadding = 0.1, // amount of x-range to reserve to separate bars
  yType = d3.scaleLinear, // type of y-scale
  yDomain, // [ymin, ymax]
  yRange = [height - marginBottom, marginTop], // [bottom, top]
  zDomain, // array of z-values
  offset = d3.stackOffsetDiverging, // stack offset method
  order = d3.stackOrderNone, // stack order method
  yFormat, // a format specifier string for the y-axis
  yLabel, // a label for the y-axis
  colors = d3.schemeTableau10, // array of colors
} = {}) {
  // Compute values.
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const Z = d3.map(data, z);

  // Compute default x- and z-domains, and unique them.
  if (xDomain === undefined) xDomain = X;
  if (zDomain === undefined) zDomain = Z;
  xDomain = new d3.InternSet(xDomain);
  zDomain = new d3.InternSet(zDomain);

  // Omit any data not present in the x- and z-domains.
  const I = d3.range(X.length).filter(i => xDomain.has(X[i]) && zDomain.has(Z[i]));

  // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
  // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
  // each tuple has an i (index) property so that we can refer back to the
  // original data point (data[i]). This code assumes that there is only one
  // data point for a given unique x- and z-value.
  const series = d3.stack()
    .keys(zDomain)
    .value(([x, I], z) => Y[I.get(z)])
    .order(order)
    .offset(offset)
    (d3.rollup(I, ([i]) => i, i => X[i], i => Z[i]))
    .map(s => s.map(d => Object.assign(d, { i: d.data[1].get(s.key) })));

  // Compute the default y-domain. Note: diverging stacks can be negative.
  if (yDomain === undefined) yDomain = d3.extent(series.flat(2));

  // Construct scales, axes, and formats.
  const xScale = d3.scaleBand(xDomain, xRange).paddingInner(xPadding);
  const yScale = yType(yDomain, yRange);
  const color = d3.scaleOrdinal(zDomain, colors);
  const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);

  // Compute titles.
  if (title === undefined) {
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${X[i]}\n${Z[i]}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(yAxis)
    .call(g => g.select(".domain").remove())
    .call(g => g.selectAll(".tick line").clone()
      .attr("x2", width - marginLeft - marginRight)
      .attr("stroke-opacity", 0.1))
    .call(g => g.append("text")
      .attr("x", -marginLeft)
      .attr("y", 10)
      .attr("fill", "currentColor")
      .attr("text-anchor", "start")
      .text(yLabel));

  const bar = svg.append("g")
    .selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", ([{ i }]) => color(Z[i]))
    .selectAll("rect")
    .data(d => d)
    .join("rect")
    .attr("x", ({ i }) => xScale(X[i]))
    .attr("y", ([y1, y2]) => Math.min(yScale(y1), yScale(y2)))
    .attr("height", ([y1, y2]) => Math.abs(yScale(y1) - yScale(y2)))
    .attr("width", xScale.bandwidth());

  if (title) bar.append("title")
    .text(({ i }) => title(i));

  svg.append("g")
    .attr("transform", `translate(0,${yScale(0)})`)
    .call(xAxis);

  return Object.assign(svg.node(), { scales: { color } });
}

dataset = [{
  "minute": 0,
  "player": {
    "id": 5485,
    "name": "RaphaÃ«l Varane"
  },
  "y_counts": 1
},
{
  "minute": 0,
  "player": {
    "id": 5463,
    "name": "Luka ModriÄ‡"
  },
  "y_counts": 2
},
{
  "minute": 0,
  "player": {
    "id": 5721,
    "name": "Daniel Carvajal Ramos"
  },
  "y_counts": 3
},
{
  "minute": 1,
  "player": {
    "id": 5485,
    "name": "RaphaÃ«l Varane"
  },
  "y_counts": 3
},
{
  "minute": 1,
  "player": {
    "id": 5463,
    "name": "Luka ModriÄ‡"
  },
  "y_counts": 2
},
{
  "minute": 1,
  "player": {
    "id": 5721,
    "name": "Daniel Carvajal Ramos"
  },
  "y_counts": 1
},
{
  "minute": 2,
  "player": {
    "id": 5485,
    "name": "RaphaÃ«l Varane"
  },
  "y_counts": 2
},
{
  "minute": 2,
  "player": {
    "id": 5463,
    "name": "Luka ModriÄ‡"
  },
  "y_counts": 1
},
{
  "minute": 2,
  "player": {
    "id": 5721,
    "name": "Daniel Carvajal Ramos"
  },
  "y_counts": 3
}, {
  "minute": 3,
  "player": {
    "id": 5485,
    "name": "RaphaÃ«l Varane"
  },
  "y_counts": 4
},
{
  "minute": 3,
  "player": {
    "id": 5463,
    "name": "Luka ModriÄ‡"
  },
  "y_counts": 3
},
{
  "minute": 3,
  "player": {
    "id": 5721,
    "name": "Daniel Carvajal Ramos"
  },
  "y_counts": 2
},
{
  "minute": 4,
  "player": {
    "id": 5485,
    "name": "RaphaÃ«l Varane"
  },
  "y_counts": 0
},
{
  "minute": 4,
  "player": {
    "id": 5463,
    "name": "Luka ModriÄ‡"
  },
  "y_counts": 1
},
{
  "minute": 4,
  "player": {
    "id": 5721,
    "name": "Daniel Carvajal Ramos"
  },
  "y_counts": 2
}
]


var playerAccessor = d => d.player.id
console.log("log line 242", playerAccessor(dataset[0]))
//dataset.forEach(d => (console.log(d.player.id)))

/*
function uniqueByKey(array, key) {
  return [...new Map(array.map((x) => [x[key], x])).values()];
}
console.log(uniqueByKey(dataset, playerAccessor));
*/
/*
//get all instances of player.id
console.log("log line 253", (d3.map(dataset, playerAccessor)));

//get unique player.id
//console.log([...new Set(dataset.map(d => d.player.id))]);
var players = [...new Set(dataset.map(d => d.player.id))]

console.log("log line 259", players)

chart = StackedBarChart(dataset, {
  x: d => [3],//d.minute,
  y: d => [4],//d.y_counts,
  z: d => [45], ///playerAccessor(dataset),
  xDomain: d3.groupSort(dataset, D => d3.sum(D, d => -d.y_counts), d => d.minute),
  yLabel: "↑ Population (millions)",
  //console.log(z),
  zDomain: d => players,
  // colors: d3.schemeSpectral[(dataset, playerAccessor).length],
  width: 4,
  height: 5
})
*/

d3.csv("us-population-state-age.csv").then(function (states) {


  ages = states.columns.slice(1)
  stateages = ages.flatMap(age => states.map(d => ({ state: d.name, age, population: d[age] }))) // pivot longer
  //debugger;



  chart =
    StackedBarChart(stateages, {
      x: d => d.state,
      y: d => d.population / 1e6,
      z: d => d.age,
      xDomain: d3.groupSort(stateages, D => d3.sum(D, d => -d.population), d => d.state),
      yLabel: "↑ Population (millions)",
      zDomain: ages,
      colors: d3.schemeSpectral[ages.length],
      width: 640,
      height: 500
    })




})




//console.log(chart)


dataset2 = [{
  "minute": 0,
  "player_id": 5485,
  "y_counts": 1
},
{
  "minute": 0,
  "player_id": 5463,
  "y_counts": 2
},
{
  "minute": 0,
  "player_id": 5721,
  "y_counts": 3
},
{
  "minute": 1,
  "player_id": 5485,
  "y_counts": 3
},
{
  "minute": 1,
  "player_id": 5463,
  "y_counts": 2
},
{
  "minute": 1,
  "player_id": 5721,
  "y_counts": 1
},
{
  "minute": 2,
  "player_id": 5485,
  "y_counts": 2
},
{
  "minute": 2,
  "player_id": 5463,
  "y_counts": 1
},
{
  "minute": 2,
  "player_id": 5721,
  "y_counts": 3
}, {
  "minute": 3,
  "player_id": 5485,
  "y_counts": 4
},
{
  "minute": 3,
  "player_id": 5463,
  "y_counts": 3
},
{
  "minute": 3,
  "player_id": 5721,
  "y_counts": 2
},
{
  "minute": 4,
  "player_id": 5485,
  "y_counts": 0
},
{
  "minute": 4,
  "player_id": 5463,
  "y_counts": 1
},
{
  "minute": 4,
  "player_id": 5721,
  "y_counts": 2
}
]
