//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package tetris;

import easel.display.Group;
import easel.display.ImageSprite;

class PieceSprite extends Group
{
    public function new (piece :Piece)
    {
        super();
        x = piece.x * BoardSprite.BLOCK_SIZE;
        y = piece.y * BoardSprite.BLOCK_SIZE;
        centerX = 0.5 * BoardSprite.BLOCK_SIZE;
        centerY = 0.5 * BoardSprite.BLOCK_SIZE;

        var image = Main.assets.get("blocks.png");
        for (coord in piece.coords) {
            var block = new ImageSprite(image, 7);
            block.x = coord[0] * BoardSprite.BLOCK_SIZE;
            block.y = coord[1] * BoardSprite.BLOCK_SIZE;
            block.frame = piece.color;
            add(block);
        }
    }
}
