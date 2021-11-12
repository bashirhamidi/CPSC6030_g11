// Bashir Hamidi
// CPSC 6030 

//d3.json("18245_madrid.json").then(function (dataset) {
d3.json("dataset.json").then(function (dataset) {

    console.log(dataset)
    console.log(dataset[0].player.id)

    /*
          var p_5485 = dataset.filter(function (d) {
              return d.player.id == 5485;
          })
    */
    var dimensions = {
        width: 1000,
        height: 800,
        margin: {
            top: 10,
            bottom: 50,
            right: 10,
            left: 50
        }
    }

    var svg = d3.select("#chart")
        .append("svg")
        .style("width", dimensions.width + dimensions.margin.left + dimensions.margin.right)
        .style("height", dimensions.height + dimensions.margin.top + dimensions.margin.bottom)
        .append("g")
        .attr("transform", "translate(" + dimensions.margin.left + "," + dimensions.margin.top + ")");

    var xAccessor = d => d.minute
    var yAccessor = d => d.y_counts
    var idAccessor = d => d.player.id

    console.log("x Accessor", xAccessor(dataset[0]))
    console.log("y Accessor", yAccessor(dataset[0]))
    console.log("id Accessor", idAccessor(dataset[0]))

    //    var counts = Array.from(d3.group(dataset, d => d.y_counts))
    //    console.log("Array.from group y_counts", counts)
    //    console.log(Array.isArray(y_counts))

    console.log(
        "extent x Accessor", d3.extent(dataset, xAccessor),
        "max x Accessor", d3.max(dataset, xAccessor)
    )

    //    var stackedData = d3.stack()
    //    .keys(names)
    //   (dataset)

    var xScale = d3.scaleBand()
        .domain(d3.extent(dataset, xAccessor)) //defines the interval of values in our dataset
        .range([0, dimensions.width]) //defines the pixels // starting from zero pixel and maximum value is what we have set for the graph at the top of script  
        .padding(0.2)

    var yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.height, 0]) //on the y axis everything is swapped. starts from top and goes down


    var bar = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", d => xScale(xAccessor(d)))
        .attr("y", d => yScale(yAccessor(d)))
        .attr("width", xScale.bandwidth())
        .attr("height", d => dimensions.height - dimensions.margin.bottom - yScale(d[0].length))

})
/*
    //below is from classroom barchart
    var xScale = d3.scaleBand()
        .domain(labels)
        .range([dimensions.margin.left, dimensions.width - dimensions.margin.right])
        .padding(0.2)
    console.log(d3.max(forecast, d => d[1].length))

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(forecast, d => d[1].length)])
        .range([dimensions.height - dimensions.margin.bottom, dimensions.margin.top])
        */

    //    var stackedData = d3.stack()
    //      .keys(names)
    //       (dataset)
    //    console.log(stackedData)



    // loop over all passes for single player and get count of passes for every minute
    //'00:00:00.618', '00:47:30.959'
    // [0, 92]

/*
    var x_minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    x_minutes.forEach(function (item, index, array) {
        console.log(item, index)
    })
    var y_counts = [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2]
    console.log(y_counts)
    y_counts.forEach(function (item, index, array) {
        console.log(item, index)
    })
*/