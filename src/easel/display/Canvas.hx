package easel.display;

import js.Dom;

typedef Canvas = {> HtmlDom,
    var width :Int;
    var height :Int;

    function getContext (type :String) :Context2d;
}
