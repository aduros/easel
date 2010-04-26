package easel.tasks;

import easel.display.Sprite;
import easel.tasks.Tween;

class RotateTo extends Tween
{
    public function new (sprite :Sprite, to :Float, seconds :Float, easing :EasingFunction)
    {
        super(seconds, easing);
        _sprite = sprite;
        _to = to;
    }

    public static inline function linear (sprite :Sprite, to :Float, seconds :Float)
    {
        return new RotateTo(sprite, to, seconds, Tween.LINEAR);
    }

    override public function begin ()
    {
        _from = _sprite.rotation;
    }

    override public function tick ()
    {
        _sprite.rotation = interp(_from, _to);
    }

    private var _from :Float;
    private var _to :Float;

    private var _sprite :Sprite;
}
