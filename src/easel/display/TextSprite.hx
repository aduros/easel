package easel.display;

class TextSprite extends Sprite
{
    public var text (default, setText) :String;
    public var align (default, setAlign) :String;
    public var font (default, setFont) :String;
    public var baseline (default, setBaseline) :String;
    public var fillStyle (default, setFillStyle) :String;
    public var strokeStyle (default, setStrokeStyle) :String;
    public var maxWidth (default, setMaxWidth) :Float;

    public inline function setText (text :String)
    {
        this.text = text;
        dirtyContents();
        return text;
    }

    public inline function setAlign (align :String)
    {
        this.align = align;
        dirtyContents();
        return align;
    }

    public inline function setFont (font :String)
    {
        this.font = font;
        dirtyContents();
        return font;
    }

    public inline function setBaseline (baseline :String)
    {
        this.baseline = baseline;
        dirtyContents();
        return baseline;
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

    public inline function setMaxWidth (maxWidth :Float)
    {
        this.maxWidth = maxWidth;
        dirtyContents();
        return maxWidth;
    }

    public function new (?text :String = "")
    {
        super();
        this.text = text;
//        this.align = "start";
//        this.baseline = "alphabetic";
        this.font = "12px serif";
    }

    override public function packBounds (?ctx :Context2d)
    {
        if (ctx != null) {
//            ctx.fillStyle = fillStyle;
//            if (align != null) {
//                ctx.textAlign = align;
//            }
//            if (baseline != null) {
//                ctx.textBaseline = baseline;
//            }
            ctx.save();
            ctx.font = font;
            boundingBox[2] = ctx.measureText(text).width;
            ctx.restore();

            if (maxWidth != null && maxWidth > boundingBox[2]) {
                boundingBox[2] = maxWidth;
            }

            boundingBox[3] = 50; // No metrics.height, unngh;

            switch (align) {
                case "center": boundingBox[0] = -boundingBox[2]/2;
                case "right": boundingBox[0] = -boundingBox[2];
                default: boundingBox[0] = 0; // left
            }
            switch (baseline) {
                case "top": boundingBox[1] = 0;
                case "hanging": boundingBox[1] = 0;
                case "middle": boundingBox[1] = -boundingBox[3]/2;
                default: boundingBox[1] = -boundingBox[3]; // bottom
            }

            trace(boundingBox);

//            if (align == "right") {
//                boundingBox[0] = -metrics.width;
//            } else if (align == "center") {
//                boundingBox[0] = -metrics.width/2;
//            }
        }
        super.packBounds(ctx);
    }

    override public function draw (ctx :Context2d)
    {
        ctx.font = font;
        if (align != null) {
            ctx.textAlign = align;
        }
        if (baseline != null) {
            ctx.textBaseline = baseline;
        }
        if (fillStyle != null) {
            ctx.fillStyle = fillStyle;
            ctx.fillText(text, 0, 0, maxWidth);
        }
        if (strokeStyle != null) {
            ctx.strokeStyle = strokeStyle;
            ctx.strokeText(text, 0, 0, maxWidth);
        }
    }
}
