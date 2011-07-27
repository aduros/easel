//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package tetris;

import js.Lib;
import js.Dom;

import easel.Director;
import easel.Scene;
import easel.display.Canvas;
import easel.display.Sprite;
import easel.display.Group;
import easel.display.TextSprite;
import easel.util.AssetPack;
//import easel.contrib.Kongregate;
//import easel.util.Storage;

class Main
{
    public static var assets :AssetPack;

    public static function main ()
    {
        var canvas :Canvas = cast Lib.document.getElementById("screen");
        var director = new Director(canvas);

#if debug
        if (haxe.Firebug.detect()) {
            haxe.Firebug.redirectTraces();
        }
#end
        assets = new AssetPack("static/");
        assets.onProgress.add(function (p) {
            trace("Preload progress: " + p);
        });
        assets.onComplete.add(function (_) {
            director.init(new PlayingScene());
        });
        assets.load([ "chrome.png", "blocks.png", ]);

//        Storage.set("foo", RGB(255,0,100));
//        trace("Storage 2");
//        trace(Storage.get("foo"));

//        Kongregate.get(function (api) {
//            trace("Kongregate player: " + api.services.getUsername());
//        });
    }
}
