var raster;
        var values = {
            // The amount of paths to produce:
            amount: 400
        };
        // Create a raster object, using the image
        var url = "orange";
        var raster = new Raster({
        	source: url,
        	position: view.center
        });

        // Transform the raster so it fills the bounding rectangle
        // of the view:
        raster.fitBounds(view.bounds, true);

        // Hide the raster:
        raster.visible = false;

        // Create the group of circle shaped paths and scale it up a bit:
        var group = createPhyllotaxis(values.amount);
        group.scale(3);

        function createPhyllotaxis(amount) {
            var group = new Group();
            // The Golden Angle (http://en.wikipedia.org/wiki/Golden_angle)
            var rotation = 137.51;
            var spacing = 5;
            for (var i = 1; i <= amount; i++) {
                var radius = 8 - (i / amount * 4);
                new Path.Rectangle({
                    point: {
                        length: spacing * Math.sqrt(i),
                        angle: i * rotation
                    },
                    size: new Size(0.95, 0.7) * radius,
                    radius: new Size(radius / 4),
                    parent: group
                }).rotate(i * rotation + 45);
            }
            return group;
        }

        function colorizePaths(offset) {
            for (var i = offset % 50, l = group.children.length; i < l; i += 50) {
                var path = group.children[i];
                // Set the path's fill color to the average color of the
                // raster pixels that fall within it:
                path.fillColor = raster.getAverageColor(path);
            }
        }

        var position = view.center;
        // function onMouseMove(event) {
        //     position = event.point;
        // }

        // Whenever the window is resized, we need to fit the raster
        // in the bounding rectangle of the view again:
        function onResize() {
            raster.fitBounds(view.bounds, true);
        }

        function onFrame(event) {
            // 1/4th of the difference between the center position of
            // the group and the current position of the mouse:
            var delta = (position - group.position) / 4;
            // If the length of the delta vector (the distance) is bigger
            // than 1, reposition the group:
            if (delta.length > 1)
                group.position += delta;
            // Rotate the group of paths by 1 degree:
            group.rotate(1);
            // Rotate each path in the group by 2 degrees:
            for (var i = 0, l = group.children.length; i < l; i++) {
                group.children[i].rotate(2);
            }
            // Colorize the paths every other frame:
            colorizePaths(event.count);
        }





// var center = view.center;
// var triangle = new Path.RegularPolygon({
//     center: center,
//     sides: 3,
//     radius: 300,
//     fillColor: 'black'
// });

// // triangle.selected = true;

// for(i=0; i < 15; i++){
// 	var copy = triangle.clone();
// 	copy.scale(0.1, triangle.bounds.bottomLeft);
// 	copy.position = new Point(triangle.bounds.bottomLeft.x + i * 35, triangle.bounds.bottomLeft.y);
// 	copy.rotate(40);
// 	copy.fillColor = '#F88721';

// 	var copy2 = triangle.clone();
// 	copy2.scale(0.1, triangle.bounds.bottomLeft);
// 	copy2.position = new Point(triangle.bounds.bottomLeft.x + i * 18, triangle.bounds.bottomLeft.y - i * 32);
// 	copy2.rotate(40);
// 	copy2.fillColor = '#F88721';

// 	var copy3 = triangle.clone();
// 	copy3.scale(0.1, triangle.bounds.bottomRight);
// 	copy3.position = new Point(triangle.bounds.bottomRight.x - i * 17, triangle.bounds.bottomRight.y - i * 32);
// 	copy3.rotate(45);
// 	copy3.fillColor = '#F88721';
// }


// triangle.fillColor = '#F88721';

// var children = project.activeLayer.children;

// function onFrame(event) {
// 	// Each frame, rotate the path by 3 degrees:
// 	// triangle.rotate(0.1);
// 	// copy.rotate(0.1);
// }