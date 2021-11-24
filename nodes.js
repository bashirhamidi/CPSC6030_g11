d3.json("18245_madrid.json").then(function (dataset){

var dimensions = {
    width: 1350,
    height: 400,
    margin: {
        top: 10,
        bottom: 10,
        right: 10,
        left: 50}
    }

var jersey_numbers={5597 : 1, 5721 : 2, 5485 : 5, 5201 : 4, 5552 : 12, 5539 : 14, 5463 : 10, 5574 : 8, 4926: 22, 19677 : 9, 5207 : 7, 6399 : 11, 5202 : 6}

var svg = d3.select("#nodes")
//.append("svg")
        .style("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
        .style("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
        .append("g")
        //.attr("transform", "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")")

    temp=d3.group(dataset, (d=>d.minute), (d=>d.player.id))
    console.log(temp)

    var pass_minute=d3.group(dataset, (d=>d.minute), (d=>d.player.id))

    var xScale = d3.scaleBand()
                    .domain(dataset.map(d=>d.minute)) //defines the interval of values in our dataset
                    .range([dimensions.margin.left,dimensions.width-dimensions.margin.right]) //defines the pixels // starting from zero pixel and maximum value is what we have set for the graph at the top of script  
                    .padding(0.2)
    
    var yScale = d3.scaleOrdinal()
                    .domain(["1","2","5","4","12", "6", "14", "10", "8", "22", "9", "7", "11"])
                    .range([dimensions.height-30,dimensions.height-60,dimensions.height-90, dimensions.height-120, dimensions.height-150,dimensions.height-180, dimensions.height-210,dimensions.height-240, dimensions.height-270, dimensions.height-300, dimensions.height-330])

       console.log(temp.get(10).get(5721))
       console.log(dataset)

    var bar = svg.selectAll("rect")
                .data(pass_minute)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d[0]))
                .attr("y", 0)
                .attr("width", xScale.bandwidth())
                .attr("height", dimensions.height - dimensions.margin.bottom)
                .attr("fill", "steelblue")
                .attr("opacity", "0.1")

    var xAxis = svg.append("g")
                   .call(d3.axisBottom().scale(xScale))
                   .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
                   .selectAll("text")
                   .style("text-anchor", "end")

    var circles=svg.selectAll("circle")
                   .data(dataset)
                   .enter()
                   .append("circle")
                   .attr("cx", d=>xScale(d.minute))
                   .attr("cy", function(d){
                       if ((d.team.name=="Real Madrid") && (d.pass.outcome==null)){
                       const output=yScale(jersey_numbers[d.player.id])
                       console.log(output)
                       return output}
                   })
                   .attr("r", 5)
                   .attr("fill", "steelblue")


    var yAxis = svg.append("g")
                    .call(d3.axisLeft().scale(yScale))
                    .style("transform", `translateX(${dimensions.margin.left}px)`) 



})
    
