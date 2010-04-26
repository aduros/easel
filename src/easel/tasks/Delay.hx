package easel.tasks;

class Delay
    implements Task
{
    public function new (seconds :Float)
    {
        _duration = seconds*1000;
        _elapsed = 0;
    }

    public function update (dt)
    {
        _elapsed += dt;
        if (_elapsed >= _duration) {
            _elapsed = 0;
            return true;
        } else {
            return false;
        }
    }

    private var _elapsed :Float;
    private var _duration :Float;
}
