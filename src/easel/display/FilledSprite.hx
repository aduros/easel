package easel.display;

class FilledSprite extends Sprite
{
    public var fillStyle (default, setFillStyle) :Dynamic;
    public var strokeStyle (default, setStrokeStyle) :Dynamic;

    public function new (fillStyle :Dynamic, ?width = 0, ?height = 0)
    {
        super();
        _width = width;
        _height = height;
        this.fillStyle = fillStyle;
    }

    public inline function setFillStyle (fillStyle :Dynamic)
    {
        this.fillStyle = fillStyle;
        dirtyContents();
        return fillStyle;
    }

    public inline function setStrokeStyle (strokeStyle :Dynamic)
    {
        this.strokeStyle = strokeStyle;
        dirtyContents();
        return strokeStyle;
    }

    override public function draw (ctx :Context2d)
    {
        var w = (_width > 0) ? _width : ctx.canvas.width;
        var h = (_height > 0) ? _height : ctx.canvas.height;

        if (fillStyle != null) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(0, 0, w, h);
        }
//        ctx.beginPath();
//        ctx.rect(0,0,w,h);
//        if (strokeStyle != null) {
//            ctx.strokeStyle = strokeStyle;
//            ctx.strokeRect(0, 0, w, h);
//        }
    }

    private var _width :Float;
    private var _height :Float;
}
