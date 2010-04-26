package easel.util;

typedef Slot<T> = T -> Void;

class Signal<T>
{
    public function new ()
    {
        _slots = new Array();
    }

    public inline function add (slot :Slot<T>)
    {
        _slots.push(slot);
    }

    public inline function remove (slot :Slot<T>)
    {
        _slots.remove(slot);
    }

    public function emit (signal :T)
    {
        for (slot in _slots) {
            slot(signal);
        }
    }

    private var _slots :Array<Slot<T>>;
}
