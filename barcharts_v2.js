
d3.json("18245_madrid.json").then(function (dataset) {

    console.log(dataset)
    console.log(dataset[0].player.id)

    var dimensions = {
        width: 1350,
        height: 200,
        margin: {
            top: 10,
            bottom: 2,
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

    /* var Tooltip = d3.select("#chart")
                    .append("div")
                    .style("opacity", 0)
                    .attr("class", "tooltip")
                    .style("background-color", "white")
                    .style("border", "solid")
                    .style("border-width", "2px")
                    .style("border-radius", "5px")
                    .style("padding", "5px")

    var mouseover = function(d,i) {
                Tooltip
                .style("opacity", 1)

                d3.select(this)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
            
                Tooltip
                    .html("The no.passes is" + i[1].length)
                    .style("left", (d3.pointer(this)[0]+70) + "px")
                    .style("top", (d3.pointer(this)[1]) + "px")
           
                text1.attr("fill", "blue")
                    .text(i[1].length)
                    .attr("x", xScale1(i[0]))
                    .attr("y", yScale1(i[1].length))
             }

     var mouseout = function(d) {
                Tooltip
                .style("opacity", 0)
                d3.select(this)
                .attr("stroke-width", 0)
     } */
    var text1 = svg1.append("text")
                    .data(pass_minute1)
                    //.text("10")
                    //.attr("text-anchor", "middle")
                    //.attr("x", d => xScale1(d[0]))
                    //.attr("y", d=>yScale1(d[1].length))
                    .attr("font-family", "sans-serif") 
                    .attr("font-size", "12px")
                    .attr("fill", "white")
                    .attr('transform', 'translate(0,-2)')

    var bar = svg1.selectAll("rect")
        .data(pass_minute1)
        .enter()
        .append("rect")
        .attr("x", d => xScale1(d[0]))
        .attr("y", d => yScale1(d[1].length))
        .attr("width", xScale1.bandwidth())
        .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale1(d[1].length))
        .attr("fill", "steelblue")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 1)
                .attr("stroke", "black")
   
        text1.attr("fill", "black")
            .text(i[1].length)
            .attr("x", xScale1(i[0]))
            .attr("y", yScale1(i[1].length))
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
            text1.attr("fill", "white")
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
        .domain(["2", "5", "4", "12", "6", "10", "14","8", "9", "22", "7","11", "20"])
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
        //.style("text-anchor", "end")

    var circles = svg2.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", d => xScale2(d.minute))
        .attr("cy", function (d) {
            if ((d.pass.outcome == null) || (d.team.name == "Real Madrid")) {
                if (jersey_numbers[d.player.id]!=1){
                output = (jersey_numbers[d.player.id])
            }}
            if (output == null) { return -100 }
            else { return yScale2("" + output) }

        })
        .attr("r", 5)
        .attr("fill","steelblue")
         /* function(d){
            if ((d.pass.outcome == null) || (d.team.name == "Real Madrid")){
            if ((jersey_numbers[d.player.id]==2) || (jersey_numbers[d.player.id]==5) || (jersey_numbers[d.player.id]==4) || (jersey_numbers[d.player.id]==12) || (jersey_numbers[d.player.id]==6)){
                return "pink"
            }
            else if ((jersey_numbers[d.player.id]==10) || (jersey_numbers[d.player.id]==14) || (jersey_numbers[d.player.id]==8)){
                return "blue"
            }
            else{return "green"}


        }}) */
        .attr("transform", "translate(6,14.5)")

    var yAxis2 = svg2.append("g")
        .call(d3.axisLeft().scale(yScale2))
        .style("transform", `translateX(${dimensions2.margin.left}px)`)
        


    var lines = svg2.append("g")
        .selectAll("line")
        .data(["2", "5", "4", "12", "6", "10", "14","8", "9", "22", "7","11", "20"])
        .enter()
        .append("line")
        .attr("x1", dimensions2.margin.left)
        .attr("y1", function (d) { return yScale2(d) })
        .attr("x2", dimensions2.width - dimensions2.margin.right)
        .attr("y2", function (d) { return yScale2(d) })
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("transform", "translate(0,14.5)")
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
        .attr("opacity", "0.35")
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
    
    //initial player positions
    svg3.append("circle")
        .attr("cx", x(30))
        .attr("cy", y(70))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    
    svg3.append("circle")
        .attr("cx", x(30))
        .attr("cy", y(30))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(30))
        .attr("cy", y(50))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(30))
        .attr("cy", y(10))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(60))
        .attr("cy", y(60))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(60))
        .attr("cy", y(40))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(60))
        .attr("cy", y(20))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(90))
        .attr("cy", y(60))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(90))
        .attr("cy", y(40))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")
    svg3.append("circle")
        .attr("cx", x(90))
        .attr("cy", y(20))
        .attr("r", 10)
        .attr("fill", "#157f3b")
        .attr("stroke", "black")

    //intial text
    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(30))
        .attr("dy", y(10))
        .text(12)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    
    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(30))
        .attr("dy", y(30))
        .text(4)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(30))
        .attr("dy", y(50))
        .text(5)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(30))
        .attr("dy", y(70))
        .text(2)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )

    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(60))
        .attr("dy", y(20))
        .text(8)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(60))
        .attr("dy", y(40))
        .text(14)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(60))
        .attr("dy", y(60))
        .text(10)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )

    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(90))
        .attr("dy", y(20))
        .text(7)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )

    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(90))
        .attr("dy", y(40))
        .text(22)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg3.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", x(90))
        .attr("dy", y(60))
        .text(9)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )

   /*  var start_text = svg3.append("g")
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
            .attr("transform", "translate(0,5)") */
        
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
            .attr("opacity", "0.35")
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
    var width4=1350-width
    var svg4=d3.select("#stats")
               // .append("svg")
                .attr("width", width4 - margin.right - margin.left)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr('color', 'grey')
              //  .attr("viewBox", "200, 200, 1000, 1000")

    var stats=[ 
                {'player':5597,'id': 1,'passes_completed':14, 'passes_attempted':22, 'passing_accuracy':63.63, 'shot_assists': 0, 'shots_taken':0, 'assists':0, 'goals':0 }, 
                {'player':5721,'id': 2,'passes_completed':24, 'passes_attempted':30, 'passing_accuracy':80,'shot_assists': 1,'shots_taken':0, 'assists':0, 'goals':0 },
                {'player':5485,'id': 5,'passes_completed':52, 'passes_attempted':57, 'passing_accuracy':91.22,'shot_assists': 0, 'shots_taken':0, 'assists':0, 'goals':0} ,
                {'player':5201,'id': 4,'passes_completed':77, 'passes_attempted':80, 'passing_accuracy':96.26, 'shot_assists': 0,'shots_taken':0, 'assists':0, 'goals':0 },
                {'player':5552,'id': 12,'passes_completed':70, 'passes_attempted':83, 'passing_accuracy':84.33, 'shot_assists': 1,'shots_taken':1, 'assists':2, 'goals':0 },
                {'player':5539,'id': 14,'passes_completed':33, 'passes_attempted':35, 'passing_accuracy':94.28, 'shot_assists': 1,'shots_taken':0, 'assists':0, 'goals':0 },
                {'player':5463,'id': 10,'passes_completed':66, 'passes_attempted':70, 'passing_accuracy':94.28,'shot_assists': 0, 'shots_taken':1, 'assists':0, 'goals':0 },
                {'player':5574,'id': 8,'passes_completed':83, 'passes_attempted':89, 'passing_accuracy':93.25, 'shot_assists': 1,'shots_taken':0, 'assists':0, 'goals':0 },
                {'player':4926,'id': 22,'passes_completed':46, 'passes_attempted':49, 'passing_accuracy':93.87,'shot_assists': 0, 'shots_taken':2, 'assists':0, 'goals':0 },
                {'player':19677,'id': 9,'passes_completed':35, 'passes_attempted':38, 'passing_accuracy':92.1,'shot_assists': 2, 'shots_taken':4, 'assists':0, 'goals':1 },
                {'player':5207,'id': 7,'passes_completed':33, 'passes_attempted':34, 'passing_accuracy':97.05,'shot_assists': 0, 'shots_taken':3, 'assists':0, 'goals':0 },
                {'player':6399,'id': 11,'passes_completed':7, 'passes_attempted':8, 'passing_accuracy':87.5, 'shot_assists': 1,'shots_taken':2, 'assists':0, 'goals':2 },
                {'player':5202,'id': 6,'passes_completed':45, 'passes_attempted':50, 'passing_accuracy':90,'shot_assists': 1, 'shots_taken':1, 'assists':0, 'goals':0 },
                {'player':5719,'id': 20,'passes_completed':1, 'passes_attempted':2, 'passing_accuracy':50, 'shot_assists': 0,'shots_taken':0, 'assists':0, 'goals':0 }
             ]
    

             console.log(stats)
        
        /* d3.select("#selectButton")
            .selectAll('myOptions')
            .data(stats)
            .enter()
            .append('option')
            .text(function(d){return d.id}) // text showed in the menu
            .attr("value", function (d) { return d.id}) */

            console.log(d3.max(stats, d=>d.id))

        svg4.append('rect')
            .attr("x",0)
            .attr('y',0)
            .attr('width', width4)
            .attr('height', height)
            .attr('fill', 'grey')
            .attr('opacity', 0.5)
