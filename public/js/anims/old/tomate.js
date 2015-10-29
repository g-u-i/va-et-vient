var width, height, center;
        var points = 10;
        var smooth = true;
        var path = new Path({
            fillColor: '#E9284A'
        });

        path.fillColor.alpha = 0.7;

        var pathHeight = 100;
        initializePath();

        function initializePath() {
            center = view.center;
            width = view.size.width;
            height = view.size.height / 2;
            path.segments = [];
            path.add(view.bounds.bottomLeft);
            for (var i = 1; i < points; i++) {
                var point = new Point(width / points * i, center.y * 3);
                path.add(point);
            }
            path.add(view.bounds.bottomRight);
        }

        function onFrame(event) {
            pathHeight += (center.y - pathHeight) / 300;
            for (var i = 1; i < points; i++) {
                var sinSeed = event.count + (i + i % 10) * 100;
                var sinHeight = Math.sin(sinSeed / 100) * pathHeight;
                var yPos = Math.sin(sinSeed / 200) * sinHeight + height * 1.7;
                path.segments[i].point.y = yPos;
            }
            if (smooth)
                path.smooth();
        }

        // Reposition the path whenever the window is resized:
        function onResize(event) {
            initializePath();
        }