package easel.transitions;

import easel.Scene;

class Transition extends Scene
{
    public var toScene :Scene;
    public var fromScene :Scene;

//    public function setupTransition (from :Scene, to :Scene)
//    {
//        _fromScene = from;
//        _toScene = to;
//        to.load();
//
//        _fromCanvas = cast js.Lib.document.createElement("canvas");
//        from.render(_fromCanvas.getContext("2d"));
//    }

    private function complete ()
    {
        toScene.director = director;
        (cast director)._current = toScene;
        toScene.onShow.emit(null);
//        director.pushScene(to);
    }
}
