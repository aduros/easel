package easel.display;

/**
 * A few parts of the canvas API are effectively static (measureText, createPattern...) but are
 * implemented as methods of the drawing context. Use ScratchCanvas when you don't have one.
 */
class ScratchCanvas
{
    // This context could be in any state, you don't have to clean up changes
    public static var ctx :Context2d;

    private static function __init__ ()
    {
        var canvas = untyped document.createElement("canvas");
        canvas.width = 0;
        canvas.height = 0;
        ctx = canvas.getContext("2d");
    }
}
