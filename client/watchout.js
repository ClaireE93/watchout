
// d3.select("body").append("svg").attr("width", 20)
//   .attr("height", 20).append("circle")
//   .attr("cx", 10).attr("cy", 10).attr("r", 10)
//   .style("fill", "purple");

const data = [];

const boardWidth = 400;
const boardHeight = 400;
const enemies = 20;
for (let i = 0; i < enemies; i++) {
  const obj = {};
  obj.x = Math.floor(Math.random() * boardWidth);
  obj.y = Math.floor(Math.random() * boardHeight);
  data[i] = obj;
}


svg = d3.select(".board").append("svg")
      .attr("width", '' + boardWidth).attr("height",'' + boardHeight);
svg.selectAll('circle').data(data).enter()
  .append('circle')
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; })
  .attr("r", 10);
