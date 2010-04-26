package easel.tasks;

typedef EasingFunction = Float -> Float -> Float -> Float -> Float;

class Tween
    implements Task
{
    public static var LINEAR :EasingFunction = cast function (t, a, b, d) {
        return a + (b-a)*(t/d);
    };

    public static var QUAD_IN :EasingFunction = cast function (t :Float, a, b, d) {
        t /= d;
        return (b-a)*t*t + a;
    };

    public static var EXPO_IN :EasingFunction = cast function (t, a, b, d) {
        return (b-a) * Math.pow( 2, 10 * (t/d - 1) ) + a;
    };

    private function new (seconds :Float, easing :EasingFunction)
    {
        _duration = seconds*1000;
        _elapsed = 0;
        _easing = easing;
    }

    public function begin ()
    {
    }

    public function tick ()
    {
    }

    public function update (dt)
    {
        if (_elapsed == 0) {
            begin();
        }
        _elapsed += dt;
        if (_elapsed > _duration) {
            _elapsed = _duration;
        }
        tick();
        if (_elapsed >= _duration) {
            _elapsed = 0;
            return true;
        } else {
            return false;
        }
    }

    private inline function interp (from :Float, to :Float) :Float
    {
        return _easing(_elapsed, from, to, _duration);
    }

    private var _elapsed :Float;
    private var _duration :Float;
    private var _easing :EasingFunction;
}
