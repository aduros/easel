package easel.tasks;

class Sequence
    implements Task
{
    public function new (tasks :Array<Dynamic> = null)
    {
        _tasks = cast tasks;
        _ii = 0;
    }

    public function update (dt)
    {
        if (_tasks[_ii].update(dt)) {
            _ii += 1;
            if (_ii < _tasks.length) {
                return false;
            } else {
                _ii = 0;
                return true;
            }
        } else {
            return false;
        }
    }

    private var _ii :Int;
    private var _tasks :Array<Task>;
}
