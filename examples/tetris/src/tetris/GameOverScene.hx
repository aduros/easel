package tetris;

import js.Lib;
import js.Dom;

import easel.display.Canvas;
import easel.display.Sprite;
import easel.display.ImageSprite;
import easel.display.FilledSprite;
import easel.display.TextSprite;
import easel.display.CircleSprite;
import easel.display.Context2d;
import easel.Scene;
import easel.media.AudioManager;
import easel.tasks.MoveTo;
import easel.tasks.ScaleTo;
import easel.tasks.RotateTo;
import easel.tasks.Delay;
import easel.tasks.Sequence;
import easel.tasks.Parallel;
import easel.tasks.Function;

import tetris.Board;

class GameOverScene extends Scene
{
    public function new ()
    {
        super();
    }

    override public function load ()
    {
        add(new FilledSprite("#ffffff"));

        var label = new TextSprite("Game Over");
        label.align = "center";
        label.baseline = "middle";
        label.font = "bold 52px cursive";
        label.fillStyle = "black";
        label.scaleX = 0.01;
        label.scaleY = 0.01;
        label.x = director.width/2;
        label.y = director.height/2;
        add(label);

        var sub = new TextSprite("Click to Replay");
        sub.align = "center";
        sub.baseline = "middle";
        sub.font = "bold 16px monospace";
        sub.fillStyle = "black";
        sub.x = director.width/2;
        sub.y = director.height/2 + 50;
        add(sub);

        var chunksX = 5;
        var chunksY = 5;
        var sw = Math.floor(director.width/chunksX);
        var sh = Math.floor(director.height/chunksY);

        var source :Canvas = cast js.Lib.document.createElement("canvas");
        source.width = director.width;
        source.height = director.height;
        source.getContext("2d").drawImage(director.ctx.canvas, 0, 0);

        for (y in 0...chunksX) {
            for (x in 0...chunksY) {
                var sx = sw*x;
                var sy = sh*y;

                var sprite = new ParticleSprite(source, sx, sy, sw, sh);
                sprite.x = sx + sw/2;
                sprite.y = sy + sh/2;
                sprite.centerX = sw/2;
                sprite.centerY = sh/2;
                //sprite.rotation = Math.PI/4;
                add(sprite);

                addTask(MoveTo.linear(sprite, sprite.x+30*(Math.random()-0.5), 416, 2));
                addTask(RotateTo.linear(sprite, Math.random()*2*Math.PI + Math.PI, 2));
            }
        }

        var self = this;
        addTask(new Sequence([
            new Delay(1.5),
            new Parallel([
                ScaleTo.linear(label, 1, 1, 1),
                RotateTo.linear(label, Math.PI/10, 1),
            ]),
        ]));
        onClick.add(function (_) {
            self.director.replaceScene(new PlayingScene());
        });
    }
}

class ParticleSprite extends Sprite
{
    public function new (source :Canvas, sx :Float, sy :Float, sw :Float, sh :Float)
    {
        super();
        _source = source;
        _sx = sx;
        _sy = sy;
        _sw = sw;
        _sh = sh;
    }

    override public function draw (ctx :Context2d)
    {
        ctx.drawImage(_source, _sx, _sy, _sw, _sh, 0, 0, _sw, _sh);
    }

    private var _source :Canvas;
    private var _sx :Float;
    private var _sy :Float;
    private var _sw :Float;
    private var _sh :Float;
}
