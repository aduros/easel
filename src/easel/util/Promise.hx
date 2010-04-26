package easel.util;

class Promise<T>
{
    public function new ()
    {
        _callbacks = new Array();
    }

    public function get (f :T -> Void)
    {
        if (_callbacks != null) {
            _callbacks.push(f);
        } else {
            f(_result);
        }
    }

    public function set (x :T)
    {
        _result = x;
        if (_callbacks != null) {
            for (f in _callbacks) {
                f(x);
            }
            _callbacks = null;
        }
    }

    private var _result :T;
    private var _callbacks :Array<T->Void>;
}
