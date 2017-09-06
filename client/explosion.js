// Simulate explosion particle system
const data = [];
const numParticles = 100;
const canvasHeight = 500;
const canvasWidth = 500;

const createData = function (x, y) {
  for (let i = 0; i < numParticles; i++) {
    const obj = {};
    obj.x = x;
    obj.y = y;
    // const sign = Math.random() < 0.5 ? -1 : 1;
    // const slope = sign * Math.random()/Math.random();
    // obj.m = slope; //NOTE: Slope y = mx + b
    // obj.b = y - (x * slope);
    if (Math.random() < 0.5) {
      obj.endX = Math.random() * canvasHeight;
      const sign = Math.random() < 0.5 ? -1 : 1;
      obj.endY = sign < 0 ? canvasHeight : 0;
    } else {
      obj.endY = Math.random() * canvasHeight;
      const sign = Math.random() < 0.5 ? -1 : 1;
      obj.endX = sign < 0 ? canvasWidth : 0;
    }
    data[i] = obj;
  }
}

const createExplosion = function(e) {
  const m = d3.mouse(this);
  createData(m[0], m[1]);
  svg.selectAll('circle').data(data).enter()
                        .append('circle')
                        .attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; })
                        .attr("r", 20)
                        .style('fill', function(e) {
                          return "hsl(" + Math.random() * 360 + ",100%,50%)";})
                          // return d3.rgb(244,(66 + Math.random() * 178) , 66)}); //Red/yellow spectrum is (244, x, 66) where 66 < x < 244
                        .style('fill-opacity', 1)
                        .transition()
                        .duration(5000)
                        .ease(Math.sqrt)
                        .attr('cx', (d) => {
                          return d.endX;
                        })
                        .attr('cy', (d) => {
                          return d.endY;
                        })
                        .style("fill-opacity", 0)
                        .remove();
};

function particle() {
  var m = d3.mouse(this);

  svg.insert("circle", ".canvas")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 1e-6)
      .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
      .style("stroke-opacity", 1)
    .transition()
      .duration(2000)
      .ease(function(x) {
        return x ** 2;
      })
      .attr("r", 100)
      .style("stroke-opacity", 1e-6)
      .remove();

  d3.event.preventDefault();
}


const canvas = d3.select('.canvas');
const svg = canvas.append('svg').attr("width", 500).attr("height", 500);
let i = 0;
// console.log('canvas is', canvas);
canvas.on('click', createExplosion);