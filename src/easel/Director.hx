package easel;

import js.Dom;

import easel.display.Canvas;
import easel.display.Context2d;
import easel.transitions.Transition;
import easel.util.Signal;

class Director
{
    public var ctx (default, null) :Context2d;
    public var width (getWidth, never) :Int;
    public var height (getHeight, never) :Int;

#if debug
    // For profiling
    public var disableRendering :Bool;
    public var disableUpdates :Bool;
    public var onFps :Signal<Float>;
#end

    public function new (canvas :Canvas)
    {
        ctx = canvas.getContext("2d");
#if debug
        disableRendering = false;
        disableUpdates = false;
        onFps = new Signal();

        var fpsCtrl = js.Lib.document.getElementById("easel:fps");
        if (fpsCtrl != null) {
            onFps.add(function (fps) {
                fpsCtrl.innerHTML = ""+fps;
            });
        }
#end
        _scenes = [];
    }

    private function onClick (event)
    {
        _current.onClick.emit(event);
    }

    private function onMouseMove (event)
    {
        _current.onMouseMove.emit(event);
    }

    private function onKeyDown (event)
    {
        _current.onKeyDown.emit(event);
    }

    public function replaceScene (next :Scene, ?transition :Transition)
    {
        var prev = _scenes.pop();

        _scenes.push(next);
        _current = next;

        if (prev != null) {
            prev.onHide.emit(null);

            if (transition != null) {
                transition.fromScene = prev;
                transition.toScene = next;
                _current = transition;
                next.director = this;
                next.load();
            }
        }

        _current.director = this;
        _current.load();

        if (prev != null) {
            prev.unload();
        }
        _current.onShow.emit(null);
    }

    public function pushScene (next :Scene, ?transition :Transition)
    {
        var prev = _current;
        _current.onHide.emit(null);

        _scenes.push(next);
        if (transition != null) {
            transition.fromScene = prev;
            transition.toScene = next;
            _current = transition;
            next.director = this;
            next.load();
        } else {
            _current = next;
        }

        _current.director = this;
        _current.load();
        _current.onShow.emit(null);
    }

    public function popScene (?transition :Transition)
    {
        // Never pop the last scene
        if (_scenes.length > 1) {
            var prev = _scenes.pop();
            var next = _scenes[_scenes.length-1];

            prev.onHide.emit(null);

            if (transition != null) {
                _current = transition;
                transition.fromScene = prev;
                transition.toScene = next;
                transition.director = this;
                transition.load();
            } else {
                _current = next;
            }

            prev.unload();

            _current.onShow.emit(null);
        }
    }

    public inline function getWidth () :Int
    {
        return ctx.canvas.width;
    }

    public inline function getHeight () :Int
    {
        return ctx.canvas.height;
    }

