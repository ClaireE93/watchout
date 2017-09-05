
// d3.select("body").append("svg").attr("width", 20)
//   .attr("height", 20).append("circle")
//   .attr("cx", 10).attr("cy", 10).attr("r", 10)
//   .style("fill", "purple");

data = [
{x: 10, y: 10},
{x: 20, y: 20},
{x: 30, y: 30},
];

const boardWidth = 400;
const boardHeight = 400;
svg = d3.select(".board").append("svg")
      .attr("width", '' + boardWidth).attr("height",'' + boardHeight);
svg.selectAll('circle').data(data).enter()
  .append('circle')
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .attr("r", 10);
