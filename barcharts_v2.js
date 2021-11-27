
d3.json("18245_madrid.json").then(function (dataset) {

    console.log(dataset)
    console.log(dataset[0].player.id)

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
    var svg1 = d3.select("#chart")
        //.append("svg")
        .style("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
        .style("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");


    var xScale1 = d3.scaleBand()
        .domain(dataset.map(d => d.minute)) //defines the interval of values in our dataset
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right]) //defines the pixels // starting from zero pixel and maximum value is what we have set for the graph at the top of script  
        .padding(0.2)

    var pass_minute1 = d3.group(dataset, (d => d.minute))

    console.log(pass_minute2)

    var yScale1 = d3.scaleLinear()
        .domain([0, d3.max(pass_minute1, d => d[1].length)])
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])

    console.log(pass_minute1)

    var bar = svg1.selectAll("rect")
        .data(pass_minute1)
        .enter()
        .append("rect")
        .attr("x", d => xScale1(d[0]))
        .attr("y", d => yScale1(d[1].length))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale1(d[1].length))
        .attr("fill", "steelblue")
        .on('mouseover', function () {
            d3.select(this)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
        })
        .on('mouseout', function () {
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            temp = i[0]
            update(temp)
            console.log(temp)
        })

    var xAxisgen1 = d3.axisBottom().scale(xScale1)
    var yAxisgen1 = d3.axisLeft().scale(yScale1)


    /*  var xAxis = svg.append("g")
                    .call(xAxisgen)
                    .style("transform", `translateY(${dimensions.height - dimensions.margin.bottom}px)`)
                    .selectAll("text")
                    .style("text-anchor", "end") */
    //.attr("transform", "rotate(-65)")

    var yAxis1 = svg1.append("g")
        .call(yAxisgen1)
        .style("transform", `translateX(${dimensions.margin.left}px)`)



    var dimensions2 = {
        width: 1350,
        height: 400,
        margin: {
            top: 10,
            bottom: 10,
            right: 10,
            left: 50
        }
    }

    var jersey_numbers = { 5597: 1, 5721: 2, 5485: 5, 5201: 4, 5552: 12, 5539: 14, 5463: 10, 5574: 8, 4926: 22, 19677: 9, 5207: 7, 6399: 11, 5202: 6, 5719: 20 }

    var svg2 = d3.select("#nodes")
        //.append("svg")
        .style("width", dimensions2.width + dimensions2.margin.left + dimensions2.margin.right)
        .style("height", dimensions2.height + dimensions2.margin.top + dimensions2.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + dimensions2.margin.left + "," + dimensions2.margin.top + ")")

    var pass_minute2 = d3.group(dataset, (d => d.minute), (d => d.player.id))

    var xScale2 = d3.scaleBand()
        .domain(dataset.map(d => d.minute)) //defines the interval of values in our dataset
        .range([dimensions2.margin.left, dimensions2.width - dimensions2.margin.right]) //defines the pixels // starting from zero pixel and maximum value is what we have set for the graph at the top of script  
        .padding(0.2)

    var yScale2 = d3.scaleBand()
        .domain(["1", "2", "5", "4", "12", "6", "14", "10", "8", "22", "9", "7", "11", "20"])
        .range([dimensions2.height - dimensions2.margin.bottom, dimensions2.margin.top])

    console.log(yScale2("10"))

    var bar = svg2.selectAll("rect")
        .data(pass_minute2)
        .enter()
        .append("rect")
        .attr("x", d => xScale2(d[0]))
        .attr("y", 0)
        .attr("width", xScale2.bandwidth())
        .attr("height", dimensions2.height - dimensions2.margin.bottom)
        .attr("fill", "steelblue")
        .attr("opacity", "0.1")

    var xAxis2 = svg2.append("g")
        .call(d3.axisBottom().scale(xScale2))
        .style("transform", `translateY(${dimensions2.height - dimensions2.margin.bottom}px)`)
        .selectAll("text")
        .style("text-anchor", "end")

    var circles = svg2.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale2(d.minute))
        .attr("cy", function (d) {
            if ((d.pass.outcome == null) || (d.team.name == "Real Madrid")) {
                output = (jersey_numbers[d.player.id])
            }
            if (output == null) { return -100 }
            else { return yScale2("" + output) }

        })
        .attr("r", 5)
        .attr("fill", "steelblue")
        .attr("transform", "translate(6,13.5)")

    var yAxis2 = svg2.append("g")
        .call(d3.axisLeft().scale(yScale2))
        .style("transform", `translateX(${dimensions2.margin.left}px)`)


    var lines = svg2.append("g")
        .selectAll("line")
        .data(["1", "2", "5", "4", "12", "6", "14", "10", "8", "22", "9", "7", "11", "20"])
        .enter()
        .append("line")
        .attr("x1", dimensions2.margin.left)
        .attr("y1", function (d) { return yScale2(d) })
        .attr("x2", dimensions2.width - dimensions2.margin.right)
        .attr("y2", function (d) { return yScale2(d) })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("transform", "translate(0,13.5)")
        .attr("opacity", "0.5")


    var plotscale = 800

    var margin = {
        top: (plotscale * (14.86 / 960)),
        right: (plotscale * (20 / 960)),
        bottom: (plotscale * (24 / 960)),
        left: (plotscale * (100 / 960))
    }
    var width = plotscale - margin.left - margin.right
    var height = (plotscale * (68 / 105) - margin.top - margin.bottom)
    console.log(68 / 105, height / width)

    var x = d3.scaleLinear()
        .domain([0, 120])
        .range([0, width])

    var y = d3.scaleLinear()
        .domain([0, 80])
        .range([0, height])

    function update(temp) {
        
        document.getElementById("pattern").innerHTML=''

        var svg3 = d3.select("#pattern")
            //.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


        svg3.append("clipPath")
            .attr("id", "clip")
            .append("rect")
            .attr("class", "mesh")
            .attr("width", width)
            .attr("height", height)

        // field outline    
        svg3.append("rect")
            .attr("id", "outline")
            .attr("x", x(0))
            .attr("y", y(0))
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "green")
            .attr("opacity", "0.25")
            .attr("stroke", "black")
        // right penalty area 
        svg3.append("rect")
            .attr("id", "six")
            .attr("x", x(102))
            .attr("y", y(18))
            .attr("width", x(120) - x(102))
            .attr("height", y(62) - y(18))
            .attr("fill", "none")
            .attr("stroke", "black")
        // right six yard box
        svg3.append("rect")
            .attr("id", "penarea")
            .attr("x", x(114))
            .attr("y", y(30))
            .attr("width", x(120) - x(114))
            .attr("height", y(50) - y(30))
            .attr("fill", "none")
            .attr("stroke", "black")
        // right goal
        svg3.append("rect")
            .attr("id", "penarea")
            .attr("x", x(120))
            .attr("y", y(36))
            .attr("width", margin.right - 1)
            .attr("height", y(44) - y(36))
            .attr("fill", "none")
            .attr("stroke", "black")

        // left penalty area 
        svg3.append("rect")
            .attr("id", "six")
            .attr("x", x(0))
            .attr("y", y(18))
            .attr("width", x(18) - x(0))
            .attr("height", y(62) - y(18))
            .attr("fill", "none")
            .attr("stroke", "black")
        // six yard box
        svg3.append("rect")
            .attr("id", "penarea")
            .attr("x", x(0))
            .attr("y", y(30))
            .attr("width", x(6) - x(0))
            .attr("height", y(50) - y(30))
            .attr("fill", "none")
            .attr("stroke", "black")

        // left goal
        svg3.append("rect")
            .attr("id", "penarea")
            .attr("x", x(0) - margin.right + 1)
            .attr("y", y(36))
            .attr("width", margin.right - 1)
            .attr("height", y(44) - y(36))
            .attr("fill", "none")
            .attr("stroke", "black")

        // 50 yd line
        svg3.append("line")
            .attr("id", "half")
            .attr("x1", x(60))
            .attr("x2", x(60))
            .attr("y1", y(0))
            .attr("y2", y(80))
            .attr("stroke", "black")
        // center circle
        svg3.append("circle")
            .attr("cx", x(60))
            .attr("cy", y(40))
            .attr("r", x(5))
            .attr("fill", "none")
            .attr("stroke", "black")



        var edges = svg3.append("g")
            .selectAll("line")
            .data(dataset)
            .enter()
            .append("line")
            .attr("x1", function (d) { return x(d.location[0]) })
            .attr("y1", function (d) { return y(d.location[1]) })
            .attr("x2", function (d) { return x(d.pass.end_location[0]) })
            .attr("y2", function (d) { return y(d.pass.end_location[1]) })
            .attr("stroke", "black")
            .attr("stroke-width", function (d) {
                if (d.minute == temp && (d.pass.outcome == null)) {
                    return 1.5
                }
                else { return 0 }
            })

        var start_location = svg3.append("g")
            .selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr('cx', function (d) { return x(d.location[0]) })
            .attr('cy', function (d) { return y(d.location[1]) })
            .attr("fill", "#157f3b")
            .attr("r", function (d) {
                if (d.minute == temp && (d.pass.outcome == null)) {
                    return 10
                }
                else { return 0 }
            })
            .on('mouseover', function () {
                d3.select(this)
                    .attr("stroke-width", 1)
                    .attr("stroke", "black")
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr("stroke-width", 0)
            })


        var start_text = svg3.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dx", function (d) { return x(d.location[0]) })
            .attr("dy", function (d) { return y(d.location[1]) })
            .text(function (d) {
                if (d.minute == temp && (d.pass.outcome == null)) { return jersey_numbers[d.player.id] }
                else { return null }
            })
            .attr('font-size', "15px")
            .attr("transform", "translate(0,5)")

        var end_location = svg3.append("g")
            .selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr('cx', function (d) { return x(d.pass.end_location[0]) })
            .attr('cy', function (d) { return y(d.pass.end_location[1]) })
            .attr("fill", "#2f7ebc")
            .attr("r", function (d) {
                if (d.minute == temp && (d.pass.outcome == null)) {
                    return 10
                }
                else { return 0 }
            })
            .attr("transform", "translate(0,-5)")
            .on('mouseover', function () {
                d3.select(this)
                    .attr("stroke-width", 1)
                    .attr("stroke", "black")
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr("stroke-width", 0)
            })


        var end_text = svg3.append('g')
            .attr("class", "labels")
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("text-anchor", "middle")
            .attr("dx", function (d) { return x(d.pass.end_location[0]) })
            .attr("dy", function (d) { return y(d.pass.end_location[1]) })
            .text(function (d) {
                if (d.pass.recipient != null && d.minute == temp && (d.pass.outcome == null)) { return jersey_numbers[d.pass.recipient.id] }
                else { return null }
            })
            .attr('font-size', "15px")

    }

})