svg4.append("circle")
        .attr("cx", 50)
        .attr("cy",50)
        .attr("r", 13)
        .attr("fill", "black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 12
            stat(button)
            console.log(button)
        })
    
    svg4.append("circle")
        .attr("cx", 50)
        .attr("cy", 90)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 4
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 50)
        .attr("cy", 130)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 5
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 50)
        .attr("cy", 170)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 2
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 125)
        .attr("cy", 70)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 8
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 125)
        .attr("cy", 110)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 14
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 125)
        .attr("cy", 150)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 10
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 200)
        .attr("cy", 70)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 7
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 200)
        .attr("cy", 110)
        .attr("r", 13)
        .attr("fill", "#black")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 22
            stat(button)
            console.log(button)
        })
    svg4.append("circle")
        .attr("cx", 200)
        .attr("cy", 150)
        .attr("r", 13)
        .attr("fill", "#black")
        //.attr("stroke", "white")
        .on('mouseover', function(d,i){
            d3.select(this)
                .attr("stroke-width", 2)
                .attr("stroke", "white")
        })
        .on('mouseout', function(){
            d3.select(this)
                .attr("stroke-width", 0)
        })
        .on('click', function (d, i) {
            button = 9
            stat(button)
            console.log(button)
        })
    
    //player numbers
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 50)
        .attr("dy", 50)
        .text(12)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 50)
        .attr("dy", 90)
        .text(4)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 50)
        .attr("dy", 130)
        .text(5)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 50)
        .attr("dy", 170)
        .text(2)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 50)
        .attr("dy", 170)
        .text(2)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 125)
        .attr("dy", 70)
        .text(8)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 125)
        .attr("dy", 110)
        .text(14)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 125)
        .attr("dy", 150)
        .text(10)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )

    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 200)
        .attr("dy", 70)
        .text(7)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )

    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 200)
        .attr("dy", 110)
        .text(22)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    svg4.append("text")
        .attr("text-anchor", "middle")
        .attr("dx", 200)
        .attr("dy", 150)
        .text(9)
        .attr('font-size', "15px")
        .style("fill", "white")
        .attr("transform", "translate(0,5)" )
    

    var x_passes_completed=d3.scaleLinear()
                                .domain([0,d3.max(stats, d=>d.passes_completed)])
                                .range([margin.left, 200])
    var x_passing_accuracy=d3.scaleLinear()
                                .domain([0,d3.max(stats, d=>d.passing_accuracy)])
                                .range([margin.left, 200])

    var x_passes_attempted=d3.scaleLinear()
                                .domain([0,d3.max(stats, d=>d.passes_attempted)])
                                .range([margin.left, 200])
        console.log(x_passes_completed(25))

    var x_shots_taken=d3.scaleLinear()
                                .domain([0,d3.max(stats, d=>d.shots_taken)])
                                .range([margin.left, 200])

    var x_shot_assists=d3.scaleLinear()
                                .domain([0,d3.max(stats, d=>d.shot_assists)])
                                .range([margin.left, 200])

    /* var x_shots_taken=d3.scaleLinear()
                                .domain([0,d3.max(stats, d=>d.shots_taken)])
                                .range([0, width]) */
        console.log(x_passes_completed(25))

    var y_stats=d3.scaleBand()
                    .domain(['Passes', 'Shots', 'Accuracy'])
                    .range([20, height])
                    .padding(0.2)

             console.log(stats.filter(d=>d.id==7))

