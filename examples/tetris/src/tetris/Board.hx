//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package tetris;

import easel.util.Signal;

enum BoardEvent
{
    PieceMoved(p :Piece, dx :Int, dy :Int);
    PieceDropped(p :Piece);
    PiecePlaced(p :Piece);
    PieceRotated(p :Piece);

    NextPiece(piece :Piece, preview :Piece);
    RowsCleared(rows :Array<Int>);
    ScoreChanged;
    LevelChanged;
    GameOver;
}

class Board extends Signal<BoardEvent>
{
    public var width (getWidth, never) :Int;
    public var height (getHeight, never) :Int;
    public var pieceX (getPieceX, never) :Int;
    public var pieceY (getPieceY, never) :Int;
    public var score (default, null) :Int;
    public var level (default, null) :Int;

    public inline function getWidth ()
    {
        return _width;
    }

    public inline function getHeight ()
    {
        return _height;
    }

    public inline function getPieceX ()
    {
        return _piece.x;
    }

    public inline function getPieceY ()
    {
        return _piece.y;
    }

    public function new (width :Int, height :Int)
    {
        super();
        _width = width;
        _height = height;
    }

    public function startGame ()
    {
        _blocks = [];
        _playing = true;
        _preview = Piece.createRandom();
        _rowsCleared = 0;
        score = 0;
        level = 1;
        emit(LevelChanged);
        emit(ScoreChanged);
        nextPiece();
    }

    public function step ()
    {
        if (_playing && !movePiece(0, 1)) {
            placePiece();
            clearFilledRows();
            nextPiece();
        }
    }

    public function rotate ()
    {
        var rotated = _piece.rotate();
        if (rotated != null && isValid(rotated)) {
            _piece = rotated;
            emit(PieceRotated(_piece));
        }
    }

    private function clearFilledRows ()
    {
        var filledRows = new Array<Int>();
        for (coord in _piece.coords) {
            var row = _piece.y + coord[1];
            if (!Lambda.has(filledRows, row)) {
                var filled :Bool = true;
                for (col in 0..._width) {
                    if (!_blocks[row*_width+col]) {
                        filled = false;
                        break;
                    }
                }
                if (filled) {
                    filledRows.push(row);
                }
            }
        }
        if (filledRows.length > 0) {
            filledRows.sort(Reflect.compare);
            for (row in filledRows) {
                var y = row;
                while (y > 0) {
                    for (x in 0..._width) {
                        _blocks[y*_width+x] = _blocks[(y-1)*_width+x];
                    }
                    y -= 1;
                }
            }
            filledRows.reverse();

            var count = filledRows.length;
            score += level * [40,100,300,1200][count-1];

            _rowsCleared += count;
            var nextLevel = 1+Math.floor(_rowsCleared/4);
            if (nextLevel != level) {
                level = nextLevel;
                emit(LevelChanged);
            }

            emit(RowsCleared(filledRows));
            emit(ScoreChanged);
        }
    }

    public function drop ()
    {
        while (isValid(_piece)) {
            _piece.y += 1;
        }
        _piece.y -= 1;
        emit(PieceDropped(_piece));
        step();
    }

    public function movePiece (dx :Int, dy :Int) :Bool
    {
        var nx = _piece.x + dx;
        var ny = _piece.y + dy;

        for (coord in _piece.coords) {
            if (isBlocked(nx+coord[0], ny+coord[1])) {
                return false;
            }
        }

        _piece.x = nx;
        _piece.y = ny;

        emit(PieceMoved(_piece, dx, dy));
        return true;
    }

    private function dropPiece ()
    {
        while (isValid(_piece)) {
            _piece.y += 1;
        }
        _piece.y -= 1;

        emit(PieceDropped(_piece));
    }

    private function isValid (p :Piece) :Bool
    {
        for (coord in p.coords) {
            if (isBlocked(p.x + coord[0], p.y + coord[1])) {
                return false;
            }
        }
        return true;
    }

    private function isBlocked (x :Int, y :Int) :Bool
    {
        return x < 0 || x >= _width || y < 0 || y >= _height || _blocks[y*_width+x];
    }

    private function placePiece ()
    {
        for (coord in _piece.coords) {
            var x = _piece.x+coord[0];
            var y = _piece.y+coord[1];
            _blocks[y*_width+x] = true;
        }

        emit(PiecePlaced(_piece));
    }

    private function nextPiece ()
    {
        _piece = _preview;
        _piece.x = Math.floor(_width/2);
        _piece.y = 2;

        _preview = Piece.createRandom();

        if (!isValid(_piece)) {
            endGame();
        } else {
            emit(NextPiece(_piece, _preview));
        }
    }

    public function endGame ()
    {
        _playing = false;
        emit(GameOver);
    }

    private var _piece :Piece;
    private var _preview :Piece;
    private var _blocks :Array<Bool>;
    private var _playing :Bool;
    private var _width :Int;
    private var _height :Int;
    private var _rowsCleared :Int;
}
