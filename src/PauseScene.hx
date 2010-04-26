import easel.Director;
import easel.Scene;
import easel.display.FilledSprite;
import easel.display.TextSprite;
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

class PauseScene extends Scene
{
    public function new ()
    {
        super();

        var bg = new FilledSprite("#0000ff");
        bg.alpha = 0.5;
        add(bg);

        var label = new TextSprite("PAUSED"); 
        label.fillStyle = "#ffffff";
        label.font = "24px bold";
        label.x = 200;
        label.y = 300;
        label.packBounds();
        trace(label.width);
        add(label);

        addTask(new Repeat(new Sequence([
            ScaleTo.linear(label, 1.5, 1.5, 0.5),
            ScaleTo.linear(label, 1, 1, 0.5),
        ])));
    }

    override public function load ()
    {
        var button = new easel.Div("unpause button");
        var self = this;
        button.onClick.add(function (_) {
            self.director.popScene();
        });
        add(button);
    }
}
