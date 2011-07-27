//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel.transitions;

import easel.display.ImageSprite;

class FadeTransition extends Transition
{
    public function new (?duration :Float = 0.5)
    {
        super();
        _duration = duration;
    }

    override public function load ()
    {
        add(new ImageSprite(toScene.snapshot()));

        var fromImage = new ImageSprite(fromScene.snapshot());
        add(fromImage);

        addTask(new easel.tasks.Sequence([
            easel.tasks.AlphaTo.linear(fromImage, 0, _duration),
            new easel.tasks.Function(complete),
        ]));
    }
    
    private var _duration :Float;
}
