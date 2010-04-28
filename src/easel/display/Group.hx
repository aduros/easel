package easel.display;

import easel.display.Sprite;
import easel.Scene;

class Group extends Sprite
{
    public function new ()
    {
        super();
        _children = [];
    }

    public function add (sprite :Sprite)
    {
        if (isActive() && !sprite.isActive()) {
            sprite.activate(scene);
        }
        if (sprite.parent != null) {
            sprite.parent.remove(sprite);
        }
        for (child in _children) {
            if (child == sprite) {
                return;
            }
        }
        _children.push(sprite);
        sprite.parent = this;
    }

    override public function activate (scene :Scene)
    {
        super.activate(scene);
        for (child in _children) {
            child.activate(scene);
        }
    }

    override public function destroy ()
    {
        super.destroy();
        for (child in _children) {
            child.parent = null; // TODO: nulling necessary?
            child.destroy();
        }
        _children = null;
    }

    public function iterator () :Iterator<Sprite>
    {
        return _children.iterator();
    }

    public function remove (sprite :Sprite)
    {
        if (_children.remove(sprite)) {
            sprite.parent = null;
        }
    }

    public function getNumChildren ()
    {
        return _children.length;
    }

    public function removeAll ()
    {
        for (sprite in _children) {
            sprite.parent = null;
        }
        _children = [];
    }

    public function contains (sprite :Sprite) :Bool
    {
        for (x in _children) {
            if (sprite == x) {
                return true;
            }
        }
        return false;
    }

    override public function draw (ctx :Context2d)
    {
        for (child in _children) {
            child.render(ctx);
        }
    }

    override public function packBounds ()
    {
        var bounds :Rect = [0.0, 0.0, 0.0, 0.0];
        for (child in _children) {
            child.packBounds();
            var bb = child.boundingBox;
            bounds[0] = Math.min(bb[0]+child.x, bounds[0]);
            bounds[1] = Math.min(bb[1]+child.y, bounds[1]);
            bounds[2] = Math.max(bb[2]+bb[0]+child.x, bounds[2]);
            bounds[3] = Math.max(bb[3]+bb[1]+child.y, bounds[3]);
        }
        boundingBox = bounds;
        trace("Packed: " + bounds);
        super.packBounds();
    }

    public var _children :Array<Sprite>;
}
