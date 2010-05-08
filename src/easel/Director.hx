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
//        untyped canvas.oncontextmenu = function () return false;

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

    private function onMouseDown (event)
    {
        _current.onMouseDown.emit(event);
    }

    private function onMouseUp (event)
    {
        _current.onMouseUp.emit(event);
    }

    private function onMouseOut (event)
    {
        _current.onMouseOut.emit(event);
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
        (untyped ctx.canvas.addEventListener)("mousedown", onMouseDown, false);
        (untyped ctx.canvas.addEventListener)("mouseup", onMouseUp, false);
        (untyped ctx.canvas.addEventListener)("mouseout", onMouseOut, false);

        replaceScene(firstScene);

#if debug // Profiling displays available only in debug builds
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

        // A fake context for when rendering is disabled, for profiling
        var dummyContext :Context2d = null;
        dummyContext = cast {
            canvas: {
                width: ctx.canvas.width,
                height: ctx.canvas.height,
                getContext: function () return dummyContext
            },
            save: function () {},
            restore: function () {},

            scale: function () {},
            rotate: function () {},
            translate: function () {},
            transform: function () {},
            setTransform: function () {},

            globalAlpha: 1.0,
            globalCompositeOperation: "source-over",
            strokeStyle: "#000000",
            fillStyle: "#000000",

            createLinearGradient: function () return {
                addColorStop: function () {}
            },
            createRadialGradient: function () return {
                addColorStop: function () {}
            },
            createPattern: function () return {},

            // line caps/joins
            lineWidth: 1.0,
            lineCap: "butt",
            lineJoin: "miter",
            miterLimit: 10.0,

            // shadows
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 0,
            shadowColor: null,

            // fonts
            font: null,
            textAlign: null,
            textBaseline: null,
            fillText: function () {},
            strokeText: function () {},
            measureText: function () return {width: 100},

            // rects
            clearRect: function () {},
            fillRect: function () {},
            strokeRect: function () {},

            // path API
            beginPath: function() {},
            closePath: function() {},
            moveTo: function () {},
            lineTo: function () {},
            quadraticCurveTo: function () {},
            bezierCurveTo: function () {},
            arcTo: function () {},
            rect: function () {},
            arc: function () {},
            fill: function() {},
            stroke: function() {},
            clip: function() {},
            isPointInPath: function () {},

            // drawing images
            drawImage: function () {},

            getImageData: function () {}, // TODO
            putImageData: function () {},
        };

        var fpsTime :Float = 0;
        var fpsFrames :Int = 0;
#end
        var timeLastBegin :Float = untyped __js__("new Date()").getTime();

        var tick = function () {
            // Time at the beginning of this frame
            var timeBegin :Float = untyped __js__("new Date()").getTime();

            // Time elapsed since the beginning of the last frame
            var elapsed :Float = timeBegin - timeLastBegin;

#if debug
            if (!self.disableUpdates) {
#end
                // Update
                self._current.update(elapsed);
#if debug
            }
            if (self.disableRendering) {
                self._current.render(dummyContext);
            } else {
#end
                // Render
                self._current.render(self.ctx);
#if debug
            }

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
            var timeEnd = untyped __js__("new Date()").getTime();
            untyped window.setTimeout(tick, 1000/30 - timeEnd + timeBegin);

            timeLastBegin = timeBegin;
        };

        tick();
    }

    private var _current :Scene;
    private var _scenes :Array<Scene>;
}
