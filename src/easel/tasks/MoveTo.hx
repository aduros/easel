//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel.tasks;

import easel.display.Sprite;
import easel.tasks.Tween;

class MoveTo extends Tween
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
        return new MoveTo(sprite, toX, toY, seconds, Tween.LINEAR);
    }

    public static inline function quadIn (sprite :Sprite, toX :Float, toY :Float, seconds :Float)
    {
        return new MoveTo(sprite, toX, toY, seconds, Tween.QUAD_IN);
    }

    public static inline function expoIn (sprite :Sprite, toX :Float, toY :Float, seconds :Float)
    {
        return new MoveTo(sprite, toX, toY, seconds, Tween.EXPO_IN);
    }

    override public function begin ()
    {
        _fromX = _sprite.x;
        _fromY = _sprite.y;
    }

    override public function tick ()
    {
        _sprite.x = interp(_fromX, _toX);
        _sprite.y = interp(_fromY, _toY);
    }

    private var _fromX :Float;
    private var _fromY :Float;
    private var _toX :Float;
    private var _toY :Float;

    private var _sprite :Sprite;
}
