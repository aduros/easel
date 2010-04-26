import easel.Director;
import easel.Scene;
import easel.display.FilledSprite;
import easel.display.TextSprite;
import easel.display.Group;
import easel.display.ImageSprite;
import easel.tasks.RotateTo;
import easel.tasks.MoveTo;
import easel.tasks.Parallel;
import easel.tasks.ScaleTo;
import easel.tasks.Sequence;
import easel.tasks.Repeat;
import easel.tasks.Function;
import easel.tasks.Delay;
import easel.tasks.WaitOn;
import easel.util.AssetPack;

import js.Lib;
import js.Dom;

class CustomPanel extends Group
{
    public function new (imageData :Image)
    {
        super();
        var image :ImageSprite = new ImageSprite(imageData);
        add(image);
        addTask(new Sequence([
            new Function(function () trace("Begin")),
            MoveTo.linear(image, 300, 300, 2),
            new Function(function () trace("End")),
            new easel.tasks.PlayAudio("static/yahoo", true),
            new Function(destroy),
            new Function(function () trace("THIS SHOULD NEVER BE PRINTED")),
        ]));
        trace("Yay");
    }

//    override public function activate (scene :Scene)
//    {
//        super.activate(scene);
//        registerListener(scene.onUpdate, function (dt) {
//            trace(dt);
//        });
//    }
}
