package easel.tasks;

import easel.display.Sprite;
import easel.tasks.Tween;

class ScaleTo extends Tween
{
    public function new (sprite :Sprite, toX :Float, toY :Float,
        seconds :Float, easing :EasingFunction)
    {
        super(seconds, easing);
        _sprite = sprite;
        _toX = toX;
        _toY = toY;
    }

    public static inline function linear (sprite :Sprite, toX :Float, toY :Float, seconds :Float)
    {
        return new ScaleTo(sprite, toX, toY, seconds, Tween.LINEAR);
    }

    override public function begin ()
    {
        _fromX = _sprite.scaleX;
        _fromY = _sprite.scaleY;
    }

    override public function tick ()
    {
        _sprite.scaleX = interp(_fromX, _toX);
        _sprite.scaleY = interp(_fromY, _toY);
    }

    private var _fromX :Float;
    private var _fromY :Float;
    private var _toX :Float;
    private var _toY :Float;

    private var _sprite :Sprite;
}
