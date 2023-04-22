let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let points = []; 
        let clusters = []; 
        let k = 3;


        canvas.addEventListener('click', function(event) {
            let x = event.pageX - canvas.offsetLeft;
            let y = event.pageY - canvas.offsetTop;
            points.push({x: x, y: y}); 
            drawPoints();
        });


        function drawPoints() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(let i = 0; i < points.length; i++) {
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
        }


        function start() {
            clusters = [];
            for(let i = 0; i < k; i++) {
                clusters.push({x: Math.random() * canvas.width, y: Math.random() * canvas.height});
            }

            for(let iter = 0; iter < 10; iter++) {
                let newClusters = [];
                for(let i = 0; i < k; i++) {
                    newClusters.push({x: 0, y: 0, count: 0});
                }

                for(let i = 0; i < points.length; i++) {
                    let minDist = Infinity;
                    let clusterIndex = 0;
                    for(let j = 0; j < k; j++) {
                        let dist = Math.sqrt((points[i].x - clusters[j].x) ** 2 + (points[i].y - clusters[j].y) ** 2);
                        if(dist < minDist) {
                            minDist = dist;
                            clusterIndex = j;
                        }
                    }
                    newClusters[clusterIndex].x += points[i].x;
                    newClusters[clusterIndex].y += points[i].y;
                    newClusters[clusterIndex].count++;
                }

                for(let i = 0; i < k; i++) {
                    if(newClusters[i].count > 0) {
                        newClusters[i].x /= newClusters[i].count;
                        newClusters[i].y /= newClusters[i].count;
                    } else {
                        newClusters[i].x = Math.random() * canvas.width;
                        newClusters[i].y = Math.random() * canvas.height;
                    }
                }

                clusters = newClusters;
            }

            for(let i = 0; i < points.length; i++) {
                let minDist = Infinity;
                let clusterIndex = 0;
                for(let j = 0; j < k; j++) {
                    let dist = Math.sqrt((points[i].x - clusters[j].x) ** 2 + (points[i].y - clusters[j].y) ** 2);
                    if(dist < minDist) {
                        minDist = dist;
                        clusterIndex = j;
                    }
                }
                ctx.fillStyle = ["red", "green", "blue"][clusterIndex];
                ctx.beginPath();
                ctx.arc(points[i].x, points[i].y, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
        }