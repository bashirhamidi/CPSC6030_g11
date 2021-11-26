
d3.json("18245_madrid.json").then(function (dataset){

    console.log(dataset)
    console.log(dataset[0].player.id)

    /*
          var p_5485 = dataset.filter(function (d) {
              return d.player.id == 5485;
          })
    */
    var dimensions = {
        width: 1350,
        height: 200,
        margin: {
            top: 10,
            bottom: 0,
            right: 10,
            left: 50
        }
    }
    var svg = d3.select("#chart")
        //.append("svg")
                .style("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
                .style("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
                .append("g")
                .attr("transform", "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");
        

    var xScale = d3.scaleBand()
        .domain(dataset.map(d=>d.minute)) //defines the interval of values in our dataset
        .range([dimensions.margin.left,dimensions.width-dimensions.margin.right]) //defines the pixels // starting from zero pixel and maximum value is what we have set for the graph at the top of script  
        .padding(0.2)

    var pass_minute=d3.group(dataset, (d=>d.minute))

    console.log(pass_minute)

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(pass_minute, d=>d[1].length)])
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

        console.log()

    var bar = svg.selectAll("rect")
                .data(pass_minute)
                .enter()
                .append("rect")
                .attr("x", d => xScale(d[0]))
                .attr("y", d => yScale(d[1].length))
                .attr("width", xScale.bandwidth())
                .attr("height", d =>dimensions.height - dimensions.margin.bottom - yScale(d[1].length))
                .attr("fill", "steelblue")
                .on('mouseover', function(){
                    d3.select(this)
                        .attr("stroke-width",1)
                        .attr("stroke","black")
                })
                .on('mouseout', function(){
                    d3.select(this)
                        .attr("stroke-width", 0)    
                })
                .on('click', function(d){
                    d3.select('#pattern')

                    var temp=d[0]
                })

    var xAxisgen = d3.axisBottom().scale(xScale)
    var yAxisgen = d3.axisLeft().scale(yScale)


   /*  var xAxis = svg.append("g")
                   .call(xAxisgen)
                   .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
                   .selectAll("text")
                   .style("text-anchor", "end") */
                   //.attr("transform", "rotate(-65)")

    var yAxis = svg.append("g")
                    .call(yAxisgen)
                    .style("transform", `translateX(${dimensions.margin.left}px)`) 


    

})
