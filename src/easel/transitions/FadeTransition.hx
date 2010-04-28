package easel.transitions;

import easel.display.ImageSprite;

class FadeTransition extends Transition
{
    override public function load ()
    {
        add(new ImageSprite(toScene.snapshot()));

        var fromImage = new ImageSprite(fromScene.snapshot());
        add(fromImage);

        addTask(new easel.tasks.Sequence([
            easel.tasks.AlphaTo.linear(fromImage, 0, 0.5),
            new easel.tasks.Function(complete),
        ]));
    }
}
