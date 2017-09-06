
class Explosion {
  constructor(particles) {
    this.data = [];
    this.numParticles = particles;
    this.canvasHeight = 500;
    this.canvasWidth = 500;
    this.createExplosion();
  }

  createData(x, y) {
    const endR = this.calculateEndRadius(x, y, false);
    const thetaIncrement = (2 * Math.PI) / this.numParticles;
    let curTheta = 0;
    for (let i = 0; i < this.numParticles; i++) {
      const obj = {};
      obj.x = x;
      obj.y = y;
      const randomRadius = Math.random() * endR;
      obj.endX = x + (randomRadius * Math.cos(curTheta));
      obj.endY = y + (randomRadius * Math.sin(curTheta));
      curTheta += thetaIncrement;
      this.data[i] = obj;
    }
  }

  calculateEndRadius(x, y, isSmallest) {
    const xDiff = this.canvasWidth - x;
    const yDiff = this.canvasHeight - y;
    return isSmallest? Math.min(x, y, xDiff, yDiff) : Math.max(x, y, xDiff, yDiff);
  };

  createExplosion() {
    const m = d3.mouse(document.getElementById('canvas'));
    this.createData(m[0], m[1]);
    svg.selectAll('circle').data(this.data).enter()
                          .append('circle')
                          .attr("cx", function(d) { return d.x; })
                          .attr("cy", function(d) { return d.y; })
                          .attr("r", () => 20 * Math.random())
                          .style('fill', function(e) {
                            return "hsl(" + Math.random() * 360 + ",100%,50%)";})
                          .style('fill-opacity', 1)
                          .transition()
                          .duration(() => {
                            return Math.random() * 4000;
                          })
                          .ease(Math.sqrt)
                          .attr('cx', (d) => {
                            return d.endX;
                          })
                          .attr('cy', (d) => {
                            return d.endY;
                          })
                          .style("fill-opacity", 0)
                          .remove();
    d3.event.preventDefault();
  }
}

const canvas = d3.select('.canvas');
const svg = canvas.append('svg').attr("width", 500).attr("height", 500);
canvas.on('click', function() {
  new Explosion(Math.random() * 150);
});
