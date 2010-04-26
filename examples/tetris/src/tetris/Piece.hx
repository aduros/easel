package tetris;

typedef Point = Array<Int>;

class Piece
{
    public var color :Int;
    public var coords :Array<Point>;
    public var x :Int;
    public var y :Int;

    private function new (color :Int, coords :Array<Point>)
    {
        this.color = color;
        this.coords = coords;
    }

    public static function createRandom () :Piece
    {
        var preset = presets[Math.floor(Math.random()*presets.length)];
        return new Piece(preset.color, preset.coords);
    }

    public function rotate () :Piece
    {
        if (coords == presets[0].coords) {
            // Don't rotate the 2x2 square
            return null;
        } else {
            var next = [];
            for (coord in coords) {
                next.push([ -coord[1], coord[0] ]);
            }
            var rotated = new Piece(color, next);
            rotated.x = x;
            rotated.y = y;
            return rotated;
        }
    }

    private static var presets = [
        new Piece(1, [
            [ -1, -1 ],
            [ -1, 0 ],
            [ 0, 0 ],
            [ 0, -1 ],
        ]),
        new Piece(6, [
            [ -2, 0 ],
            [ -1, 0 ],
            [ 0, 0 ],
            [ 1, 0 ]
        ]),
        new Piece(2, [
            [ 0, -1 ],
            [ 1, -1 ],
            [ 0, 0 ],
            [ -1, 0 ]
        ]),
        new Piece(0, [
            [ 0, -1 ],
            [ -1, -1 ],
            [ 0, 0 ],
            [ 1, 0 ]
        ]),
        new Piece(4, [
            [ -1, -1 ],
            [ -1, 0 ],
            [ 0, 0 ],
            [ 1, 0 ]
        ]),
        new Piece(3, [
            [ 1, -1 ],
            [ -1, 0 ],
            [ 0, 0 ],
            [ 1, 0 ]
        ]),
        new Piece(5, [
            [ 0, -1 ],
            [ -1, 0 ],
            [ 0, 0 ],
            [ 1, 0 ]
        ]),
    ];
}
