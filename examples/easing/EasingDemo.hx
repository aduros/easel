import js.Lib;
import js.Dom;

import easel.Director;
import easel.Scene;
import easel.display.FilledSprite;
import easel.display.ImageSprite;
import easel.tasks.MoveTo;
import easel.tasks.RotateBy;
import easel.tasks.ScaleTo;
import easel.tasks.Sequence;
import easel.tasks.Tween;
import easel.util.AssetPack;

class EasingDemo extends Scene
{
    public static var assets = new AssetPack("./");

    override public function load ()
    {
        add(new FilledSprite("#000000"));

        var man = new ImageSprite(assets.get("man.png"));
        man.centerX = man.width/2;
        man.centerY = man.height/2;
        man.x = 50;
        man.y = 50;
        add(man);

        var options = new Hash();
        options.set("Linear", Tween.LINEAR);
        options.set("Quad EaseIn", Tween.QUAD_IN);
        options.set("Expo EaseIn", Tween.EXPO_IN);

        var select :Select = cast Lib.document.getElementById("easings");
        for (name in options.keys()) {
            var option :Option = cast Lib.document.createElement("option");
            option.text = name;
            select.appendChild(option);
        }
        var jumpy :Checkbox = cast Lib.document.getElementById("jumpy");

        onClick.add(function (event) {
            var x = event.clientX;
            var y = event.clientY;

            var easing = options.get(select.value);
            man.removeAllTasks();
            man.addTask(new MoveTo(man, x, y, 1, easing));
            if (jumpy.checked) {
                man.addTask(new RotateBy(man, 2*Math.PI, 1, easing));
                man.addTask(new Sequence([
                    new ScaleTo(man, 2, 2, 0.5, easing),
                    new ScaleTo(man, 1, 1, 0.5, easing),
                ]));
            }
        });
    }

    public static function main ()
    {
        var director = new Director(cast Lib.document.getElementById("screen"));
        assets.onComplete.add(function (_) {
            director.init(new EasingDemo());
        });
        assets.load([ "man.png" ]);
    }
}
