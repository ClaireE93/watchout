
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

const scoreTimer = d3.timer(function(elapsed) {
  const cur = document.getElementById('currentScoreCount').textContent
  document.getElementById('currentScoreCount').textContent = '' + (+cur + 1);
}, 1000);

const moveEnemies = () => {
    enemiesSVG.transition().duration(1500).attr('cx', function(d) {
      return Math.floor(Math.random() * boardWidth);
    })
    .attr('cy', function(d) {
      return Math.floor(Math.random() * boardHeight);
    })
    .tween('collision', collisionDetection)
    .each('end', moveEnemies);

};

const collision = function() {
  const cur = document.getElementById('currentScoreCount');
  const high = document.getElementById('highScoreCount');
  const collisionCount = document.getElementById('collisionCount');
  const newHigh = Math.max(+cur.textContent, +high.textContent);
  high.textContent = '' + newHigh;
  cur.textContent = '0';
  collisionCount.textContent = +collisionCount.textContent + 1;
};

const collisionDetection = function() {
  return function() {
    const thisCircle = d3.select(this);
    const player = d3.select('.player');
    const dx = thisCircle.attr('cx') - player.attr('x');
    const dy = thisCircle.attr('cy') - player.attr('y');
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    if (distance < +thisCircle.attr('r') + +player.attr('width')/2) {
      collision();
    }
  };
};

// Create draggable player
// const player = d3.select('svg')
//                  .append("circle").classed('player', true)
//                  .attr('cx', playerObj.x).attr('cy', playerObj.y)
//                  .attr('r', 10).style('fill', 'blue');
const player = d3.select('svg')
                 .append("image").classed('player', true)
                 .attr('xlink:href', 'asteroid.png')
                 .attr('x', playerObj.x).attr('y', playerObj.y)
                //  .attr('r', 10).style('fill', 'blue');
                .attr('width', 20).attr('height', 20);

const dragMove = function(d) {
   d3.select(this)
     .attr("y", d3.event.y)
     .attr("x", d3.event.x)
};

const drag = d3.behavior.drag()
               .on("drag", dragMove);

d3.select(".player").call(drag);

// Get enemies moving
moveEnemies();
// scoreCounter();
