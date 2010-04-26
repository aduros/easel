package easel.util;

class Storage
{
    public static function set (key :String, value :Dynamic)
    {
        var s = new haxe.Serializer();
        s.useCache = true;
        s.useEnumIndex = false;
        s.serialize(value);
        (untyped localStorage).setItem(key, s);
    }

    public static function get (key :String) :Dynamic
    {
        var string = (untyped localStorage).getItem(key);
        return (string != null) ? haxe.Unserializer.run(string) : null;
    }
}
