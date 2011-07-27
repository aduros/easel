//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel.tasks;

class Parallel
    implements Task
{
    public function new (tasks :Array<Dynamic> = null)
    {
        _tasks = cast tasks; // Sigh
        _completedTasks = [];
    }

    public function update (dt)
    {
        for (ii in 0..._tasks.length) {
            var task = _tasks[ii];
            if (task != null && task.update(dt)) {
                _tasks[ii] = null;
                _completedTasks.push(task);
            }
        }
        if (_completedTasks.length == _tasks.length) {
            _tasks = _completedTasks;
            _completedTasks = [];
            return true;
        } else {
            return false;
        }
    }

    private var _completedTasks :Array<Task>;
    private var _tasks :Array<Task>;
}
