import js.Lib;
import js.Dom;

import easel.Director;
import easel.Scene;
import easel.display.FilledSprite;
import easel.tasks.Repeat;
import easel.tasks.RotateBy;
import easel.util.AssetPack;

class TextDemo extends Scene
{
    override public function load ()
    {
        add(new FilledSprite("#f0f0f0"));
        
        var label = new easel.display.TextSprite("Easel!");
        label.fillStyle = "#000000";
        label.strokeStyle = "#ff0000";
        label.x = width/2;
        label.y = height/2 + 80;
//        label.maxWidth = 50;
        label.shadowBlur = 2;
        label.shadowOffsetX = 15;
        label.shadowOffsetY = 15;
        add(label);

        var center = new easel.display.CircleSprite(2);
        center.fillStyle = "#0000ff";
        center.x = label.x;
        center.y = label.y;
        add(center);

        addTask(new Repeat(RotateBy.linear(label, 2*Math.PI, 20)));

        var cacheAsBitmapCtrl :Checkbox =
            cast js.Lib.document.getElementById("cacheAsBitmap");
        (cacheAsBitmapCtrl.onchange = function (event) {
            label.cacheAsBitmap = cacheAsBitmapCtrl.checked;
        })(null);

        var enableShadowCtrl :Checkbox =
            cast js.Lib.document.getElementById("enableShadow");
        (enableShadowCtrl.onchange = function (event) {
            label.shadowColor = enableShadowCtrl.checked ? "#909090" : null;
        })(null);

        var fontCtrl :Text =
            cast js.Lib.document.getElementById("font");
        (fontCtrl.onchange = function (event) {
            label.font = fontCtrl.value;
        })(null);

        var alignCtrl :Text =
            cast js.Lib.document.getElementById("align");
        (alignCtrl.onchange = function (event) {
            label.align = alignCtrl.value;
        })(null);

        var baselineCtrl :Text =
            cast js.Lib.document.getElementById("baseline");
        (baselineCtrl.onchange = function (event) {
            label.baseline = baselineCtrl.value;
        })(null);
    }

    public static function main ()
    {
        var director = new Director(cast Lib.document.getElementById("screen"));
        director.init(new TextDemo());
    }
}
