package easel.display;

/**
 * A few parts of the canvas API are effectively static (measureText, createPattern...) but are
 * implemented as methods of the drawing context. Use ScratchCanvas when you don't have one.
 */
class ScratchCanvas
{
    // Turns out we also need to keep a reference to the canvas element and not just the context.
    // In firefox the reference a ctx has to its canvas is weak and won't prevent
    // garbage collection!
    public static var canvas :Canvas = function () {
        var canvas :Canvas = cast js.Lib.document.createElement("canvas");
        canvas.width = 0;
        canvas.height = 0;
        return canvas;
    }();

    // This context could be in any messy state, you don't have to clean up with save/restore
    public static var ctx :Context2d = canvas.getContext("2d");
}
