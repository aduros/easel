//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel;

import easel.tasks.Task;
import easel.util.Signal;

class Entity
{
    public var scene (default, null) :Scene;

    public function registerListener<T> (signal :Signal<T>, slot :Slot<T>)
    {
        if (_signals == null) {
            _signals = [];
            _slots = [];
        }
        signal.add(slot);
        _signals.push(signal);
        _slots.push(slot);
    }

    public function unregister<T> (signal :Signal<T>, slot :Slot<T>)
    {
        // TODO
    }

    public function addTask (task :Task)
    {
        if (_tasks == null) {
            _tasks = [];
        }
        _tasks.push(task);
        if (scene != null) {
            scene.addTask(task);
        }
    }

    public function removeTask (task :Task)
    {
        if (_tasks != null) {
            _tasks.remove(task);
            if (isActive()) {
                scene.removeTask(task);
            }
        }
    }

    public function removeAllTasks ()
    {
        if (_tasks != null) {
            if (isActive()) {
                for (task in _tasks) {
                    scene.removeTask(task);
                }
            }
            _tasks = null;
        }
    }

    public inline function isActive () :Bool
    {
        return (scene != null);
    }

    public function activate (scene :Scene)
    {
        if (isActive()) {
            // TODO: It should cope
            throw "Already active";
        }
        this.scene = scene;
        if (_tasks != null) {
            for (task in _tasks) {
                scene.addTask(task);
            }
        }
    }

    public function destroy ()
    {
        if (!isActive()) {
            throw "Already destroyed";
        }
        if (_signals != null) {
            for (ii in 0..._signals.length) {
                _signals[ii].remove(_slots[ii]);
            }
            _signals = null;
            _slots = null;
        }
        if (_tasks != null) {
            for (task in _tasks) {
                scene.removeTask(task);
            }
            _tasks = null;
        }
        scene = null;
    }

    private var _signals :Array<Signal<Dynamic>>;
    private var _slots :Array<Slot<Dynamic>>;
    private var _tasks :Array<Task>;
}
