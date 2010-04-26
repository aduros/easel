package easel.display;

class CircleSprite extends Sprite
{
    public var radius (default, setRadius) :Float;
    public var fillStyle (default, setFillStyle) :Dynamic;
    public var strokeStyle (default, setStrokeStyle) :Dynamic;

    public inline function setStrokeStyle (strokeStyle :Dynamic)
    {
        this.strokeStyle = strokeStyle;
        dirtyContents();
        return strokeStyle;
    }

    public inline function setFillStyle (fillStyle :Dynamic)
    {
        this.fillStyle = fillStyle;
        dirtyContents();
        return fillStyle;
    }

    public inline function setRadius (radius :Dynamic)
    {
        this.radius = radius;
        dirtyContents();
        return radius;
    }

    public function new (radius :Float)
    {
        super();
        // FIXME
        boundingBox = [-radius, -radius, 2*radius, 2*radius];
        this.radius = radius;
    }

    override public function draw (ctx :Context2d)
    {
        //ctx.closePath();
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI*2, true);
        if (fillStyle != null) {
            ctx.fillStyle = fillStyle;
            //ctx.beginPath();
            ctx.fill();
        }
//        if (strokeStyle != null) {
//            ctx.strokeStyle = strokeStyle;
//            ctx.beginPath();
//            ctx.arc(0, 0, radius, 0, Math.PI*2, true);
//            ctx.stroke();
//        }
//        trace(ctx.strokeStyle);
//        trace(ctx.shadowColor);
//        ctx.stroke();
        //ctx.restore();
    }
}
