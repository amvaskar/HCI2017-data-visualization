(function(){
    var width= 1200,
        height=700;
   
    var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

    
    var svg= d3.select("#chart")
        .append("svg")
        .attr("height",height)
        .attr("width",width)
        .append("g")
        .attr("transform","translate(0,0)")
    
    var radiusScale=d3.scaleSqrt().domain([1,19]).range([7,50])
    
    var forceXSplit=d3.forceX(function(d){
      if(d.country === 'USA'){
          return 300
      }  else if (d.country ==='UK'){
          
          return 700
      }
        else if (d.country==='Germany'){
            return 1000
            
        }
        else if (d.country==='France'){
            return 300
            
        }
        else if (d.country==='Canada'){
            return 700
            
        }
        else if (d.country==='Japan'){
            return 300
            
        }
        else if (d.country==='China'){
            return 700
            
        }
        else if (d.country==='Finland'){
            return 1000
            
        }
        else 
            {
                return 1000 
            }
    }).strength(0.05)
    
    var forceYSplit=d3.forceY(function(d){
      if(d.country === 'USA'){
          return 200
      }  else if (d.country ==='UK'){
          
          return 160
      } else if (d.country==='Germany'){
            return 160
            
        }
        else if (d.country==='Canada'){
            return 600
            
        }
        else if (d.country==='France'){
            return 450
            
        }
        else if (d.country==='Japan'){
            return 600
            
        }
        else if (d.country==='China'){
            return 400
            
        }
        else if (d.country==='Finland'){
            return 600
            
        }
        else 
            {
                return 400
            }
    }).strength(0.05)
    
    var forceXInitial =d3.forceX(width/1.6).strength(0.02222)
    var forceXCombine =d3.forceX(width/2).strength(0.03)
    var forceCollide = d3.forceCollide(function(d){ return radiusScale(d.total)+2.5 })
    var forceYcombine =d3.forceY(height/2).strength(0.03)
    var simulation= d3.forceSimulation() 
        .force("x",forceXInitial)
        .force("y",forceYcombine)
        .force("collide",forceCollide)
    
    d3.queue()
      .defer(d3.csv,"countries1.csv")
      .await(ready)
    
   
    function ready(error, datapoints){
        var formatTotal= d3.format(",");
         circles= svg.selectAll(".institute")
           .data(datapoints)
           .enter().append("circle")
           .attr("class","institute")
           .attr("r",function(d){
                   return radiusScale(d.total) })
           .attr("fill",'#0288D1')
           
           .on('click',function(d){ 
             
             updateInstituteInfo(d); })
           .on("mouseover", function(d) {	
             console.log("this is working")
             
            div.transition()		
                .duration(200)
                
                .style("opacity", .9);		
            div	.html((d.institute) + ":"  + d.total + "<br/>" + d.country )
             .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
                
            })					
        .on("mouseout", function(d) {	
             
            div.transition()		
                .duration(500)		
                .style("opacity", 0);	
        });

      
        
    d3.select("#country").on('click',function(){
      simulation
      .force("x",forceXSplit)
        .force("y",forceYSplit)
       .alphaTarget(0.111)
       .restart()    
    })
        
    d3.select('#combine').on('click',function(){
        simulation
        .force("x",forceXCombine)
        .force("y",forceYcombine)
        .alphaTarget(0.11)
        .restart()
    })    
        
    simulation.nodes(datapoints)
         .on('tick',ticked)
        
        function ticked(){
            circles
            .attr("cx",function(d){  return d.x })
            .attr("cy",function(d){  return d.y }) 
        }
        }
    
    
    
    function updateInstituteInfo(datapoints) {
       
        var info = [datapoints.institute,datapoints.total].join(":");

      d3.select("#institute-info").html(info);
    }
    
})();