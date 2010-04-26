import js.Dom;
import js.Lib;

import easel.Director;
import easel.Scene;
import easel.display.CircleSprite;
import easel.display.Group;
import easel.display.ImageSprite;
import easel.tasks.AlphaTo;
import easel.tasks.Function;
import easel.tasks.MoveTo;
import easel.tasks.Parallel;
import easel.tasks.Repeat;
import easel.tasks.RotateTo;
import easel.tasks.ScaleTo;
import easel.tasks.Sequence;
import easel.tasks.Tween;
import easel.util.AssetPack;

class MaskingDemo extends Scene
{
    public static var assets = new AssetPack("./");

    override public function load ()
    {
        add(new ImageSprite(assets.get("background.png")));

        var flashlight = new CircleSprite(50);
        flashlight.fillStyle = "#202020";
        flashlight.centerX = flashlight.radius;
        flashlight.centerY = flashlight.radius;
        flashlight.composite = "lighter";

        onMouseMove.add(function (event) {
            flashlight.x = event.clientX + 10;
            flashlight.y = event.clientY + 10;
        });

        var ghostLayer = new easel.display.Group();
        ghostLayer.mask = flashlight;
        add(ghostLayer);

        var wander = null;
        wander = function (ghost :ImageSprite) {
            ghost.addTask(new Sequence([
                MoveTo.linear(ghost, Math.random()*300, Math.random()*300, 2),
                new Function(function () wander(ghost)),
            ]));
        };

        var spawnGhost = function () {
            var ghost = new ImageSprite(assets.get("ghost.png"));
            ghost.x = Math.random()*300;
            ghost.y = Math.random()*300;
            ghost.centerX = ghost.width/2;
            ghost.centerY = ghost.height/2;
            ghost.addTask(new Repeat(new Sequence([
                RotateTo.linear(ghost, Math.PI/8, 1),
                RotateTo.linear(ghost, -Math.PI/8, 1),
            ])));
            ghostLayer.add(ghost);
            wander(ghost);
        };

        for (ii in 0...4) spawnGhost();

        var killCount = 0;

        onClick.add(function (event) {
            var x = event.clientX;
            var y = event.clientY;
            for (ghost in ghostLayer) {
                var dx = event.clientX - (ghost.x + ghost.width/2);
                var dy = event.clientY - (ghost.y + ghost.height/2);
                if (dx*dx + dy*dy < 50*50) {
                    ghost.removeAllTasks();
                    ghost.addTask(new Sequence([
                        new Parallel([
                            AlphaTo.linear(ghost, 0.4, 0.3),
                            ScaleTo.linear(ghost, 2, 2, 1),
                        ]),
                        new Function(ghost.destroy),
                    ]));
                    killCount += 1;
                    Lib.document.getElementById("killCount").innerHTML = ""+killCount;
                    ghostLayer.parent.add(ghost);
                    spawnGhost();
                    break;
                }
            }
        });
    }

    public static function main ()
    {
        var director = new Director(cast Lib.document.getElementById("screen"));
        assets.onComplete.add(function (_) {
            director.init(new MaskingDemo());
        });
        assets.load([ "background.png", "ghost.png" ]);
    }
}
