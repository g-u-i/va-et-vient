var amount = 10;
        for (var i = 0; i < amount; i++) {
            var path = new Path({
                fillColor: '#563354',
            });
            path.opacity = 0.8;
        }

        var position = view.center;
        var mousePos = view.center;
        var children = project.activeLayer.children;

        function iterate(count) {
            var delta = mousePos - position;
            position += delta / 10;
            for (var i = 1; i < amount; i++) {
                var path = children[i];
                var length = Math.abs(Math.sin(i + count / 40) * 300);
                path.segments = [
                    position + delta / 1.5,
                    position + { angle: i / amount * 360, length: length },
                    position + { angle: (i + 1) / amount * 360, length: length }
                ];
                //path.fillColor.hue = count - length;
            }
        }

        function onFrame(event) {
            iterate(event.count);
        }
