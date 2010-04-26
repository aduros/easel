$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof easel=='undefined') easel = {}
if(!easel.util) easel.util = {}
easel.util.AssetPack = function(base) { if( base === $_ ) return; {
	this._base = base;
	this._cache = new Hash();
	this.onProgress = new easel.util.Signal();
	this.onComplete = new easel.util.Signal();
	this.onError = new easel.util.Signal();
}}
easel.util.AssetPack.__name__ = ["easel","util","AssetPack"];
easel.util.AssetPack.prototype._base = null;
easel.util.AssetPack.prototype._cache = null;
easel.util.AssetPack.prototype.get = function(href) {
	return this._cache.get(href);
}
easel.util.AssetPack.prototype.load = function(items) {
	var self = this;
	var total = items.length;
	var complete = 0;
	{
		var _g = 0;
		while(_g < items.length) {
			var href = [items[_g]];
			++_g;
			var image = [new Image()];
			image[0].onload = function(image,href) {
				return function(_) {
					self._cache.set(href[0],image[0]);
					complete += 1;
					self.onProgress.emit(complete / total);
					if(complete == total) {
						self.onComplete.emit(null);
						self.onComplete = null;
						self.onProgress = null;
						self.onError = null;
					}
				}
			}(image,href);
			image[0].onerror = function(href) {
				return function(_) {
					haxe.Log.trace(("Error loading " + self._base) + href[0],{ fileName : "AssetPack.hx", lineNumber : 45, className : "easel.util.AssetPack", methodName : "load"});
					self.onError.emit(null);
				}
			}(href);
			image[0].src = this._base + href[0];
		}
	}
}
easel.util.AssetPack.prototype.onComplete = null;
easel.util.AssetPack.prototype.onError = null;
easel.util.AssetPack.prototype.onProgress = null;
easel.util.AssetPack.prototype.__class__ = easel.util.AssetPack;
easel.Entity = function() { }
easel.Entity.__name__ = ["easel","Entity"];
easel.Entity.prototype._signals = null;
easel.Entity.prototype._slots = null;
easel.Entity.prototype._tasks = null;
easel.Entity.prototype.activate = function(scene) {
	if(this.scene != null) {
		throw "Already active";
	}
	this.scene = scene;
	if(this._tasks != null) {
		{
			var _g = 0, _g1 = this._tasks;
			while(_g < _g1.length) {
				var task = _g1[_g];
				++_g;
				scene.addTask(task);
			}
		}
	}
}
easel.Entity.prototype.addTask = function(task) {
	if(this._tasks == null) {
		this._tasks = [];
	}
	this._tasks.push(task);
	if(this.scene != null) {
		this.scene.addTask(task);
	}
}
easel.Entity.prototype.destroy = function() {
	if(!(this.scene != null)) {
		throw "Already destroyed";
	}
	if(this._signals != null) {
		{
			var _g1 = 0, _g = this._signals.length;
			while(_g1 < _g) {
				var ii = _g1++;
				this._signals[ii]._slots.remove(this._slots[ii]);
			}
		}
		this._signals = null;
		this._slots = null;
	}
	if(this._tasks != null) {
		{
			var _g = 0, _g1 = this._tasks;
			while(_g < _g1.length) {
				var task = _g1[_g];
				++_g;
				this.scene.removeTask(task);
			}
		}
		this._tasks = null;
	}
	this.scene = null;
}
easel.Entity.prototype.isActive = function() {
	return (this.scene != null);
}
easel.Entity.prototype.registerListener = function(signal,slot) {
	if(this._signals == null) {
		this._signals = [];
		this._slots = [];
	}
	signal._slots.push(slot);
	this._signals.push(signal);
	this._slots.push(slot);
}
easel.Entity.prototype.removeAllTasks = function() {
	if(this._tasks != null) {
		if(this.scene != null) {
			{
				var _g = 0, _g1 = this._tasks;
				while(_g < _g1.length) {
					var task = _g1[_g];
					++_g;
					this.scene.removeTask(task);
				}
			}
		}
		this._tasks = null;
	}
}
easel.Entity.prototype.removeTask = function(task) {
	if(this._tasks != null) {
		this._tasks.remove(task);
		if(this.scene != null) {
			this.scene.removeTask(task);
		}
	}
}
easel.Entity.prototype.scene = null;
easel.Entity.prototype.unregister = function(signal,slot) {
	null;
}
easel.Entity.prototype.__class__ = easel.Entity;
if(!easel.display) easel.display = {}
easel.display.Sprite = function(p) { if( p === $_ ) return; {
	this.transform = new Array();
	this.visible = true;
	this.alpha = 1;
	{
		this.scaleX = 1;
		this._isTransformDirty = true;
		1;
	}
	{
		this.scaleY = 1;
		this._isTransformDirty = true;
		1;
	}
	{
		this.rotation = 0;
		this._isTransformDirty = true;
		0;
	}
	{
		this.centerX = 0;
		this._isTransformDirty = true;
		0;
	}
	{
		this.centerY = 0;
		this._isTransformDirty = true;
		0;
	}
	{
		this.x = 0;
		this._isTransformDirty = true;
		0;
	}
	{
		this.y = 0;
		this._isTransformDirty = true;
		0;
	}
	this.boundingBox = [0.0,0.0,0.0,0.0];
}}
easel.display.Sprite.__name__ = ["easel","display","Sprite"];
easel.display.Sprite.__super__ = easel.Entity;
for(var k in easel.Entity.prototype ) easel.display.Sprite.prototype[k] = easel.Entity.prototype[k];
easel.display.Sprite.prototype._backBuffer = null;
easel.display.Sprite.prototype._isContentsDirty = null;
easel.display.Sprite.prototype._isTransformDirty = null;
easel.display.Sprite.prototype.alpha = null;
easel.display.Sprite.prototype.boundingBox = null;
easel.display.Sprite.prototype.cacheAsBitmap = null;
easel.display.Sprite.prototype.centerX = null;
easel.display.Sprite.prototype.centerY = null;
easel.display.Sprite.prototype.composite = null;
easel.display.Sprite.prototype.destroy = function() {
	easel.Entity.prototype.destroy.apply(this,[]);
	if(this.parent != null) {
		this.parent.remove(this);
	}
	this.parent = null;
}
easel.display.Sprite.prototype.dirtyContents = function() {
	this._isContentsDirty = true;
}
easel.display.Sprite.prototype.dirtyTransform = function() {
	this._isTransformDirty = true;
}
easel.display.Sprite.prototype.draw = function(ctx) {
	null;
}
easel.display.Sprite.prototype.getHeight = function() {
	return this.boundingBox[3];
}
easel.display.Sprite.prototype.getWidth = function() {
	return this.boundingBox[2];
}
easel.display.Sprite.prototype.height = null;
easel.display.Sprite.prototype.isCacheAsBitmap = function() {
	return this._backBuffer != null;
}
easel.display.Sprite.prototype.mask = null;
easel.display.Sprite.prototype.packBounds = function(ctx) {
	if(this.shadowColor != null) {
		this.boundingBox[0] = Math.min((this.boundingBox[0] + this.shadowOffsetX) - 5,this.boundingBox[0]);
		this.boundingBox[1] = Math.min((this.boundingBox[1] + this.shadowOffsetY) - 5,this.boundingBox[1]);
		this.boundingBox[2] = Math.max((this.boundingBox[2] + this.shadowOffsetX) + 5,this.boundingBox[2]);
		this.boundingBox[3] = Math.max((this.boundingBox[3] + this.shadowOffsetY) + 5,this.boundingBox[3]);
	}
}
easel.display.Sprite.prototype.parent = null;
easel.display.Sprite.prototype.redrawBackBuffer = function() {
	if(this._backBuffer == null) {
		this._backBuffer = js.Lib.document.createElement("canvas");
	}
	var ctx = this._backBuffer.getContext("2d");
	this.packBounds(ctx);
	this._backBuffer.width = Math.ceil(this.boundingBox[2]);
	this._backBuffer.height = Math.ceil(this.boundingBox[3]);
	haxe.Log.trace("Drawing backbuffer " + this.boundingBox,{ fileName : "Sprite.hx", lineNumber : 241, className : "easel.display.Sprite", methodName : "redrawBackBuffer"});
	ctx.translate(-this.boundingBox[0],-this.boundingBox[1]);
	if(this.shadowColor != null) {
		ctx.shadowColor = this.shadowColor;
		ctx.shadowOffsetX = this.shadowOffsetX;
		ctx.shadowOffsetY = this.shadowOffsetY;
		ctx.shadowBlur = this.shadowBlur;
	}
	this.draw(ctx);
	haxe.Log.trace(this.transform,{ fileName : "Sprite.hx", lineNumber : 256, className : "easel.display.Sprite", methodName : "redrawBackBuffer"});
	this._isContentsDirty = false;
}
easel.display.Sprite.prototype.render = function(ctx) {
	if(this.visible && this.alpha > 0) {
		ctx.save();
		if(this._isTransformDirty) {
			this.updateTransform();
		}
		if(this._isContentsDirty && this._backBuffer != null) {
			this.redrawBackBuffer();
		}
		var t = this.transform;
		ctx.transform(t[0],t[1],t[2],t[3],t[4],t[5]);
		var cab = this._backBuffer != null;
		if(this.mask != null) {
			if(cab) {
				ctx.save();
				ctx.translate(-this.boundingBox[0],-this.boundingBox[1]);
				this.mask.render(ctx);
				ctx.restore();
			}
			else {
				this.mask.render(ctx);
			}
			ctx.clip();
		}
		if(this.alpha < 1) {
			ctx.globalAlpha *= this.alpha;
		}
		if(this.composite != null) {
			ctx.globalCompositeOperation = this.composite;
		}
		if(cab) {
			ctx.drawImage(this._backBuffer,0,0);
		}
		else {
			if(this.shadowColor != null) {
				ctx.shadowColor = this.shadowColor;
				ctx.shadowOffsetX = this.shadowOffsetX;
				ctx.shadowOffsetY = this.shadowOffsetY;
				ctx.shadowBlur = this.shadowBlur;
			}
			this.draw(ctx);
		}
		ctx.restore();
	}
}
easel.display.Sprite.prototype.rotation = null;
easel.display.Sprite.prototype.scaleX = null;
easel.display.Sprite.prototype.scaleY = null;
easel.display.Sprite.prototype.setCacheAsBitmap = function(on) {
	if(on) {
		this.redrawBackBuffer();
	}
	else {
		this._backBuffer = null;
	}
	return on;
}
easel.display.Sprite.prototype.setCenterX = function(centerX) {
	this.centerX = centerX;
	this._isTransformDirty = true;
	return centerX;
}
easel.display.Sprite.prototype.setCenterY = function(centerY) {
	this.centerY = centerY;
	this._isTransformDirty = true;
	return centerY;
}
easel.display.Sprite.prototype.setMask = function(mask) {
	this.mask = mask;
	this._isContentsDirty = true;
	return mask;
}
easel.display.Sprite.prototype.setRotation = function(rotation) {
	this.rotation = rotation;
	this._isTransformDirty = true;
	return rotation;
}
easel.display.Sprite.prototype.setScaleX = function(scaleX) {
	this.scaleX = scaleX;
	this._isTransformDirty = true;
	return scaleX;
}
easel.display.Sprite.prototype.setScaleY = function(scaleY) {
	this.scaleY = scaleY;
	this._isTransformDirty = true;
	return scaleY;
}
easel.display.Sprite.prototype.setShadowBlur = function(shadowBlur) {
	this.shadowBlur = shadowBlur;
	this._isContentsDirty = true;
	return shadowBlur;
}
easel.display.Sprite.prototype.setShadowColor = function(shadowColor) {
	this.shadowColor = shadowColor;
	this._isContentsDirty = true;
	return shadowColor;
}
easel.display.Sprite.prototype.setShadowOffsetX = function(shadowOffsetX) {
	this.shadowOffsetX = shadowOffsetX;
	this._isContentsDirty = true;
	return shadowOffsetX;
}
easel.display.Sprite.prototype.setShadowOffsetY = function(shadowOffsetY) {
	this.shadowOffsetY = shadowOffsetY;
	this._isContentsDirty = true;
	return shadowOffsetY;
}
easel.display.Sprite.prototype.setX = function(x) {
	this.x = x;
	this._isTransformDirty = true;
	return x;
}
easel.display.Sprite.prototype.setY = function(y) {
	this.y = y;
	this._isTransformDirty = true;
	return y;
}
easel.display.Sprite.prototype.shadowBlur = null;
easel.display.Sprite.prototype.shadowColor = null;
easel.display.Sprite.prototype.shadowOffsetX = null;
easel.display.Sprite.prototype.shadowOffsetY = null;
easel.display.Sprite.prototype.transform = null;
easel.display.Sprite.prototype.updateTransform = function() {
	var cos = Math.cos(this.rotation);
	var sin = Math.sin(this.rotation);
	var cx = -this.centerX;
	var cy = -this.centerY;
	if(this._backBuffer != null) {
		cx += this.boundingBox[0];
		cy += this.boundingBox[1];
	}
	this.transform[0] = this.scaleX * cos;
	this.transform[1] = this.scaleX * sin;
	this.transform[2] = this.scaleY * -sin;
	this.transform[3] = this.scaleY * cos;
	this.transform[4] = Math.floor((cx * this.transform[0] + cy * this.transform[2]) + this.x);
	this.transform[5] = Math.floor((cx * this.transform[1] + cy * this.transform[3]) + this.y);
	this._isTransformDirty = false;
}
easel.display.Sprite.prototype.visible = null;
easel.display.Sprite.prototype.width = null;
easel.display.Sprite.prototype.x = null;
easel.display.Sprite.prototype.y = null;
easel.display.Sprite.prototype.__class__ = easel.display.Sprite;
easel.display.Group = function(p) { if( p === $_ ) return; {
	easel.display.Sprite.apply(this,[]);
	this._children = [];
}}
easel.display.Group.__name__ = ["easel","display","Group"];
easel.display.Group.__super__ = easel.display.Sprite;
for(var k in easel.display.Sprite.prototype ) easel.display.Group.prototype[k] = easel.display.Sprite.prototype[k];
easel.display.Group.prototype._children = null;
easel.display.Group.prototype.activate = function(scene) {
	easel.display.Sprite.prototype.activate.apply(this,[scene]);
	{
		var _g = 0, _g1 = this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.activate(scene);
		}
	}
}
easel.display.Group.prototype.add = function(sprite) {
	if((this.scene != null) && !(sprite.scene != null)) {
		sprite.activate(this.scene);
	}
	if(sprite.parent != null) {
		sprite.parent.remove(sprite);
	}
	{
		var _g = 0, _g1 = this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == sprite) {
				return;
			}
		}
	}
	this._children.push(sprite);
	sprite.parent = this;
}
easel.display.Group.prototype.contains = function(sprite) {
	{
		var _g = 0, _g1 = this._children;
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			if(sprite == x) {
				return true;
			}
		}
	}
	return false;
}
easel.display.Group.prototype.destroy = function() {
	easel.display.Sprite.prototype.destroy.apply(this,[]);
	{
		var _g = 0, _g1 = this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.parent = null;
			child.destroy();
		}
	}
	this._children = null;
}
easel.display.Group.prototype.draw = function(ctx) {
	var _g = 0, _g1 = this._children;
	while(_g < _g1.length) {
		var child = _g1[_g];
		++_g;
		child.render(ctx);
	}
}
easel.display.Group.prototype.getNumChildren = function() {
	return this._children.length;
}
easel.display.Group.prototype.iterator = function() {
	return this._children.iterator();
}
easel.display.Group.prototype.packBounds = function(ctx) {
	var bounds = [0.0,0.0,0.0,0.0];
	{
		var _g = 0, _g1 = this._children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.packBounds();
			var bb = child.boundingBox;
			bounds[0] = Math.min(bb[0] + child.x,bounds[0]);
			bounds[1] = Math.min(bb[1] + child.y,bounds[1]);
			bounds[2] = Math.max((bb[2] + bb[0]) + child.x,bounds[2]);
			bounds[3] = Math.max((bb[3] + bb[1]) + child.y,bounds[3]);
		}
	}
	this.boundingBox = bounds;
	haxe.Log.trace("Packed: " + bounds,{ fileName : "Group.hx", lineNumber : 103, className : "easel.display.Group", methodName : "packBounds"});
	easel.display.Sprite.prototype.packBounds.apply(this,[ctx]);
}
easel.display.Group.prototype.remove = function(sprite) {
	if(this._children.remove(sprite)) {
		sprite.parent = null;
	}
}
easel.display.Group.prototype.removeAll = function() {
	{
		var _g = 0, _g1 = this._children;
		while(_g < _g1.length) {
			var sprite = _g1[_g];
			++_g;
			sprite.parent = null;
		}
	}
	this._children = [];
}
easel.display.Group.prototype.__class__ = easel.display.Group;
easel.util.Signal = function(p) { if( p === $_ ) return; {
	this._slots = new Array();
}}
easel.util.Signal.__name__ = ["easel","util","Signal"];
easel.util.Signal.prototype._slots = null;
easel.util.Signal.prototype.add = function(slot) {
	this._slots.push(slot);
}
easel.util.Signal.prototype.emit = function(signal) {
	var _g = 0, _g1 = this._slots;
	while(_g < _g1.length) {
		var slot = _g1[_g];
		++_g;
		slot(signal);
	}
}
easel.util.Signal.prototype.remove = function(slot) {
	this._slots.remove(slot);
}
easel.util.Signal.prototype.__class__ = easel.util.Signal;
if(!easel.tasks) easel.tasks = {}
easel.tasks.Task = function() { }
easel.tasks.Task.__name__ = ["easel","tasks","Task"];
easel.tasks.Task.prototype.update = null;
easel.tasks.Task.prototype.__class__ = easel.tasks.Task;
easel.tasks.Function = function(f) { if( f === $_ ) return; {
	this._f = f;
}}
easel.tasks.Function.__name__ = ["easel","tasks","Function"];
easel.tasks.Function.prototype._f = null;
easel.tasks.Function.prototype.update = function(dt) {
	this._f();
	return true;
}
easel.tasks.Function.prototype.__class__ = easel.tasks.Function;
easel.tasks.Function.__interfaces__ = [easel.tasks.Task];
if(typeof haxe=='undefined') haxe = {}
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
easel.display.ImageSprite = function(image,frames) { if( image === $_ ) return; {
	if(frames == null) frames = 1;
	easel.display.Sprite.apply(this,[]);
	this.boundingBox = [0.0,0.0,image.width / frames,image.height];
	this._image = image;
	this._frames = frames;
}}
easel.display.ImageSprite.__name__ = ["easel","display","ImageSprite"];
easel.display.ImageSprite.__super__ = easel.display.Sprite;
for(var k in easel.display.Sprite.prototype ) easel.display.ImageSprite.prototype[k] = easel.display.Sprite.prototype[k];
easel.display.ImageSprite.fromCanvas = function(source,sx,sy,sw,sh) {
	var canvas = js.Lib.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	ctx.drawImage(source,sx,sy,sw,sh,0,0,sw,sh);
	return new easel.display.ImageSprite(canvas);
}
easel.display.ImageSprite.prototype._frames = null;
easel.display.ImageSprite.prototype._image = null;
easel.display.ImageSprite.prototype.draw = function(ctx) {
	if(this._frames > 1) {
		var w = Math.floor(this.boundingBox[2]);
		var h = Math.floor(this.boundingBox[3]);
		ctx.drawImage(this._image,this.frame * w,0,w,h,0,0,w,h);
	}
	else {
		ctx.drawImage(this._image,0,0);
	}
}
easel.display.ImageSprite.prototype.frame = null;
easel.display.ImageSprite.prototype.frameHeight = null;
easel.display.ImageSprite.prototype.frameWidth = null;
easel.display.ImageSprite.prototype.getNumFrames = function() {
	return this._frames;
}
easel.display.ImageSprite.prototype.numFrames = null;
easel.display.ImageSprite.prototype.setFrame = function(frame) {
	this.frame = frame;
	return frame;
}
easel.display.ImageSprite.prototype.__class__ = easel.display.ImageSprite;
easel.tasks.Tween = function(seconds,easing) { if( seconds === $_ ) return; {
	this._duration = seconds * 1000;
	this._elapsed = 0;
	this._easing = easing;
}}
easel.tasks.Tween.__name__ = ["easel","tasks","Tween"];
easel.tasks.Tween.LINEAR = function(t,a,b,d) {
	return a + (b - a) * (t / d);
}
easel.tasks.Tween.QUAD = function(t,a,b,d) {
	t /= d;
	return ((b - a) * t) * t + a;
}
easel.tasks.Tween.prototype._duration = null;
easel.tasks.Tween.prototype._easing = null;
easel.tasks.Tween.prototype._elapsed = null;
easel.tasks.Tween.prototype.begin = function() {
	null;
}
easel.tasks.Tween.prototype.interp = function(from,to) {
	return this._easing(this._elapsed,from,to,this._duration);
}
easel.tasks.Tween.prototype.tick = function() {
	null;
}
easel.tasks.Tween.prototype.update = function(dt) {
	if(this._elapsed == 0) {
		this.begin();
	}
	this._elapsed += dt;
	if(this._elapsed > this._duration) {
		this._elapsed = this._duration;
	}
	this.tick();
	if(this._elapsed >= this._duration) {
		this._elapsed = 0;
		return true;
	}
	else {
		return false;
	}
}
easel.tasks.Tween.prototype.__class__ = easel.tasks.Tween;
easel.tasks.Tween.__interfaces__ = [easel.tasks.Task];
easel.tasks.AlphaTo = function(sprite,to,seconds,easing) { if( sprite === $_ ) return; {
	easel.tasks.Tween.apply(this,[seconds,easing]);
	this._sprite = sprite;
	this._to = to;
}}
easel.tasks.AlphaTo.__name__ = ["easel","tasks","AlphaTo"];
easel.tasks.AlphaTo.__super__ = easel.tasks.Tween;
for(var k in easel.tasks.Tween.prototype ) easel.tasks.AlphaTo.prototype[k] = easel.tasks.Tween.prototype[k];
easel.tasks.AlphaTo.linear = function(sprite,to,seconds) {
	return new easel.tasks.AlphaTo(sprite,to,seconds,easel.tasks.Tween.LINEAR);
}
easel.tasks.AlphaTo.prototype._from = null;
easel.tasks.AlphaTo.prototype._sprite = null;
easel.tasks.AlphaTo.prototype._to = null;
easel.tasks.AlphaTo.prototype.begin = function() {
	this._from = this._sprite.alpha;
}
easel.tasks.AlphaTo.prototype.tick = function() {
	this._sprite.alpha = this._easing(this._elapsed,this._from,this._to,this._duration);
}
easel.tasks.AlphaTo.prototype.__class__ = easel.tasks.AlphaTo;
easel.tasks.RotateTo = function(sprite,to,seconds,easing) { if( sprite === $_ ) return; {
	easel.tasks.Tween.apply(this,[seconds,easing]);
	this._sprite = sprite;
	this._to = to;
}}
easel.tasks.RotateTo.__name__ = ["easel","tasks","RotateTo"];
easel.tasks.RotateTo.__super__ = easel.tasks.Tween;
for(var k in easel.tasks.Tween.prototype ) easel.tasks.RotateTo.prototype[k] = easel.tasks.Tween.prototype[k];
easel.tasks.RotateTo.linear = function(sprite,to,seconds) {
	return new easel.tasks.RotateTo(sprite,to,seconds,easel.tasks.Tween.LINEAR);
}
easel.tasks.RotateTo.prototype._from = null;
easel.tasks.RotateTo.prototype._sprite = null;
easel.tasks.RotateTo.prototype._to = null;
easel.tasks.RotateTo.prototype.begin = function() {
	this._from = this._sprite.rotation;
}
easel.tasks.RotateTo.prototype.tick = function() {
	this._sprite.setRotation(this._easing(this._elapsed,this._from,this._to,this._duration));
}
easel.tasks.RotateTo.prototype.__class__ = easel.tasks.RotateTo;
StringBuf = function(p) { if( p === $_ ) return; {
	this.b = new Array();
}}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x;
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.b = null;
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.__class__ = StringBuf;
easel.display.CircleSprite = function(radius) { if( radius === $_ ) return; {
	easel.display.Sprite.apply(this,[]);
	this.boundingBox = [-radius,-radius,2 * radius,2 * radius];
	{
		this.radius = radius;
		this._isContentsDirty = true;
		radius;
	}
}}
easel.display.CircleSprite.__name__ = ["easel","display","CircleSprite"];
easel.display.CircleSprite.__super__ = easel.display.Sprite;
for(var k in easel.display.Sprite.prototype ) easel.display.CircleSprite.prototype[k] = easel.display.Sprite.prototype[k];
easel.display.CircleSprite.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(0,0,this.radius,0,Math.PI * 2,true);
	if(this.fillStyle != null) {
		ctx.fillStyle = this.fillStyle;
		ctx.fill();
	}
}
easel.display.CircleSprite.prototype.fillStyle = null;
easel.display.CircleSprite.prototype.radius = null;
easel.display.CircleSprite.prototype.setFillStyle = function(fillStyle) {
	this.fillStyle = fillStyle;
	this._isContentsDirty = true;
	return fillStyle;
}
easel.display.CircleSprite.prototype.setRadius = function(radius) {
	this.radius = radius;
	this._isContentsDirty = true;
	return radius;
}
easel.display.CircleSprite.prototype.setStrokeStyle = function(strokeStyle) {
	this.strokeStyle = strokeStyle;
	this._isContentsDirty = true;
	return strokeStyle;
}
easel.display.CircleSprite.prototype.strokeStyle = null;
easel.display.CircleSprite.prototype.__class__ = easel.display.CircleSprite;
easel.tasks.Sequence = function(tasks) { if( tasks === $_ ) return; {
	this._tasks = tasks;
	this._ii = 0;
}}
easel.tasks.Sequence.__name__ = ["easel","tasks","Sequence"];
easel.tasks.Sequence.prototype._ii = null;
easel.tasks.Sequence.prototype._tasks = null;
easel.tasks.Sequence.prototype.update = function(dt) {
	if(this._tasks[this._ii].update(dt)) {
		this._ii += 1;
		if(this._ii < this._tasks.length) {
			return false;
		}
		else {
			this._ii = 0;
			return true;
		}
	}
	else {
		return false;
	}
}
easel.tasks.Sequence.prototype.__class__ = easel.tasks.Sequence;
easel.tasks.Sequence.__interfaces__ = [easel.tasks.Task];
easel.tasks.MoveTo = function(sprite,toX,toY,seconds,easing) { if( sprite === $_ ) return; {
	easel.tasks.Tween.apply(this,[seconds,easing]);
	this._sprite = sprite;
	this._toX = toX;
	this._toY = toY;
}}
easel.tasks.MoveTo.__name__ = ["easel","tasks","MoveTo"];
easel.tasks.MoveTo.__super__ = easel.tasks.Tween;
for(var k in easel.tasks.Tween.prototype ) easel.tasks.MoveTo.prototype[k] = easel.tasks.Tween.prototype[k];
easel.tasks.MoveTo.linear = function(sprite,toX,toY,seconds) {
	return new easel.tasks.MoveTo(sprite,toX,toY,seconds,easel.tasks.Tween.LINEAR);
}
easel.tasks.MoveTo.prototype._fromX = null;
easel.tasks.MoveTo.prototype._fromY = null;
easel.tasks.MoveTo.prototype._sprite = null;
easel.tasks.MoveTo.prototype._toX = null;
easel.tasks.MoveTo.prototype._toY = null;
easel.tasks.MoveTo.prototype.begin = function() {
	this._fromX = this._sprite.x;
	this._fromY = this._sprite.y;
}
easel.tasks.MoveTo.prototype.tick = function() {
	this._sprite.setX(this._easing(this._elapsed,this._fromX,this._toX,this._duration));
	this._sprite.setY(this._easing(this._elapsed,this._fromY,this._toY,this._duration));
}
easel.tasks.MoveTo.prototype.__class__ = easel.tasks.MoveTo;
IntIter = function(min,max) { if( min === $_ ) return; {
	this.min = min;
	this.max = max;
}}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.max = null;
IntIter.prototype.min = null;
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
easel.Scene = function(p) { if( p === $_ ) return; {
	this._root = new easel.display.Group();
	this._root.activate(this);
	this._tasks = new Array();
	this._entities = new Array();
	this.onUpdate = new easel.util.Signal();
	this.onShow = new easel.util.Signal();
	this.onHide = new easel.util.Signal();
	this.onClick = new easel.util.Signal();
	this.onKeyDown = new easel.util.Signal();
	this.onMouseMove = new easel.util.Signal();
}}
easel.Scene.__name__ = ["easel","Scene"];
easel.Scene.prototype._entities = null;
easel.Scene.prototype._root = null;
easel.Scene.prototype._tasks = null;
easel.Scene.prototype.add = function(entity) {
	if(Std["is"](entity,easel.display.Sprite)) {
		this._root.add(entity);
	}
	else {
		if(!(entity.scene != null)) {
			entity.activate(this);
		}
		this._entities.push(entity);
	}
}
easel.Scene.prototype.addTask = function(task) {
	this._tasks.push(task);
}
easel.Scene.prototype.director = null;
easel.Scene.prototype.getHeight = function() {
	return this.director.ctx.canvas.width;
}
easel.Scene.prototype.getWidth = function() {
	return this.director.ctx.canvas.width;
}
easel.Scene.prototype.height = null;
easel.Scene.prototype.load = function() {
	null;
}
easel.Scene.prototype.onClick = null;
easel.Scene.prototype.onHide = null;
easel.Scene.prototype.onKeyDown = null;
easel.Scene.prototype.onMouseMove = null;
easel.Scene.prototype.onShow = null;
easel.Scene.prototype.onUpdate = null;
easel.Scene.prototype.removeTask = function(task) {
	this._tasks.remove(task);
}
easel.Scene.prototype.render = function(ctx) {
	this._root.render(ctx);
}
easel.Scene.prototype.unload = function() {
	this._root.destroy();
	{
		var _g = 0, _g1 = this._entities;
		while(_g < _g1.length) {
			var entity = _g1[_g];
			++_g;
			entity.destroy();
		}
	}
	haxe.Log.trace("Unloading scene",{ fileName : "Scene.hx", lineNumber : 75, className : "easel.Scene", methodName : "unload"});
	this._root = null;
	this._entities = null;
	this.director = null;
}
easel.Scene.prototype.update = function(dt) {
	this.onUpdate.emit(dt);
	{
		var _g = 0, _g1 = this._tasks;
		while(_g < _g1.length) {
			var task = _g1[_g];
			++_g;
			if(task.update(dt)) {
				this._tasks.remove(task);
			}
		}
	}
}
easel.Scene.prototype.width = null;
easel.Scene.prototype.__class__ = easel.Scene;
MaskingDemo = function(p) { if( p === $_ ) return; {
	easel.Scene.apply(this,[]);
}}
MaskingDemo.__name__ = ["MaskingDemo"];
MaskingDemo.__super__ = easel.Scene;
for(var k in easel.Scene.prototype ) MaskingDemo.prototype[k] = easel.Scene.prototype[k];
MaskingDemo.main = function() {
	var director = new easel.Director(js.Lib.document.getElementById("screen"));
	MaskingDemo.assets.onComplete._slots.push(function(_) {
		director.init(new MaskingDemo());
	});
	MaskingDemo.assets.load(["background.png","ghost.png"]);
}
MaskingDemo.prototype.load = function() {
	this.add(new easel.display.ImageSprite(MaskingDemo.assets.get("background.png")));
	var flashlight = new easel.display.CircleSprite(50);
	{
		flashlight.fillStyle = "#202020";
		flashlight._isContentsDirty = true;
		"#202020";
	}
	flashlight.setCenterX(flashlight.radius);
	flashlight.setCenterY(flashlight.radius);
	flashlight.composite = "lighter";
	this.onMouseMove._slots.push(function(event) {
		flashlight.setX(event.clientX + 10);
		flashlight.setY(event.clientY + 10);
	});
	var ghostLayer = new easel.display.Group();
	{
		ghostLayer.mask = flashlight;
		ghostLayer._isContentsDirty = true;
		flashlight;
	}
	this.add(ghostLayer);
	var wander = null;
	wander = function(ghost) {
		ghost.addTask(new easel.tasks.Sequence([new easel.tasks.MoveTo(ghost,Math.random() * 300,Math.random() * 300,2,easel.tasks.Tween.LINEAR),new easel.tasks.Function(function() {
			wander(ghost);
		})]));
	}
	var spawnGhost = function() {
		var ghost = new easel.display.ImageSprite(MaskingDemo.assets.get("ghost.png"));
		ghost.setX(Math.random() * 300);
		ghost.setY(Math.random() * 300);
		ghost.setCenterX(ghost.boundingBox[2] / 2);
		ghost.setCenterY(ghost.boundingBox[3] / 2);
		ghost.addTask(new easel.tasks.Repeat(new easel.tasks.Sequence([new easel.tasks.RotateTo(ghost,Math.PI / 8,1,easel.tasks.Tween.LINEAR),new easel.tasks.RotateTo(ghost,-Math.PI / 8,1,easel.tasks.Tween.LINEAR)])));
		ghostLayer.add(ghost);
		wander(ghost);
	}
	{
		var _g = 0;
		while(_g < 4) {
			var ii = _g++;
			spawnGhost();
		}
	}
	var killCount = 0;
	this.onClick._slots.push(function(event) {
		var x = event.clientX;
		var y = event.clientY;
		{ var $it0 = ghostLayer.iterator();
		while( $it0.hasNext() ) { var ghost = $it0.next();
		{
			var dx = event.clientX - (ghost.x + ghost.boundingBox[2] / 2);
			var dy = event.clientY - (ghost.y + ghost.boundingBox[3] / 2);
			if(dx * dx + dy * dy < 2500) {
				ghost.removeAllTasks();
				ghost.addTask(new easel.tasks.Sequence([new easel.tasks.Parallel([new easel.tasks.AlphaTo(ghost,0.4,0.3,easel.tasks.Tween.LINEAR),new easel.tasks.ScaleTo(ghost,2,2,1,easel.tasks.Tween.LINEAR)]),new easel.tasks.Function($closure(ghost,"destroy"))]));
				killCount += 1;
				js.Lib.document.getElementById("killCount").innerHTML = "" + killCount;
				ghostLayer.parent.add(ghost);
				spawnGhost();
				break;
			}
		}
		}}
	});
}
MaskingDemo.prototype.__class__ = MaskingDemo;
easel.tasks.Parallel = function(tasks) { if( tasks === $_ ) return; {
	this._tasks = tasks;
	this._completedTasks = [];
}}
easel.tasks.Parallel.__name__ = ["easel","tasks","Parallel"];
easel.tasks.Parallel.prototype._completedTasks = null;
easel.tasks.Parallel.prototype._tasks = null;
easel.tasks.Parallel.prototype.update = function(dt) {
	{
		var _g1 = 0, _g = this._tasks.length;
		while(_g1 < _g) {
			var ii = _g1++;
			var task = this._tasks[ii];
			if(task != null && task.update(dt)) {
				this._tasks[ii] = null;
				this._completedTasks.push(task);
			}
		}
	}
	if(this._completedTasks.length == this._tasks.length) {
		this._tasks = this._completedTasks;
		this._completedTasks = [];
		return true;
	}
	else {
		return false;
	}
}
easel.tasks.Parallel.prototype.__class__ = easel.tasks.Parallel;
easel.tasks.Parallel.__interfaces__ = [easel.tasks.Task];
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x);
	if(Math.isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
if(typeof js=='undefined') js = {}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = (i != null?((i.fileName + ":") + i.lineNumber) + ": ":"");
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg);
	else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
	else null;
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	}
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":{
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				{
					var _g1 = 2, _g = o.length;
					while(_g1 < _g) {
						var i = _g1++;
						if(i != 2) str += "," + js.Boot.__string_rec(o[i],s);
						else str += js.Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			{
				var _g = 0;
				while(_g < l) {
					var i1 = _g++;
					str += ((i1 > 0?",":"")) + js.Boot.__string_rec(o[i1],s);
				}
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		}
		catch( $e1 ) {
			{
				var e = $e1;
				{
					return "???";
				}
			}
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = (o.hasOwnProperty != null);
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) continue;
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") continue;
		if(str.length != 2) str += ", \n";
		str += ((s + k) + " : ") + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += ("\n" + s) + "}";
		return str;
	}break;
	case "function":{
		return "<function>";
	}break;
	case "string":{
		return o;
	}break;
	default:{
		return String(o);
	}break;
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return (o.__enum__ == null);
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	}
	catch( $e2 ) {
		{
			var e = $e2;
			{
				if(cl == null) return false;
			}
		}
	}
	switch(cl) {
	case Int:{
		return Math.ceil(o%2147483648.0) === o;
	}break;
	case Float:{
		return typeof(o) == "number";
	}break;
	case Bool:{
		return o === true || o === false;
	}break;
	case String:{
		return typeof(o) == "string";
	}break;
	case Dynamic:{
		return true;
	}break;
	default:{
		if(o == null) return false;
		return o.__enum__ == cl || (cl == Class && o.__name__ != null) || (cl == Enum && o.__ename__ != null);
	}break;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = (typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null);
	js.Lib.isOpera = (typeof window!='undefined' && window.opera != null);
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	}
	Array.prototype.remove = (Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	});
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}}
	}
	var cca = String.prototype.charCodeAt;
	String.prototype.cca = cca;
	String.prototype.charCodeAt = function(i) {
		var x = cca.call(this,i);
		if(isNaN(x)) return null;
		return x;
	}
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		}
		else if(len < 0) {
			len = (this.length + len) - pos;
		}
		return oldsub.apply(this,[pos,len]);
	}
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
easel.tasks.ScaleTo = function(sprite,toX,toY,seconds,easing) { if( sprite === $_ ) return; {
	easel.tasks.Tween.apply(this,[seconds,easing]);
	this._sprite = sprite;
	this._toX = toX;
	this._toY = toY;
}}
easel.tasks.ScaleTo.__name__ = ["easel","tasks","ScaleTo"];
easel.tasks.ScaleTo.__super__ = easel.tasks.Tween;
for(var k in easel.tasks.Tween.prototype ) easel.tasks.ScaleTo.prototype[k] = easel.tasks.Tween.prototype[k];
easel.tasks.ScaleTo.linear = function(sprite,toX,toY,seconds) {
	return new easel.tasks.ScaleTo(sprite,toX,toY,seconds,easel.tasks.Tween.LINEAR);
}
easel.tasks.ScaleTo.prototype._fromX = null;
easel.tasks.ScaleTo.prototype._fromY = null;
easel.tasks.ScaleTo.prototype._sprite = null;
easel.tasks.ScaleTo.prototype._toX = null;
easel.tasks.ScaleTo.prototype._toY = null;
easel.tasks.ScaleTo.prototype.begin = function() {
	this._fromX = this._sprite.scaleX;
	this._fromY = this._sprite.scaleY;
}
easel.tasks.ScaleTo.prototype.tick = function() {
	this._sprite.setScaleX(this._easing(this._elapsed,this._fromX,this._toX,this._duration));
	this._sprite.setScaleY(this._easing(this._elapsed,this._fromY,this._toY,this._duration));
}
easel.tasks.ScaleTo.prototype.__class__ = easel.tasks.ScaleTo;
easel.Director = function(canvas) { if( canvas === $_ ) return; {
	this.ctx = canvas.getContext("2d");
	this.disableRendering = false;
	this.disableUpdates = false;
	this.onFps = new easel.util.Signal();
	var fpsCtrl = js.Lib.document.getElementById("easel:fps");
	if(fpsCtrl != null) {
		this.onFps._slots.push(function(fps) {
			fpsCtrl.innerHTML = "" + fps;
		});
	}
	this._scenes = [];
}}
easel.Director.__name__ = ["easel","Director"];
easel.Director.prototype._current = null;
easel.Director.prototype._scenes = null;
easel.Director.prototype.ctx = null;
easel.Director.prototype.disableRendering = null;
easel.Director.prototype.disableUpdates = null;
easel.Director.prototype.getHeight = function() {
	return this.ctx.canvas.height;
}
easel.Director.prototype.getWidth = function() {
	return this.ctx.canvas.width;
}
easel.Director.prototype.height = null;
easel.Director.prototype.init = function(firstScene) {
	var self = this;
	(js.Lib.document.addEventListener)("keydown",$closure(this,"onKeyDown"),false);
	(this.ctx.canvas.addEventListener)("click",$closure(this,"onClick"),false);
	(this.ctx.canvas.addEventListener)("mousemove",$closure(this,"onMouseMove"),false);
	this.replaceScene(firstScene);
	var disableRenderingCtrl = js.Lib.document.getElementById("easel:disableRendering");
	if(disableRenderingCtrl != null) {
		(disableRenderingCtrl.onchange = function(event) {
			self.disableRendering = disableRenderingCtrl.checked;
		})(null);
	}
	var disableUpdatesCtrl = js.Lib.document.getElementById("easel:disableUpdates");
	if(disableUpdatesCtrl != null) {
		(disableUpdatesCtrl.onchange = function(event) {
			self.disableUpdates = disableUpdatesCtrl.checked;
		})(null);
	}
	var taskCount = js.Lib.document.getElementById("easel:tasks");
	var dummyContext = null;
	dummyContext = { canvas : { width : this.ctx.canvas.width, height : this.ctx.canvas.height, getContext : function(type) {
		return dummyContext;
	}}, save : function() {
		null;
	}, restore : function() {
		null;
	}, scale : function(x,y) {
		null;
	}, rotate : function(r) {
		null;
	}, translate : function(x,y) {
		null;
	}, transform : function(m11,m12,m21,m22,dx,dy) {
		null;
	}, setTransform : function(m11,m12,m21,m22,dx,dy) {
		null;
	}, globalAlpha : 1, globalCompositeOperation : "todo", strokeStyle : null, fillStyle : null, lineWidth : 0, lineCap : null, lineJoin : null, miterLimit : null, shadowOffsetX : 0, shadowOffsetY : 0, shadowBlur : 0, shadowColor : null, font : null, textAlign : null, textBaseline : null, fillText : function(text,x,y) {
		null;
	}, strokeText : function(text,x,y) {
		null;
	}, measureText : function(text) {
		return { width : 100}
	}, clearRect : function(x,y,w,h) {
		null;
	}, fillRect : function(x,y,w,h) {
		null;
	}, strokeRect : function(x,y,w,h) {
		null;
	}, beginPath : function() {
		null;
	}, closePath : function() {
		null;
	}, moveTo : function(x,y) {
		null;
	}, lineTo : function(x,y) {
		null;
	}, quadraticCurveTo : function(cpx,cpy,x,y) {
		null;
	}, bezierCurveTo : function(cp1x,cp1y,cp2x,cp2y,x,y) {
		null;
	}, arcTo : function(x1,y1,x2,y2,radius) {
		null;
	}, rect : function(x,y,w,h) {
		null;
	}, arc : function(x,y,radius,startAngle,endAngle,anticlockwise) {
		null;
	}, fill : function() {
		null;
	}, stroke : function() {
		null;
	}, clip : function() {
		null;
	}, isPointInPath : function(x,y) {
		null;
	}, drawImage : function(image,dx,dy,a1,a2,a3,a4,a5,a6) {
		null;
	}, getImageData : function(sx,sy,sw,sh) {
		null;
	}, putImageData : function(imagedata,dx,dy,dirtyX,dirtyY,dirtyWidth,dirtyHeight) {
		null;
	}}
	var fpsTime = 0;
	var fpsFrames = 0;
	var lastTime = 0;
	var tick = function() {
		var now = new Date().getTime();
		var elapsed = now - lastTime;
		if(!self.disableUpdates) {
			self._current.update(elapsed);
		}
		if(self.disableRendering) {
			self._current._root.render(dummyContext);
		}
		else {
			self._current._root.render(self.ctx);
		}
		lastTime = now;
		fpsFrames += 1;
		fpsTime += elapsed;
		if(fpsTime > 1000) {
			var fps = Math.round((100000 * fpsFrames) / fpsTime) / 100;
			self.onFps.emit(fps);
			fpsTime = 0;
			fpsFrames = 0;
		}
		if(taskCount != null) {
			taskCount.innerHTML = (self._current)._tasks.length;
		}
		window.setTimeout(tick,1000 / 30);
	}
	lastTime = Date.now().getTime();
	tick();
}
easel.Director.prototype.onClick = function(event) {
	this._current.onClick.emit(event);
}
easel.Director.prototype.onFps = null;
easel.Director.prototype.onKeyDown = function(event) {
	this._current.onKeyDown.emit(event);
}
easel.Director.prototype.onMouseMove = function(event) {
	this._current.onMouseMove.emit(event);
}
easel.Director.prototype.popScene = function() {
	if(this._scenes.length > 1) {
		var prev = this._scenes.pop();
		this._current = this._scenes[this._scenes.length - 1];
		prev.onHide.emit(null);
		prev.unload();
		this._current.onShow.emit(null);
	}
}
easel.Director.prototype.pushScene = function(scene) {
	this._current.onHide.emit(null);
	this._scenes.push(scene);
	this._current = scene;
	scene.director = this;
	scene.load();
	scene.onShow.emit(null);
}
easel.Director.prototype.replaceScene = function(scene) {
	var removed = this._scenes.pop();
	if(removed != null) {
		removed.onHide.emit(null);
		removed.unload();
	}
	this._scenes.push(scene);
	this._current = scene;
	scene.director = this;
	scene.load();
	scene.onShow.emit(null);
}
easel.Director.prototype.width = null;
easel.Director.prototype.__class__ = easel.Director;
easel.tasks.Repeat = function(task) { if( task === $_ ) return; {
	this._task = task;
}}
easel.tasks.Repeat.__name__ = ["easel","tasks","Repeat"];
easel.tasks.Repeat.prototype._task = null;
easel.tasks.Repeat.prototype.update = function(dt) {
	this._task.update(dt);
	return false;
}
easel.tasks.Repeat.prototype.__class__ = easel.tasks.Repeat;
easel.tasks.Repeat.__interfaces__ = [easel.tasks.Task];
Hash = function(p) { if( p === $_ ) return; {
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
	else null;
}}
Hash.__name__ = ["Hash"];
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	}
	catch( $e3 ) {
		{
			var e = $e3;
			{
				
				for(var i in this.h)
					if( i == key ) return true;
			;
				return false;
			}
		}
	}
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.h = null;
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}}
}
Hash.prototype.keys = function() {
	var a = new Array();
	
			for(var i in this.h)
				a.push(i.substr(1));
		;
	return a.iterator();
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	{ var $it4 = it;
	while( $it4.hasNext() ) { var i = $it4.next();
	{
		s.b[s.b.length] = i;
		s.b[s.b.length] = " => ";
		s.b[s.b.length] = Std.string(this.get(i));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	}}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
$Main = function() { }
$Main.__name__ = ["@Main"];
$Main.prototype.__class__ = $Main;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Date.now = function() {
		return new Date();
	}
	Date.fromTime = function(t) {
		var d = new Date();
		d["setTime"](t);
		return d;
	}
	Date.fromString = function(s) {
		switch(s.length) {
		case 8:{
			var k = s.split(":");
			var d = new Date();
			d["setTime"](0);
			d["setUTCHours"](k[0]);
			d["setUTCMinutes"](k[1]);
			d["setUTCSeconds"](k[2]);
			return d;
		}break;
		case 10:{
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		}break;
		case 19:{
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		}break;
		default:{
			throw "Invalid date format : " + s;
		}break;
		}
	}
	Date.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return (((((((((date.getFullYear() + "-") + ((m < 10?"0" + m:"" + m))) + "-") + ((d < 10?"0" + d:"" + d))) + " ") + ((h < 10?"0" + h:"" + h))) + ":") + ((mi < 10?"0" + mi:"" + mi))) + ":") + ((s < 10?"0" + s:"" + s));
	}
	Date.prototype.__class__ = Date;
	Date.__name__ = ["Date"];
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]}
	Dynamic = { __name__ : ["Dynamic"]}
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]}
	Class = { __name__ : ["Class"]}
	Enum = { }
	Void = { __ename__ : ["Void"]}
}
{
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	}
	Math.isNaN = function(i) {
		return isNaN(i);
	}
	Math.__name__ = ["Math"];
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var stack = $s.copy();
		var f = js.Lib.onerror;
		$s.splice(0,$s.length);
		if( f == null ) {
			var i = stack.length;
			var s = "";
			while( --i >= 0 )
				s += "Called from "+stack[i]+"\n";
			alert(msg+"\n\n"+s);
			return false;
		}
		return f(msg,stack);
	}
}
MaskingDemo.assets = new easel.util.AssetPack("./");
js.Lib.onerror = null;
$Main.init = MaskingDemo.main();
