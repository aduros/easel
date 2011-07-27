//
// Easel - HTML5 canvas game engine
// https://github.com/aduros/easel/blob/master/LICENSE.txt

package easel.media;

typedef Audio = Dynamic;

class AudioManager
{
    public static function load (src :String) :Audio
    {
        var audio :Dynamic = untyped __js__("new Audio")(src);
        if (!audio.canPlayType) {
            return; // Audio not supported
        }
        if (audio.canPlayType("audio/mpeg")) {
            src += ".mp3";
        } else if (audio.canPlayType("audio/ogg")) {
            src += ".ogg";
        } else if (audio.canPlayType("audio/wav")) {
            src += ".wav";
        } else {
            return; // No formats available
        }
        audio.setAttribute("src", src);
//        audio.setAttribute("preload", "auto");
        audio.load();
        return audio;
    }

    public static function play (src :String) :Audio
    {
        var audio = load(src);
        if (audio != null) {
            audio.play();
        }
        return audio;
    }
}
