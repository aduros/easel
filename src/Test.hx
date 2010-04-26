import easel.Director;
import easel.Scene;
import easel.display.FilledSprite;
import easel.display.TextSprite;
import easel.display.ImageSprite;
import easel.tasks.RotateTo;
import easel.tasks.MoveTo;
import easel.tasks.Parallel;
import easel.tasks.ScaleTo;
import easel.tasks.Sequence;
import easel.tasks.Repeat;
import easel.tasks.Function;
import easel.tasks.Delay;
import easel.tasks.WaitOn;
import easel.util.AssetPack;

import js.Lib;

class Test extends Scene
{
    public var mouseX :Float;
    public var mouseY :Float;
    private var _assets :AssetPack;
    private var _elapsed :Float;

    private function createParticle (x :Float, y :Float)
    {
        var particle = new ImageSprite(_assets.get("tentacle.png")); 
        particle.centerX = particle.width/2;
        particle.centerY = particle.height/2;
        particle.x = x;
        particle.y = y;
        particle.rotation = Math.random()*Math.PI*2;

        addTask(new Sequence([
            new Parallel([
                MoveTo.linear(particle, particle.x, 400, 3),
                RotateTo.linear(particle, particle.rotation+2*Math.PI, 3),
            ]),
            new Function(particle.destroy),
        ]));
        add(particle);
    }

    public function particleUpdate (dt)
    {
        _elapsed += dt;
        while (_elapsed > 200) {
            _elapsed -= 200;
            createParticle(mouseX, mouseY);
        }
    }

    override public function load ()
    {
        _elapsed = 0;

        add(new FilledSprite("#000000"));

        var self = this;
        director.ctx.canvas.onmousemove = function (event) {
            self.mouseX = event.clientX;
            self.mouseY = event.clientY;
        };

        _assets = new AssetPack("static/");
        _assets.load([ "tentacle.png" ]);
        _assets.onComplete.add(function (_) {
            trace("Assets loaded");
            self.onUpdate.add(self.particleUpdate);
            self.add(new CustomPanel(self._assets.get("tentacle.png")));
        });
        trace("Loading");
    }

    public static function main ()
    {
        var canvas :easel.display.Canvas = cast Lib.document.getElementById("screen");
        var director = new Director(canvas);

        director.init(new Test());
    }

    private var _obj :FilledSprite;
}
