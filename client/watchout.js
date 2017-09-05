
const boardWidth = 400;
const boardHeight = 400;
const enemyCount = 20;
const data = Array(enemyCount).fill({});
const playerObj = {x: Math.floor(boardWidth/2),
                   y: Math.floor(boardHeight/2)};

const generatePosition = function() {
  for (let i = 0; i < enemyCount; i++) {
    const obj = {};
    obj.x = Math.floor(Math.random() * boardWidth);
    obj.y = Math.floor(Math.random() * boardHeight);
    data[i] = obj;
  }
};

// Create enemy data object
generatePosition();

// Create enemy svg's
const svg = d3.select(".board").append("svg")
            .attr("width", '' + boardWidth).attr("height",'' + boardHeight);

// const player = svg.selectAll("circle").data([playerObj]).enter()
//                  .append('circle').classed('player', true)
//                  .attr('cx', playerObj.x).attr('cy', playerObj.y)
//                  .style('fill', 'blue');

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

// Get enemies moving
moveEnemies();

// Create draggable player

const player = d3.select('svg')
                 .append("circle").classed('player', true)
                 .attr('cx', playerObj.x).attr('cy', playerObj.y)
                 .attr('r', 10).style('fill', 'blue');

const dragMove = function(d) {
   d3.select(this)
     .attr("cy", d3.event.y)
     .attr("cx", d3.event.x)
};

const drag = d3.behavior.drag()
               .on("drag", dragMove);

d3.select(".player").call(drag);
