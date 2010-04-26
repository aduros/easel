package easel.tasks;

import easel.display.Sprite;
import easel.tasks.Tween;
import easel.Div;

import js.Dom;

class StyleTo extends Tween
{
    public function new (div :Div, prop :String, from :Float, to :Float, unit :String, seconds :Float, easing :EasingFunction)
    {
        super(seconds, easing);
        _style = (cast div)._element.style;
        _prop = prop;
        _from = from;
        _to = to;
        _unit = unit;
    }

    public static inline function linear (div :Div, prop :String, from :Float, to :Float,
        unit :String, seconds :Float)
    {
        return new StyleTo(div, prop, from, to, unit, seconds, Tween.LINEAR);
    }

    override public function tick ()
    {
        _style.setProperty(_prop, interp(_from, _to) + _unit, null);
    }

    private var _from :Float;
    private var _to :Float;

    private var _style :Dynamic;
    private var _prop :String;
    private var _unit :String;
}
