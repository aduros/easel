//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package tetris;

import easel.display.ImageSprite;

class BlockSprite extends ImageSprite
{
    public static inline var SIZE = 20;

    public function new (color :Int)
    {
        super(Main.assets.get("blocks.png"), 7);
        frame = color;
    }
}
