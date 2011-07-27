//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel;

import easel.util.Signal;

import js.Dom;
import js.Lib;

class Div extends Entity
{
    public var onClick :Signal<Event>;

    public function new (className :String)
    {
        _element = Lib.document.createElement("div");
        _element.className = className;

        onClick = new Signal();
        (untyped _element.addEventListener)("click", onClick.emit, false);
    }

    override public function activate (scene :Scene)
    {
        super.activate(scene);
        scene.director.ctx.canvas.parentNode.appendChild(_element);

        var style = _element.style;
        if (!scene.isShowing()) {
            style.display = "none";
        }
        registerListener(scene.onHide, function (_) {
            style.display = "none";
        });
        registerListener(scene.onShow, function (_) {
            style.display = "";
        });
    }

    override public function destroy ()
    {
        super.destroy();
        _element.parentNode.removeChild(_element);
    }

    public function setContent (html :String)
    {
        _element.innerHTML = html;
    }

    private var _element :HtmlDom;
}
