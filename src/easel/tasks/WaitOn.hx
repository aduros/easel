package easel.tasks;

class WaitOn
    implements Task
{
    public function new (predicate :Void -> Bool)
    {
        _p = predicate;
    }

    public function update (dt)
    {
        return _p();
    }

    private var _p :Void -> Bool;
}
