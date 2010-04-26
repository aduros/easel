package easel;

import js.Dom;

import easel.display.Sprite;
import easel.display.Group;
import easel.display.Context2d;
import easel.tasks.Task;
import easel.util.Signal;

class Scene
{
    public var director :Director;

    public var onClick :Signal<Event>;
    public var onKeyDown :Signal<Event>;
    public var onMouseMove :Signal<Event>;
    public var onUpdate :Signal<Float>;
    public var onShow :Signal<Void>;
    public var onHide :Signal<Void>;

    public var width (getWidth, never) :Float;
    public var height (getHeight, never) :Float;

    public function new ()
    {
        _root = new Group();
        _root.activate(this);

        _tasks = new Array();
        _entities = new Array();

        onUpdate = new Signal();
        onShow = new Signal();
        onHide = new Signal();
        onClick = new Signal();
        onKeyDown = new Signal();
        onMouseMove = new Signal();
        // WARNING: Will blow up if root is packBounds()'d
        //_root.boundingBox = cast [ 0, 0, ctx.canvas.width, ctx.canvas.height ];
    }

    public function addTask (task :Task)
    {
        _tasks.push(task);
    }

    public function removeTask (task :Task)
    {
        _tasks.remove(task);
    }

    public function add (entity :Entity)
    {
        if (Std.is(entity, Sprite)) {
            _root.add(cast entity);
        } else {
            if (!entity.isActive()) {
                entity.activate(this);
            }
            _entities.push(entity);
        }
    }

    public function load ()
    {
    }

    public function unload ()
    {
        _root.destroy();
        for (entity in _entities) {
            entity.destroy();
        }
        trace("Unloading scene");
        _root = null;
        _entities = null;
        director = null;
    }

//    public function update (dt :Float)
//    {
//        for (task in _tasks) {
//            if (task.update(dt)) {
//                _tasks.remove(task); // TODO: Optimize
//            }
//        }
//    }

    public inline function update (dt :Float)
    {
        onUpdate.emit(dt);
        for (task in _tasks) {
            if (task.update(dt)) {
                _tasks.remove(task); // TODO: Optimize
            }
        }
    }

    public inline function render (ctx :Context2d)
    {
        //ctx.canvas.width = ctx.canvas.width; // HACK: Firefox hangs onto the stroke/shadow
        _root.render(ctx);
    }

    public inline function getWidth ()
    {
        return director.width;
    }

    public inline function getHeight ()
    {
        return director.width;
    }

    private var _root :Group;
    private var _tasks :Array<Task>;
    private var _entities :Array<Entity>;
}
