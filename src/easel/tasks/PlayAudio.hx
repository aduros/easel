package easel.tasks;

import easel.media.AudioManager;

class PlayAudio
    implements Task
{
    public function new (src :String, ?blocking :Bool = false)
    {
        _src = src;
        _blocking = blocking;
    }

    public function update (dt)
    {
        if (_audio == null) {
            _audio = AudioManager.play(_src);
        }
        if (_blocking && !_audio.ended) {
            return false;
        } else {
            _audio = null;
            return true;
        }
    }

    public var _src :String;
    public var _audio :Audio;
    public var _blocking :Bool;
}
