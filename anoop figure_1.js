d3.json("18245_madrid.json").then(function(dataset){
// create svg element:
/* var svg = d3.select("#figure_1")
            .attr("width", 200)
            .attr("height", 200) */

// Add the path using this helper function

var jersey_numbers={"Keylor Navas Gamboa" : 1, "Daniel Carvajal Ramos" : 2, "Raphaël Varane": 5, "Sergio Ramos García" : 4,
 "Marcelo Vieira da Silva Júnior" : 12, "Carlos Henrique Casimiro" : 14, "Luka Modrić" : 10, "Toni Kroos" : 8, "Francisco Román Alarcón Suárez": 22, 
 "Karim Benzema" : 9, "Cristiano Ronaldo dos Santos Aveiro" : 7}


console.log(jersey_numbers["Raphaël Varane"])
var plotscale = 750

var margin = {top: (plotscale * (14.86/960)), 
				right: (plotscale * (20/960)), 
				bottom: (plotscale * (24/960)), 
				left: (plotscale* (40/960))},
	width = plotscale - margin.left - margin.right,
	height = (plotscale * (68/105) - margin.top - margin.bottom) 
	console.log(68/105, height/width)

var x = d3.scaleLinear()
	.domain([0, 120])
	.range([0, width])

var y = d3.scaleLinear()
	.domain([0, 80])
	.range([0,height])

// var xAxis = d3.svg.axis()
//     .scale(x)
//     .orient("bottom")
//     .tickSize(6, -height);

// var yAxis = d3.svg.axis()
//     .scale(y)
//     .orient("left")
//     .tickSize(6, -width);

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

svg.append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("class", "mesh")
	.attr("width", width)
	.attr("height", height)


///////////////////////
// add lines 

// field outline    
  svg.append("rect")
	   .attr("id","outline")
	   .attr("x", x(0))
	   .attr("y", y(0))
	   .attr("width", width)
	   .attr("height", height)
	   .attr("fill", "none")
	   .attr("stroke", "black")  
// right penalty area 
	svg.append("rect")
	   .attr("id","six")
	   .attr("x", x(102))
	   .attr("y", y(18))
	   .attr("width", x(120) - x(102))
	   .attr("height", y(62) - y(18))
	   .attr("fill", "none")
	   .attr("stroke", "black")
// right six yard box
	svg.append("rect")
		.attr("id","penarea")
		.attr("x", x(114))
		.attr("y", y(30))
		.attr("width", x(120) - x(114))
		.attr("height", y(50) - y(30))
		.attr("fill", "none")
		.attr("stroke", "black")
// right goal
	svg.append("rect")
		.attr("id","penarea")
		.attr("x", x(120))
		.attr("y", y(36))
		.attr("width", margin.right - 1)
		.attr("height", y(44) - y(36))
		.attr("fill", "none")
		.attr("stroke", "black")

// left penalty area 
	svg.append("rect")
	   .attr("id","six")
	   .attr("x", x(0))
	   .attr("y", y(18))
	   .attr("width", x(18) - x(0))
	   .attr("height", y(62) - y(18))
	   .attr("fill", "none")
	   .attr("stroke", "black")
// six yard box
	svg.append("rect")
		.attr("id","penarea")
		.attr("x", x(0))
		.attr("y", y(30))
		.attr("width", x(6) - x(0))
		.attr("height", y(50) - y(30))
		.attr("fill", "none")
		.attr("stroke", "black")

// left goal
	svg.append("rect")
		.attr("id","penarea")
		.attr("x", x(0) - margin.right+1)
		.attr("y", y(36))
		.attr("width", margin.right - 1)
		.attr("height", y(44) - y(36))
		.attr("fill", "none")
		.attr("stroke", "black")
 
// 50 yd line
	 svg.append("line")
		.attr("id","half")
		.attr("x1", x(60))
		.attr("x2", x(60))
		.attr("y1", y(0))
		.attr("y2", y(80))
		.attr("stroke", "black")
// center circle
	svg.append("circle")
	   .attr("cx", x(60))
	   .attr("cy", y(40))
	   .attr("r", x(10))
	   .attr("fill", "none")
	   .attr("stroke", "black")

 
//group_data=Array.from(d3.group(dataset, d => d.type.name))
  //console.log(dataset)
console.log(dataset)
//console.log(d3.group(dataset, d=>d.location))

var start = Array.from(d3.group(dataset, d => d.location))
console.log(start[2][1][0].player.name)




//var start= d3.group(dataset, d=>d.location)
var end=Array.from(d3.group(dataset, d=>d.pass.end_location))

console.log(start[1][1][0].player.name)

var start_location = svg.append("g")
						.selectAll("circle")
						.data(start)
						.enter()
						.append("circle")
						.attr('cx', d=>x(d[0][0]))
						.attr('cy', d=>y(d[0][1]))
						.attr("fill",  "green")  //TODO: set the appropriate color for each node depending on its group
						.attr("r", 4)
						
					/* 	
					 svg.append("g")
						.text(dataset, d=>d.player.name) */

var start_text = svg.append("g")
				.attr("class", "labels")
				.selectAll("text")
				.data(start)
				.enter()
				.append("text")
				.attr("dx", d=>x(d[0][0]))
				.attr("dy", d=>y(d[0][1]))
				//.text(d=>d[1][0].player.name) 
				.text(d=>d[1][0].player.name)
				.attr('font-size', "2px")
				
/* var text = svg.selectAll("text")
				.data(start)
				.enter()
				.append("text")

var textLabels = text
				.attr("x", d=>x(d[0][0]))
				.attr("y", d=>x(d[0][1]))
				.text(d=>d[1][0].player.name)
				.attr("font-family", "sans-serif")
				.attr("font-size", "8px")
				.attr("fill", "black") */

var end_location=svg.append("g")
					.selectAll("circle")
					.data(end)
					.enter()
					.append("circle")
					.attr('cx', d=>x(d[0][0]))
					.attr('cy', d=>y(d[0][1]))
					.attr("fill",  "red")  //TODO: set the appropriate color for each node depending on its group
					.attr("r", 4)    


	var end_text = svg.append('g')
					.attr("class", "labels")
					.selectAll("text")
					.data(end)
					.enter()
					.append("text")
					.attr("dx", d=>x(d[0][0]))
					.attr("dy", d=>y(d[0][1]))
					.text(function (d){
						if (d[1][0].pass.recipient !=null){return d[1][0].pass.recipient.name}
						else {return "gg"}

					})
					.attr('font-size', "4px")

	var edges = svg.append("g")
					.selectAll("line")
					.data(dataset)
					.enter()
					.append("line")
					.attr("x1", d => x(d.location[0]))
					.attr("y1", d => y(d.location[1]))
					.attr("x2", d => x(d.pass.end_location[0]))
					.attr("y2", d => y(d.pass.end_location[1]))
					.attr("stroke", "black")
					.attr("stroke-width", 1)
})
