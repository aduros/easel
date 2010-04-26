package easel.util;

import js.Lib;
import js.Dom;

class AssetPack
{
    public var onProgress :Signal<Float>;
    public var onComplete :Signal<Void>;
    public var onError :Signal<Void>;

    public function new (base :String)
    {
        _base = base;
        _cache = new Hash();

        onProgress = new Signal();
        onComplete = new Signal();
        onError = new Signal();
    }

    public function load (items :Array<String>)
    {
        var self = this;
        var total = items.length;
        var complete = 0;

        for (href in items) {
            var image :Image = untyped __js__ ("new Image()");
            image.onload = function (_) {
                self._cache.set(href, image);
                complete += 1;
                self.onProgress.emit(complete/total);
                if (complete == total) {
                    self.onComplete.emit(null);

                    // Free listeners
                    self.onComplete = null;
                    self.onProgress = null;
                    self.onError = null;
                }
            }

            image.onerror = function (_) {
                trace("Error loading " + self._base + href);
                self.onError.emit(null);
            }
            image.src = _base+href;
        }
    }

    public function get (href :String) :Image
    {
        return _cache.get(href);
    }

    private var _cache :Hash<Image>;
    private var _base :String;
}
