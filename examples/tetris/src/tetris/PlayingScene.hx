//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package tetris;

import js.Lib;
import js.Dom;

import easel.display.ImageSprite;
import easel.display.FilledSprite;
import easel.display.TextSprite;
import easel.display.CircleSprite;
import easel.display.Context2d;
import easel.Scene;
import easel.Div;
import easel.media.AudioManager;
import easel.tasks.ScaleTo;
import easel.tasks.StyleTo;

//import easel.contrib.Kongregate;

import tetris.Board;

class PlayingScene extends Scene
{
    public function new ()
    {
        super();
        onUpdate.add(doUpdate); // TODO: Optimize
    }

    override public function load ()
    {
        var overlay = js.Lib.document.getElementById("overlay");

//        var button = new Div("pause button");
//        var self = this;
//        button.onClick.add(function (_) {
//            self.director.pushScene(new PauseScene());
//        });
//        add(button);

        _score = new Div("score");
        add(_score);
//        button.addTask(new easel.tasks.Repeat(new easel.tasks.Sequence([
//            new easel.tasks.Function(function () trace ("PING")),
//            StyleTo.linear(button, "width", 50, 400, "px", 1),
//            StyleTo.linear(button, "opacity", 0.5, 1, "", 0.5),
//            StyleTo.linear(button, "width", 400, 50, "px", 1),
//            StyleTo.linear(button, "opacity", 1, 0.2, "", 0.5),
//            new easel.tasks.Function(button.destroy),
//        ])));

        onKeyDown.add(keydown);
        onClick.add(click);

        //_root.mask = new FilledSprite(null, 80, 80);

        //var bg = new ImageSprite(Main.assets.get("chrome.png"));
        //bg.scaleX = 0.9;
        //add(bg);
        add(new ImageSprite(Main.assets.get("chrome.png")));

        _board = new Board(10, 20);
        _boardSprite = new BoardSprite(_board);
        _boardSprite.centerX = -BoardSprite.BLOCK_SIZE/2;
        _boardSprite.centerY = -BoardSprite.BLOCK_SIZE/2;
        _boardSprite.x = 13;
        _boardSprite.y = 9;
//        _boardSprite.composite = "copy";
        add(_boardSprite);

//        _score = new TextSprite("0");
//        _score.font = "bold 32px monospace";
//        //_score.align = "right"; // FIXME: Backbuffered right align text doesn't work
//        _score.fillStyle = "#00ff00";
//        _score.x = 220;
//        _score.y = 186;
//        _score.rotation = -Math.PI/16;
//        _score.baseline = "top"; // FIXME: Ditto, make a backbuffer x,y
//        //untyped _score.updateTransform();
//        _score.cacheAsBitmap = true;
//        add(_score);

        _level = new TextSprite("0");
        _level.font = "bold 48px cursive";
        _level.fillStyle = "#00c000";
        //_level.strokeStyle = "white";
        _level.baseline = "middle";
        _level.align = "center";
        _level.x = 267;
        _level.y = 365;
        //_level.baseline = "center";
        //_level.shadow = true;
//        _level.shadowColor = "green";
//        _level.shadowOffsetX = 4;
//        _level.shadowOffsetY = 4;
//        _level.shadowBlur = 5;
        _level.rotation = Math.PI/32;
        // GChrome doesn't draw the outline when going to backbuffer
        // Weird text metrics?
        //_level.cacheAsBitmap = true;
        add(_level);

        _board.add(handler);
        _board.startGame();
    }

    private function handler (event :BoardEvent)
    {
        switch (event) {
            case GameOver:
                AudioManager.play("static/gameover");
                var score = _board.score;
                trace("Finished with score: " + score);
//                Kongregate.get(function (api) {
//                    api.stats.submit("score", score);
//                    trace("Submitted score to Kong");
//                });
                director.replaceScene(new GameOverScene());

            case PieceRotated(_):
                AudioManager.play("static/rotate");

            case PiecePlaced(_):
                AudioManager.play("static/place");

            case NextPiece(_, preview):
                if (_preview != null) {
                    _preview.destroy();
                }
                _preview = new PieceSprite(preview);
                _preview.x = 275;
                _preview.y = 80;
//                _preview.shadow = true;
//                _preview.shadowBlur = 4;
//                _preview.shadowColor = "grey";
//                _preview.shadowOffsetX = 4;
//                _preview.shadowOffsetY = 4;
//                _preview.cacheAsBitmap = true;
                add(_preview);

                var circle = new CircleSprite(1);
                //circle.fillStyle = "black";
                //circle.composite = "lighter";
                //_preview.mask = circle;
                var p = _preview;

                // TODO
                p.mask = null;
//                addTask(new Sequence([
//                ]));
//                JSTweener.addTween(circle, {radius: 100, time: 0.5, transition: "linear",
//                    //onUpdate: function () circle.dirtyTransform(),
//                    onComplete: function () p.mask = null
//                });

            case ScoreChanged:
                trace("score " + _board.score);
                _score.setContent(""+_board.score);
//                _score.text = ""+_board.score;

            case LevelChanged:
                AudioManager.play("static/levelup");
                _stepDelay = 1000/_board.level;

                var sprite = _level;
                sprite.text = "L"+_board.level;
                //untyped sprite.redrawBackBuffer();

//                sprite.centerX = sprite.boundingBox[2]/2-5;
//                sprite.centerY = 20;

                sprite.scaleX = 10;
                addTask(ScaleTo.linear(sprite, 1, 1, 1));

            default:
        }
    }

    public function doUpdate (elapsed :Float)
    {
        _lastTick += elapsed;
        while (_lastTick > _stepDelay) {
            _lastTick -= _stepDelay;
            _board.step();
        }
//            _root.mask.x = untyped _boardSprite._activePiece.x-40;
//            _root.mask.y = untyped _boardSprite._activePiece.y-40;
    }

    private function keydown (event :Event)
    {
        switch (event.keyCode) {
            case 37: _board.movePiece(-1, 0);
            case 39: _board.movePiece(1, 0);
            case 38: _board.rotate();
            case 40: _board.drop();
            default: return;
        }
        untyped event.preventDefault();
    }

    private function click (event :Event)
    {
        //stage.pushScene(new TestScene());
        var x = (event.clientX-_boardSprite.x) / BoardSprite.BLOCK_SIZE;
        var y = (event.clientY-_boardSprite.y) / BoardSprite.BLOCK_SIZE;

        if (y < _board.pieceY) {
            _board.rotate();
        } else if (y > _board.height - 2) {
            _board.drop();
        } else if (x < _board.pieceX) {
            _board.movePiece(-1, 0);
        } else if (x > _board.pieceX+1) {
            _board.movePiece(1, 0);
        }
    }

    private var _board :Board;
    private var _boardSprite :BoardSprite;

    private var _preview :PieceSprite;
//    private var _score :TextSprite;
    private var _level :TextSprite;

    private var _score :Div;

    private var _stepDelay :Float;
    private var _lastTick :Float;
}