console.log(height)

        svg4.append('text')
                //.attr("text-anchor", "middle")
                .attr("dx", 20)
                .attr("dy", 230)
                .text('GOALS :')
                .attr('font-size', "15px")
                .style("fill", "black")

        svg4.append('text')
               //.attr("text-anchor", "middle")
               .attr("dx", 20)
               .attr("dy", 255)
               .text('ASSISTS :')
               .attr('font-size', "15px")
               .style("fill", "black")

        svg4.append('text')
                //.attr("text-anchor", "middle")
                .attr("dx", 20)
                .attr("dy", 280)
                .text('SHOTS :')
                .attr('font-size', "15px")
                .style("fill", "black")

        svg4.append('text')
               //.attr("text-anchor", "middle")
               .attr("dx", 20)
               .attr("dy", 315)
               .text('ATTEMPTED PASSES')
               .attr('font-size', "15px")
               .style("fill", "black")

        svg4.append('text')
               //.attr("text-anchor", "middle")
               .attr("dx", 20)
               .attr("dy", 365)
               .text('PASSING ACCURACY')
               .attr('font-size', "15px")
               .style("fill", "black")
               
        svg4.append('text')
               //.attr("text-anchor", "middle")
               .attr("dx", 20)
               .attr("dy", 415)
               .text('SHOT ASSISTS')
               .attr('font-size', "15px")
               .style("fill", "black")

