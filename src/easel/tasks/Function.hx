package easel.tasks;

class Function
    implements Task
{
    public function new (f :Void -> Void)
    {
        _f = f;
    }

    public function update (dt)
    {
        _f();
        return true;
    }

    public var _f :Void -> Void;
}
