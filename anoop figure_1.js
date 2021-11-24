d3.json("18245_madrid.json").then(function(dataset){
    
    var jersey_numbers={5597 : 1, 5721 : 2, 5485 : 5, 5201 : 4, 5552 : 12, 5539 : 14, 5463 : 10, 5574 : 8, 4926: 22, 19677 : 9, 5207 : 7}
        
    console.log(dataset)

    var plotscale = 800
    
    var margin = {top: (plotscale * (14.86/960)), 
                    right: (plotscale * (20/960)), 
                    bottom: (plotscale * (24/960)), 
                    left: (plotscale* (40/960))}
    var width = plotscale - margin.left - margin.right
    var height = (plotscale * (68/105) - margin.top - margin.bottom) 
        console.log(68/105, height/width)
    
    var x = d3.scaleLinear()
        .domain([0, 120])
        .range([0, width])
    
    var y = d3.scaleLinear()
        .domain([0, 80])
        .range([0,height])
    
    var svg = d3.select("#pattern")
                //.append("svg")
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
    
    // field outline    
      svg.append("rect")
           .attr("id","outline")
           .attr("x", x(0))
           .attr("y", y(0))
           .attr("width", width)
           .attr("height", height)
           .attr("fill", "green")
           .attr("opacity", "0.25")
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
           .attr("r", x(5))
           .attr("fill", "none")
           .attr("stroke", "black")
     
    //group_data=Array.from(d3.group(dataset, d => d.type.name))
      //console.log(dataset)
    
    //console.log(d3.group(dataset, d=>d.location))
    var start = Array.from(d3.group(dataset, d => d.location))
    
    //var start= d3.group(dataset, d=>d.location)
    var end=Array.from(d3.group(dataset, d=>d.pass.end_location))
    

    var temp=10
    var edges = svg.append("g")
                        .selectAll("line")
                        .data(dataset)
                        .enter()
                        .append("line")
                        .attr("x1", function(d){return x(d.location[0])})                           
                        .attr("y1", function(d){return y(d.location[1])})
                        .attr("x2", function(d){return x(d.pass.end_location[0])})
                        .attr("y2", function(d){return y(d.pass.end_location[1])})
                        .attr("stroke", "black")
                        .attr("stroke-width", function(d){
                            if (d.minute==temp && (d.pass.outcome==null)){ 
                                return 1.5
                                }
								else {return 0}})
    
    var start_location = svg.append("g")
                            .selectAll("circle")
                            .data(dataset)
                            .enter()
                            .append("circle")
                            .attr('cx', function(d){return x(d.location[0])})
							.attr('cy', function(d){return y(d.location[1])})
                            .attr("fill", "#157f3b")
                            .attr("r", function(d){
								if (d.minute==temp && (d.pass.outcome==null)){ 
									return 10
									}
									else {return 0}})
                            .on('mouseover', function(){
                                d3.select(this)
                                    .attr("stroke-width",0.5)
                                    .attr("stroke","black")
                            })
                            .on('mouseout', function(){
                                d3.select(this)
                                    .attr("stroke-width", 0)
                            })
                            
    
    var start_text = svg.append("g")
                    .attr("class", "labels")
                    .selectAll("text")
                    .data(dataset)
                    .enter()
                    .append("text")
					.attr("text-anchor", "middle")
                    .attr("dx", function(d){return x(d.location[0])})
                    .attr("dy", function(d){return y(d.location[1])})
                    .text(function(d){
						if (d.minute==temp  && (d.pass.outcome==null)){return jersey_numbers[d.player.id]}
						else {return null}})
                    .attr('font-size', "15px")
                    .attr("transform", "translate(0,5)" )
    
    var end_location=svg.append("g")
                        .selectAll("circle")
                        .data(dataset)
                        .enter()
                        .append("circle")
                        .attr('cx', function(d){ return x(d.pass.end_location[0])})
                        .attr('cy', function(d){return y(d.pass.end_location[1])})
                        .attr("fill",  "#2f7ebc")
                        .attr("r", function(d){
                            if (d.minute==temp && (d.pass.outcome==null)){ 
                                return 10
                                }
								else {return 0}})
                        .attr("transform", "translate(0,-5)" )
                        .on('mouseover', function(){
                            d3.select(this)
                                .attr("stroke-width",0.5)
                                .attr("stroke","black")
                        })
                        .on('mouseout', function(){
                            d3.select(this)
                                .attr("stroke-width", 0)
                        })
    
    
        var end_text = svg.append('g')
                        .attr("class", "labels")
                        .selectAll("text")
                        .data(dataset)
                        .enter()
                        .append("text")
						.attr("text-anchor", "middle")
                        .attr("dx",  function(d){return x(d.pass.end_location[0])})
                        .attr("dy",  function(d){return y(d.pass.end_location[1])})
                        .text(function(d){
                            if (d.pass.recipient !=null && d.minute==temp  && (d.pass.outcome==null)){return jersey_numbers[d.pass.recipient.id]}
                            else{return null}
							})
                        .attr('font-size', "15px")
    
    })