//var button=12

/* var bar = svg4.append("rect")
             .data(stats.filter(d=>d.id==button))
                .attr("x", 20)
             .attr("y", 300)
             .attr("width", function(d){return x_passes_completed(d.passes_completed)})
             .attr("height", 20)
             .attr("fill", "black")
             .style("transfrom", 'translate(50,0)')
 */
function stat(button) {
    
//document.getElementById("svg4").innerHTML=''
var bar1 = svg4.append("rect")
             .data(stats.filter(d=>d.id==button))
            .attr("x", 20)
             .attr("y", 370)
             .attr("width", function(d){return x_passing_accuracy(d.passing_accuracy)})
             .attr("height", 20)
             .attr("fill", "black")

var bar2 = svg4.append("rect")
             .data(stats.filter(d=>d.id==button))
            .attr("x", 20)
             .attr("y", 320)
             .attr("width", function(d){return  x_passes_attempted(d.passes_attempted)})
             .attr("height", 20)
             .attr("fill", "black")

var bar3 = svg4.append("rect")
             .data(stats.filter(d=>d.id==button))
            .attr("x", 20)
             .attr("y", 420)
             .attr("width", function(d){return  x_shot_assists(d.shot_assists)})
             .attr("height", 20)
             .attr("fill", "black")

/* var bar = svg4.append("rect")
             .data(stats.filter(d=>d.id==button))
            .attr("x", 20)
             .attr("y", 420)
             .attr("width", function(d){return  x_shots_taken(d.shots_taken)})
             .attr("height", 20)
             .attr("fill", "black") */

            
        
}})
