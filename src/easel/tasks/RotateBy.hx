//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel.tasks;

import easel.display.Sprite;
import easel.tasks.Tween;

class RotateBy extends Tween
{
    public function new (sprite :Sprite, by :Float, seconds :Float, easing :EasingFunction)
    {
        super(seconds, easing);
        _sprite = sprite;
        _by = by;
    }

    public static inline function linear (sprite :Sprite, by :Float, seconds :Float)
    {
        return new RotateBy(sprite, by, seconds, Tween.LINEAR);
    }

    override public function begin ()
    {
        _from = _sprite.rotation;
    }

    override public function tick ()
    {
        _sprite.rotation = interp(_from, _from+_by);
    }

    private var _from :Float;
    private var _by :Float;

    private var _sprite :Sprite;
}
