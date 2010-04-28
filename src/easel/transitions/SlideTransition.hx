package easel.transitions;

import easel.display.ImageSprite;

class SlideTransition extends Transition
{
    override public function load ()
    {
        add(new ImageSprite(toScene.snapshot()));

        var fromImage = new ImageSprite(fromScene.snapshot());
        add(fromImage);

        addTask(new easel.tasks.Sequence([
            easel.tasks.MoveTo.linear(fromImage, width, 0, 0.5),
            new easel.tasks.Function(complete),
        ]));
    }
}
