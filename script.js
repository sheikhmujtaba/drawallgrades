var screen = {width:1000,height:700}
  var margins = {top:10,right:50,bottom:50,left:25}
var PenguinPromise = d3.json("classData.json")
PenguinPromise.then(function(penguins)
{
  console.log(penguins)

   
  setup(penguins)
  
},

function(err)
                    {
    console.log("error", err)
})

var setup = function(array2D)
{
    d3.select("svg")
      .attr("width",screen.width)
      .attr("height",screen.height)
      .append("g")
      .attr("id","graph")
.attr("transform","translate(" +margins.left+","+margins.top+")");
      
    var width = screen.width - margins.left - margins.right; 
    var height = screen.height - margins.top - margins.bottom;
    
    var xScale = d3.scaleLinear()
    xScale.domain([0, 38 ])
    xScale.range([0, width])
    
    var yScale = d3.scaleLinear()
    yScale.domain([0,10])
     yScale.range([height, 0])
    
    var cScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft(yScale)
    d3.select("svg")
        .append("g")
        .classed("axis", true);
    
    d3.select(".axis")
        .append("g")
        .attr("id", "xAxis")
    .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    d3.select(".axis")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", "translate(25,"+margins.top+")")
        .call(yAxis)
    
    drawArray(array2D,xScale, yScale, cScale);
}

var drawArray = function(array2D, xScale, yScale, cScale)
{
    var arrays = d3.select("#graph")
    .selectAll("g")
    .data(array2D)
    .enter()
    .append("g")
    .attr("fill", "none")
    .attr("stroke", function(arr)
          {
            return cScale(arr.quizes)
          })
    .attr("stroke-width", 3)
    .on('mouseover', function(d, i)
           {
            console.log(d)
                d3.select(".img *").remove();
                d3.select(".img")
                    .append("img")
                    .attr("src", "penguins/" + d.picture);
            })
    

var linegenerator = d3.line()
.x(function(num, index){return xScale(index)})
.y(function(num){return yScale(num)})
.curve(d3.curveNatural)

d3.select("body")
        .append("div")
        .attr("class", "img");
    
arrays.append("path")
    .datum(function(obj){ return obj.quizes.map(grades)})
     .attr("d", linegenerator)

        
}

var grades = function(quizes)
{
    return quizes.grade
}
