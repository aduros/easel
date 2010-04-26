package easel.tasks;

import easel.display.Sprite;
import easel.tasks.Tween;

class AlphaTo extends Tween
{
    public function new (sprite :Sprite, to :Float, seconds :Float, easing :EasingFunction)
    {
        super(seconds, easing);
        _sprite = sprite;
        _to = to;
    }

    public static inline function linear (sprite :Sprite, to :Float, seconds :Float)
    {
        return new AlphaTo(sprite, to, seconds, Tween.LINEAR);
    }

    override public function begin ()
    {
        _from = _sprite.alpha;
    }

    override public function tick ()
    {
        _sprite.alpha = interp(_from, _to);
    }

    private var _from :Float;
    private var _to :Float;

    private var _sprite :Sprite;
}
