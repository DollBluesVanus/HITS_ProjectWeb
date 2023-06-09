var n = document.getElementById("size").value;
var table = document.getElementById("table");
var start = null;
var end = null;
var impassables = new Set();

generateMap();

function generateMap() {
    n = document.getElementById("size").value;
    var newTable = document.createElement("table");
    for (var i = 0; i < n; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < n; j++) {
          var cell = document.createElement("td");
          cell.dataset.x = j;
          cell.dataset.y = i;
          cell.addEventListener("click", function () {
            if (start === null && !impassables.has(this)) {
              start = this;
              this.innerHTML = "S";
            } else if (end === null && this != start && !impassables.has(this)) {
              end = this;
              this.innerHTML = "E";
            }else if(this===start || this===end){
              if(this===start){
                start = null;
                this.innerHTML = "";
              }
              if(this===end){
                end = null;
                this.innerHTML = "";
              }
            } else if (start!=null && end!=null && this!=start && this!=end){
                if (!impassables.has(this)) {
                    impassables.add(this);
                    this.classList.add("impassable");
                } else if (impassables.has(this)){
                  impassables.delete(this);
                  this.classList.remove("impassable");
              }
            }
          });
          row.appendChild(cell);
        }
        newTable.appendChild(row);
      }

    table.parentNode.replaceChild(newTable, table);

    table = newTable;
    start = null;
    end = null;
    impassables.clear();
    pathFound = false;
    path = null;
}

function findPath() {

    // удаляем старый

    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var cell = table.rows[i].cells[j];
            cell.classList.remove("path");
        }
    }
    //новый
    if (start === null || end === null) {
      alert("Укажите стартовую и конечную клетки!");
    } else {
      var openSet = new Set([start]);
      var cameFrom = new Map();
      var gScore = new Map([[start, 0]]);
      var fScore = new Map([[start, heuristic(start, end)]]);
      while (openSet.size > 0) {
        var current = getLowestFScore(openSet, fScore);
        if (current === end) {
          showPath(cameFrom, end);
          return;
        }
        openSet.delete(current);
        for (var neighbor of addNeighbors(current)) {
          if (impassables.has(neighbor)) {
            continue;
          }
          var tentativeGScore = gScore.get(current) + 1;
          if (
            !gScore.has(neighbor) ||
            tentativeGScore < gScore.get(neighbor)
          ) {
            cameFrom.set(neighbor, current);
            gScore.set(neighbor, tentativeGScore);
            fScore.set(
              neighbor,
              tentativeGScore + heuristic(neighbor, end)
            );
            if (!openSet.has(neighbor)) {
              openSet.add(neighbor);
            }
          }
        }
      }
      alert("Путь не найден!");
    }
}

function getLowestFScore(set, scores) {
    var lowest = null;
    var lowestScore = Infinity;
    for (var elem of set) {
      if (scores.get(elem) < lowestScore) {
        lowest =         elem;
        lowestScore = scores.get(elem);
      }
    }
    return lowest;
}

function addNeighbors(cell) {
    var neighbors = new Set();
    var x = cell.cellIndex;
    var y = cell.parentNode.rowIndex;
    if (x > 0) {
      neighbors.add(table.rows[y].cells[x - 1]);
    }
    if (x < n - 1) {
      neighbors.add(table.rows[y].cells[x + 1]);
    }
    if (y > 0) {
      neighbors.add(table.rows[y - 1].cells[x]);
    }
    if (y < n - 1) {
      neighbors.add(table.rows[y + 1].cells[x]);
    }

    if (x > 0 && y > 0) {
      neighbors.add(table.rows[y - 1].cells[x - 1]);
    }
    if (x < n - 1 && y > 0) {
      neighbors.add(table.rows[y + 1].cells[x - 1]);
    }
    if (x > 0 && y < n - 1) {
      neighbors.add(table.rows[y - 1].cells[x + 1]);
    }
    if (x < n - 1 && y < n - 1) {
      neighbors.add(table.rows[y + 1].cells[x + 1]);
    }
    return neighbors;
}

function heuristic(a, b) {
    var x1 = a.cellIndex;
    var y1 = a.parentNode.rowIndex;
    var x2 = b.cellIndex;
    var y2 = b.parentNode.rowIndex;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function showPath(cameFrom, current) {
    while (cameFrom.has(current)) {
      current = cameFrom.get(current);
      if (current != start) {
        current.classList.add("path");
      }
    }
}