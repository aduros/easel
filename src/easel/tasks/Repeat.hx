//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel.tasks;

class Repeat
    implements Task
{
    public function new (task :Task)
    {
        _task = task;
    }

    public function update (dt)
    {
        _task.update(dt);
        return false;
    }

    private var _task :Task;
}
