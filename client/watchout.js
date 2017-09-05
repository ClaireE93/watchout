
// d3.select("body").append("svg").attr("width", 20)
//   .attr("height", 20).append("circle")
//   .attr("cx", 10).attr("cy", 10).attr("r", 10)
//   .style("fill", "purple");


const boardWidth = 400;
const boardHeight = 400;
const enemyCount = 20;
const data = Array(enemyCount).fill({});

const generatePosition = function() {
  for (let i = 0; i < enemyCount; i++) {
    const obj = {};
    obj.x = Math.floor(Math.random() * boardWidth);
    obj.y = Math.floor(Math.random() * boardHeight);
    data[i] = obj;
  }
};

generatePosition();


const svg = d3.select(".board").append("svg")
            .attr("width", '' + boardWidth).attr("height",'' + boardHeight);
const enemiesSVG = svg.selectAll('circle').data(data).enter()
                      .append('circle')
                      .attr("cx", function(d) { return d.x; })
                      .attr("cy", function(d) { return d.y; })
                      .attr("r", 10);

const moveEnemies = () => {
  setTimeout(() => {
    enemiesSVG.transition().duration(700).attr('cx', function(d) {
      return Math.floor(Math.random() * boardWidth);
    })
    .attr('cy', function(d) {
      return Math.floor(Math.random() * boardHeight);
    });

    moveEnemies();
  }, 1000);
};

moveEnemies();