    public function init (firstScene :Scene)
    {
        var self = this;

        (untyped js.Lib.document.addEventListener)("keydown", onKeyDown, false);
        (untyped ctx.canvas.addEventListener)("click", onClick, false);
        (untyped ctx.canvas.addEventListener)("mousemove", onMouseMove, false);

        replaceScene(firstScene);

#if debug
        var disableRenderingCtrl :Checkbox =
            cast js.Lib.document.getElementById("easel:disableRendering");
        if (disableRenderingCtrl != null) {
            (disableRenderingCtrl.onchange = function (event) {
                self.disableRendering = disableRenderingCtrl.checked;
            })(null);
        }

        var disableUpdatesCtrl :Checkbox =
            cast js.Lib.document.getElementById("easel:disableUpdates");
        if (disableUpdatesCtrl != null) {
            (disableUpdatesCtrl.onchange = function (event) {
                self.disableUpdates = disableUpdatesCtrl.checked;
            })(null);
        }

        var taskCount = js.Lib.document.getElementById("easel:tasks");

        var dummyContext :Context2d = null;
        dummyContext = cast {
            canvas: {
                width: ctx.canvas.width,
                height: ctx.canvas.height,
                getContext: function (type) return dummyContext
            },
            save: function () {},
            restore: function () {},

            // transformations (default transform is the identity matrix)
            scale: function( x : Float, y : Float ) {},
            rotate: function( r : Float ) {},
            translate: function( x : Float, y : Float ) {},
            transform: function( m11 : Float, m12 : Float, m21 : Float, m22 : Float, dx : Float, dy : Float ) {},
            setTransform: function( m11 : Float, m12 : Float, m21 : Float, m22 : Float, dx : Float, dy : Float ) {},

            globalAlpha: 1,
            globalCompositeOperation: "todo",
            strokeStyle: null,
            fillStyle: null,

            // colors and styles
            /*CanvasGradient createLinearGradient(in float x0, in float y0, in float x1, in float y1);
            CanvasGradient createRadialGradient(in float x0, in float y0, in float r0, in float x1, in float y1, in float r1);
            CanvasPattern createPattern(in HTMLImageElement image, in DOMString repetition);
            CanvasPattern createPattern(in HTMLCanvasElement image, in DOMString repetition);*/

            // line caps/joins
            lineWidth: 0,
            lineCap: null,
            lineJoin: null,
            miterLimit: null,

            // shadows
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: null,

            // fonts
            font: null,
            textAlign: null,
            textBaseline: null,
            fillText: function (text :String, x :Float, y :Float) {},
            strokeText: function (text :String, x :Float, y :Float) {},
            measureText: function (text :String) {return {width:100}},

            // rects
            clearRect: function( x : Float, y : Float, w : Float, h : Float ) {},
            fillRect: function( x : Float, y : Float, w : Float, h : Float ) {},
            strokeRect: function( x : Float, y : Float, w : Float, h : Float ) {},

            // path API
            beginPath: function() {},
            closePath: function() {},
            moveTo: function( x : Float, y : Float ) {},
            lineTo: function( x : Float, y : Float ) {},
            quadraticCurveTo: function( cpx : Float, cpy : Float, x : Float, y : Float ) {},
            bezierCurveTo: function( cp1x : Float, cp1y : Float, cp2x : Float, cp2y : Float, x : Float, y : Float ) {},
            arcTo: function( x1 : Float, y1 : Float, x2 : Float, y2 : Float, radius : Float ) {},
            rect: function( x : Float, y : Float, w : Float, h : Float ) {},
            arc: function( x : Float, y : Float, radius : Float, startAngle : Float, endAngle : Float, anticlockwise : Bool ) {},
            fill: function() {},
            stroke: function() {},
            clip: function() {},
            isPointInPath: function( x : Float, y : Float ) {},

            drawImage: function (image :Dynamic, dx :Float, dy :Float, ?a1 :Float, ?a2 :Float, ?a3 :Float, ?a4 :Float, ?a5 :Float, ?a6 :Float) {},

            // drawing images
    /*	void drawImage(in HTMLImageElement image, in float dx, in float dy);
            void drawImage(in HTMLImageElement image, in float dx, in float dy, in float dw, in float dh);
            void drawImage(in HTMLImageElement image, in float sx, in float sy, in float sw, in float sh, in float dx, in float dy, in float dw, in float dh);
            void drawImage(in HTMLCanvasElement image, in float dx, in float dy);
            void drawImage(in HTMLCanvasElement image, in float dx, in float dy, in float dw, in float dh);
            void drawImage(in HTMLCanvasElement image, in float sx, in float sy, in float sw, in float sh, in float dx, in float dy, in float dw, in float dh);*/

            getImageData: function (sx :Int, sy :Int, sw :Int, sh :Int) {},
            putImageData: function (imagedata :ImageData, dx :Float, dy :Float, ?dirtyX :Float, ?dirtyY :Float, ?dirtyWidth :Float, ?dirtyHeight :Float) {},
        };

        var fpsTime :Float = 0;
        var fpsFrames :Int = 0;
#end
        var lastTime :Float = 0;

        var tick = function () {
            var now = untyped __js__("new Date()").getTime();
            var elapsed = now - lastTime;

#if debug
            if (!self.disableUpdates) {
#end
                self._current.update(elapsed);
#if debug
            }
            if (self.disableRendering) {
                self._current.render(dummyContext);
            } else {
#end
                self._current.render(self.ctx);
#if debug
            }
#end

            lastTime = now;

#if debug
            fpsFrames += 1;
            fpsTime += elapsed;
            if (fpsTime > 1000) {
                var fps = Math.round(100*1000*fpsFrames/fpsTime)/100;
                self.onFps.emit(fps);

                fpsTime = 0;
                fpsFrames = 0;
            }
            if (taskCount != null) {
                taskCount.innerHTML = (cast self._current)._tasks.length;
            }
#end
            untyped window.setTimeout(tick, 1000/30);
        };

        lastTime = Date.now().getTime();
        tick();
    }

    private var _current :Scene;
    private var _scenes :Array<Scene>;
}
