package easel.contrib;

import easel.util.Promise;

typedef KongregateAPI = Dynamic; // TODO: Proper typedef

class Kongregate
{
    public static function init ()
    {
        if (_api == null) {
            _api = new Promise();
            (untyped kongregateAPI).loadAPI(function (kong) {
                _api.set((untyped kongregateAPI).getAPI());
            });
        }
    }

    public static function get (f :KongregateAPI -> Void)
    {
        if (_api == null) {
            init();
        }
        _api.get(f);
    }

    private static var _api :Promise<KongregateAPI>;
}
