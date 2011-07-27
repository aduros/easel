//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package tetris;

import easel.display.Group;
import easel.display.ImageSprite;
import easel.display.Sprite;
import easel.display.FilledSprite;
import easel.display.TextSprite;

import easel.tasks.MoveTo;
import easel.tasks.ScaleTo;
import easel.tasks.RotateTo;
import easel.tasks.AlphaTo;
import easel.tasks.Function;
import easel.tasks.Sequence;
import easel.tasks.Parallel;
import easel.media.AudioManager;

import tetris.Board;

class BoardSprite extends Group
{
    public static inline var BLOCK_SIZE = 20;

    public function new (board :Board)
    {
        super();
        _board = board;
        _blocks = [];
        board.add(handle);
    }

    private function handle (event :BoardEvent)
    {
        switch (event) {
            case PieceMoved(p, dx, dy):
                _activePiece.x = BLOCK_SIZE * p.x;
                _activePiece.y = BLOCK_SIZE * p.y;
//                JSTweener.addTween(_activePiece, {time: 0.05, x: BLOCK_SIZE * p.x, y: BLOCK_SIZE * p.y, onUpdate: _activePiece.dirtyTransform});

            case PieceDropped(p):
                _activePiece.x = BLOCK_SIZE * p.x;
                _activePiece.y = BLOCK_SIZE * p.y;
                //_activePiece.packBounds();
//                _activePiece.centerY = _activePiece.boundingBox[1];
//                trace(_activePiece.centerY);
//                _activePiece.scaleY = 1000;
//                _activePiece.alpha = 0.5;

            case NextPiece(p, _):
                _activePiece = new PieceSprite(p);
//                _activePiece.shadow = true;
//                _activePiece.shadowColor = "red";
//                _activePiece.shadowBlur = 5;
                add(_activePiece);
//                _activePiece = new Group();
//                _activePiece.x = BLOCK_SIZE * p.x;
//                _activePiece.y = BLOCK_SIZE * p.y;
//                var image = Main.assets.get("blocks.png");
//                for (coord in p.coords) {
//                    var block = new ImageSprite(image, 7);
//                    block.x = coord[0] * BLOCK_SIZE;
//                    block.y = coord[1] * BLOCK_SIZE;
//                    block.centerX = 0.5 * BLOCK_SIZE;
//                    block.centerY = 0.5 * BLOCK_SIZE;
//                    block.frame = p.color;
//                    _activePiece.add(block);
//                }
                // FIXME
                //_activePiece.cacheAsBitmap = true;

            case RowsCleared(rows):
                var toRemove = [];
                var explosions = new Group();
                rows.push(0);
                var falling = [];
                for (r in 0...rows.length-1) {
                    var row = rows[r];
                    var boom = new FilledSprite("#ffffff", _board.width*BLOCK_SIZE, BLOCK_SIZE);
                    boom.y = row * BLOCK_SIZE - BLOCK_SIZE/2;
                    boom.x = -BLOCK_SIZE/2;
                    //boom.centerX = BLOCK_SIZE;
                    //boom.centerY = BLOCK_SIZE;
                    explosions.add(boom);

                    for (col in 0..._board.width) {
                        var block = _blocks[row*_board.width + col];
                        if (block != null) {
                            toRemove.push(block);
                        }
                    }

                    var ii = row-1;
                    while (ii > rows[r+1]) {
                        for (jj in 0..._board.width) {
                            _blocks[_board.width*(ii+r+1)+jj] = _blocks[_board.width*ii+jj];
                            var block = _blocks[_board.width*ii+jj];
                            if (block != null) {
                                falling.push(MoveTo.quadIn(block, block.x, (ii+r+1)*BLOCK_SIZE, (r+1)*0.25));
                            }
                        }
                        ii -= 1;
                    }
                }
                explosions.alpha = 0;
                add(explosions);

                var label = new TextSprite();
                label.text = ONOMATOPOEIA[Math.floor(Math.random()*ONOMATOPOEIA.length)];
                label.baseline = "top";
                label.align = "center";
                label.font = "bold 16px sans-serif";
                label.fillStyle = "red";
                //label.strokeStyle = "orange";
                label.x = _activePiece.x;
                label.y = _activePiece.y;
                //label.cacheAsBitmap = true;
                add(label);

                addTask(new Sequence([
                    new Parallel([
                        ScaleTo.linear(label, 1.5, 1.5, 1),
                        RotateTo.linear(label, (Math.random()-0.5)*(Math.PI/4), 1),
                        MoveTo.linear(label, label.x, label.y-20, 1),
                    ]),
                    new Function(label.destroy)
                ]));

                addTask(new Sequence([
                    AlphaTo.linear(explosions, 0.8, 0.5),
                    new Function(function () {
                        for (block in toRemove) {
                            block.destroy();
                        }
                        explosions.destroy();
                    }),
                    new Parallel(falling),
                ]));

                AudioManager.play("static/clear");

            case PieceRotated(p):
                _activePiece.destroy();
                handle(NextPiece(p, null));

                _activePiece.rotation -= Math.PI/2;

                _activePiece.addTask(RotateTo.linear(_activePiece, _activePiece.rotation + Math.PI/2, 0.1));

            case PiecePlaced(p):
                var image = Main.assets.get("blocks.png");
                for (coord in p.coords) {
                    var block = new ImageSprite(image, 7);
                    var bx = p.x + coord[0];
                    var by = p.y + coord[1];

                    _blocks[by*_board.width + bx] = block;

                    block.x = bx * BLOCK_SIZE;
                    block.y = by * BLOCK_SIZE;
                    block.centerX = 0.5 * BLOCK_SIZE;
                    block.centerY = 0.5 * BLOCK_SIZE;
                    block.frame = p.color;
                    add(block);
                }

                var sprite = _activePiece;
                sprite.composite = "xor";
                sprite.alpha = 0.8;
                //sprite.visible = false;
                //sprite.detach();
                addTask(new Sequence([
                    AlphaTo.linear(sprite, 0.1, 0.6),
                    new Function(sprite.destroy),
                ]));
                //_activePiece = null;
                add(sprite); // Bring to top

            default:
        }
    }

    private static var ONOMATOPOEIA = [ "BAM", "BANG", "BLOOP", "BLURP", "BOFF", "BONK", "CLANK", "CLUNK", "GLURP", "KAPOW", "PAM", "PLOP", "POW", "SPLAT", "THUNK", "WHAP", "WHACK", "WHAM", "ZAM", "ZAP", "ZLONK" ];

    private var _activePiece :Group;
    private var _blocks :Array<Sprite>;
    private var _board :Board;
}
