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
if(!easel.media) easel.media = {}
easel.media.AudioManager = function() { }
easel.media.AudioManager.__name__ = ["easel","media","AudioManager"];
easel.media.AudioManager.load = function(src) {
	var audio = new Audio(src);
	if(!audio.canPlayType) {
		return;
	}
	if(audio.canPlayType("audio/mpeg")) {
		src += ".mp3";
	}
	else if(audio.canPlayType("audio/ogg")) {
		src += ".ogg";
	}
	else if(audio.canPlayType("audio/wav")) {
		src += ".wav";
	}
	else {
		return;
	}
	audio.setAttribute("src",src);
	audio.load();
	return audio;
}
easel.media.AudioManager.play = function(src) {
	var audio = easel.media.AudioManager.load(src);
	if(audio != null) {
		audio.play();
	}
	return audio;
}
easel.media.AudioManager.prototype.__class__ = easel.media.AudioManager;
easel.Div = function(className) { if( className === $_ ) return; {
	this._element = js.Lib.document.createElement("div");
	this._element.className = className;
	this.onClick = new easel.util.Signal();
	(this._element.addEventListener)("click",$closure(this.onClick,"emit"),false);
}}
easel.Div.__name__ = ["easel","Div"];
easel.Div.__super__ = easel.Entity;
for(var k in easel.Entity.prototype ) easel.Div.prototype[k] = easel.Entity.prototype[k];
easel.Div.prototype._element = null;
easel.Div.prototype.activate = function(scene) {
	easel.Entity.prototype.activate.apply(this,[scene]);
	scene.director.ctx.canvas.parentNode.appendChild(this._element);
	var style = this._element.style;
	this.registerListener(scene.onHide,function(_) {
		style.display = "none";
	});
	this.registerListener(scene.onShow,function(_) {
		style.display = "inherit";
	});
}
easel.Div.prototype.destroy = function() {
	easel.Entity.prototype.destroy.apply(this,[]);
	this._element.parentNode.removeChild(this._element);
}
easel.Div.prototype.onClick = null;
easel.Div.prototype.setContent = function(html) {
	this._element.innerHTML = html;
}
easel.Div.prototype.__class__ = easel.Div;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	{ var $it0 = arr.iterator();
	while( $it0.hasNext() ) { var t = $it0.next();
	if(t == field) return true;
	}}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	}
	catch( $e1 ) {
		{
			var e = $e1;
			null;
		}
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		
					for(var i in o)
						if( o.hasOwnProperty(i) )
							a.push(i);
				;
	}
	else {
		var t;
		try {
			t = o.__proto__;
		}
		catch( $e2 ) {
			{
				var e = $e2;
				{
					t = null;
				}
			}
		}
		if(t != null) o.__proto__ = null;
		
					for(var i in o)
						if( i != "__proto__" )
							a.push(i);
				;
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return ((a == b)?0:((((a) > (b))?1:-1)));
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return (t == "string" || (t == "object" && !v.__enum__) || (t == "function" && v.__name__ != null));
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { }
	{
		var _g = 0, _g1 = Reflect.fields(o);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			o2[f] = Reflect.field(o,f);
		}
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		{
			var _g1 = 0, _g = arguments.length;
			while(_g1 < _g) {
				var i = _g1++;
				a.push(arguments[i]);
			}
		}
		return f(a);
	}
}
Reflect.prototype.__class__ = Reflect;
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
easel.tasks.Tween.QUAD_IN = function(t,a,b,d) {
	t /= d;
	return ((b - a) * t) * t + a;
}
easel.tasks.Tween.EXPO_IN = function(t,a,b,d) {
	return (b - a) * Math.pow(2,10 * (t / d - 1)) + a;
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
if(typeof tetris=='undefined') tetris = {}
tetris.BoardEvent = { __ename__ : ["tetris","BoardEvent"], __constructs__ : ["PieceMoved","PieceDropped","PiecePlaced","PieceRotated","NextPiece","RowsCleared","ScoreChanged","LevelChanged","GameOver"] }
tetris.BoardEvent.GameOver = ["GameOver",8];
tetris.BoardEvent.GameOver.toString = $estr;
tetris.BoardEvent.GameOver.__enum__ = tetris.BoardEvent;
tetris.BoardEvent.LevelChanged = ["LevelChanged",7];
tetris.BoardEvent.LevelChanged.toString = $estr;
tetris.BoardEvent.LevelChanged.__enum__ = tetris.BoardEvent;
tetris.BoardEvent.NextPiece = function(piece,preview) { var $x = ["NextPiece",4,piece,preview]; $x.__enum__ = tetris.BoardEvent; $x.toString = $estr; return $x; }
tetris.BoardEvent.PieceDropped = function(p) { var $x = ["PieceDropped",1,p]; $x.__enum__ = tetris.BoardEvent; $x.toString = $estr; return $x; }
tetris.BoardEvent.PieceMoved = function(p,dx,dy) { var $x = ["PieceMoved",0,p,dx,dy]; $x.__enum__ = tetris.BoardEvent; $x.toString = $estr; return $x; }
tetris.BoardEvent.PiecePlaced = function(p) { var $x = ["PiecePlaced",2,p]; $x.__enum__ = tetris.BoardEvent; $x.toString = $estr; return $x; }
tetris.BoardEvent.PieceRotated = function(p) { var $x = ["PieceRotated",3,p]; $x.__enum__ = tetris.BoardEvent; $x.toString = $estr; return $x; }
tetris.BoardEvent.RowsCleared = function(rows) { var $x = ["RowsCleared",5,rows]; $x.__enum__ = tetris.BoardEvent; $x.toString = $estr; return $x; }
tetris.BoardEvent.ScoreChanged = ["ScoreChanged",6];
tetris.BoardEvent.ScoreChanged.toString = $estr;
tetris.BoardEvent.ScoreChanged.__enum__ = tetris.BoardEvent;
tetris.Board = function(width,height) { if( width === $_ ) return; {
	easel.util.Signal.apply(this,[]);
	this._width = width;
	this._height = height;
}}
tetris.Board.__name__ = ["tetris","Board"];
tetris.Board.__super__ = easel.util.Signal;
for(var k in easel.util.Signal.prototype ) tetris.Board.prototype[k] = easel.util.Signal.prototype[k];
tetris.Board.prototype._blocks = null;
tetris.Board.prototype._height = null;
tetris.Board.prototype._piece = null;
tetris.Board.prototype._playing = null;
tetris.Board.prototype._preview = null;
tetris.Board.prototype._rowsCleared = null;
tetris.Board.prototype._width = null;
tetris.Board.prototype.clearFilledRows = function() {
	var filledRows = new Array();
	{
		var _g = 0, _g1 = this._piece.coords;
		while(_g < _g1.length) {
			var coord = _g1[_g];
			++_g;
			var row = this._piece.y + coord[1];
			if(!Lambda.has(filledRows,row)) {
				var filled = true;
				{
					var _g3 = 0, _g2 = this._width;
					while(_g3 < _g2) {
						var col = _g3++;
						if(!this._blocks[row * this._width + col]) {
							filled = false;
							break;
						}
					}
				}
				if(filled) {
					filledRows.push(row);
				}
			}
		}
	}
	if(filledRows.length > 0) {
		filledRows.sort($closure(Reflect,"compare"));
		{
			var _g = 0;
			while(_g < filledRows.length) {
				var row = filledRows[_g];
				++_g;
				var y = row;
				while(y > 0) {
					{
						var _g2 = 0, _g1 = this._width;
						while(_g2 < _g1) {
							var x = _g2++;
							this._blocks[y * this._width + x] = this._blocks[(y - 1) * this._width + x];
						}
					}
					y -= 1;
				}
			}
		}
		filledRows.reverse();
		var count = filledRows.length;
		this.score += this.level * [40,100,300,1200][count - 1];
		this._rowsCleared += count;
		var nextLevel = 1 + Math.floor(this._rowsCleared / 4);
		if(nextLevel != this.level) {
			this.level = nextLevel;
			this.emit(tetris.BoardEvent.LevelChanged);
		}
		this.emit(tetris.BoardEvent.RowsCleared(filledRows));
		this.emit(tetris.BoardEvent.ScoreChanged);
	}
}
tetris.Board.prototype.drop = function() {
	while(this.isValid(this._piece)) {
		this._piece.y += 1;
	}
	this._piece.y -= 1;
	this.emit(tetris.BoardEvent.PieceDropped(this._piece));
	this.step();
}
tetris.Board.prototype.dropPiece = function() {
	while(this.isValid(this._piece)) {
		this._piece.y += 1;
	}
	this._piece.y -= 1;
	this.emit(tetris.BoardEvent.PieceDropped(this._piece));
}
tetris.Board.prototype.endGame = function() {
	this._playing = false;
	this.emit(tetris.BoardEvent.GameOver);
}
tetris.Board.prototype.getHeight = function() {
	return this._height;
}
tetris.Board.prototype.getPieceX = function() {
	return this._piece.x;
}
tetris.Board.prototype.getPieceY = function() {
	return this._piece.y;
}
tetris.Board.prototype.getWidth = function() {
	return this._width;
}
tetris.Board.prototype.height = null;
tetris.Board.prototype.isBlocked = function(x,y) {
	return x < 0 || x >= this._width || y < 0 || y >= this._height || this._blocks[y * this._width + x];
}
tetris.Board.prototype.isValid = function(p) {
	{
		var _g = 0, _g1 = p.coords;
		while(_g < _g1.length) {
			var coord = _g1[_g];
			++_g;
			if(this.isBlocked(p.x + coord[0],p.y + coord[1])) {
				return false;
			}
		}
	}
	return true;
}
tetris.Board.prototype.level = null;
tetris.Board.prototype.movePiece = function(dx,dy) {
	var nx = this._piece.x + dx;
	var ny = this._piece.y + dy;
	{
		var _g = 0, _g1 = this._piece.coords;
		while(_g < _g1.length) {
			var coord = _g1[_g];
			++_g;
			if(this.isBlocked(nx + coord[0],ny + coord[1])) {
				return false;
			}
		}
	}
	this._piece.x = nx;
	this._piece.y = ny;
	this.emit(tetris.BoardEvent.PieceMoved(this._piece,dx,dy));
	return true;
}
tetris.Board.prototype.nextPiece = function() {
	this._piece = this._preview;
	this._piece.x = Math.floor(this._width / 2);
	this._piece.y = 2;
	this._preview = tetris.Piece.createRandom();
	if(!this.isValid(this._piece)) {
		this.endGame();
	}
	else {
		this.emit(tetris.BoardEvent.NextPiece(this._piece,this._preview));
	}
}
tetris.Board.prototype.pieceX = null;
tetris.Board.prototype.pieceY = null;
tetris.Board.prototype.placePiece = function() {
	{
		var _g = 0, _g1 = this._piece.coords;
		while(_g < _g1.length) {
			var coord = _g1[_g];
			++_g;
			var x = this._piece.x + coord[0];
			var y = this._piece.y + coord[1];
			this._blocks[y * this._width + x] = true;
		}
	}
	this.emit(tetris.BoardEvent.PiecePlaced(this._piece));
}
tetris.Board.prototype.rotate = function() {
	var rotated = this._piece.rotate();
	if(rotated != null && this.isValid(rotated)) {
		this._piece = rotated;
		this.emit(tetris.BoardEvent.PieceRotated(this._piece));
	}
}
tetris.Board.prototype.score = null;
tetris.Board.prototype.startGame = function() {
	this._blocks = [];
	this._playing = true;
	this._preview = tetris.Piece.createRandom();
	this._rowsCleared = 0;
	this.score = 0;
	this.level = 1;
	this.emit(tetris.BoardEvent.LevelChanged);
	this.emit(tetris.BoardEvent.ScoreChanged);
	this.nextPiece();
}
tetris.Board.prototype.step = function() {
	if(this._playing && !this.movePiece(0,1)) {
		this.placePiece();
		this.clearFilledRows();
		this.nextPiece();
	}
}
tetris.Board.prototype.width = null;
tetris.Board.prototype.__class__ = tetris.Board;
easel.tasks.WaitOn = function(predicate) { if( predicate === $_ ) return; {
	this._p = predicate;
}}
easel.tasks.WaitOn.__name__ = ["easel","tasks","WaitOn"];
easel.tasks.WaitOn.prototype._p = null;
easel.tasks.WaitOn.prototype.update = function(dt) {
	return this._p();
}
easel.tasks.WaitOn.prototype.__class__ = easel.tasks.WaitOn;
easel.tasks.WaitOn.__interfaces__ = [easel.tasks.Task];
easel.tasks.Delay = function(seconds) { if( seconds === $_ ) return; {
	this._duration = seconds * 1000;
	this._elapsed = 0;
}}
easel.tasks.Delay.__name__ = ["easel","tasks","Delay"];
easel.tasks.Delay.prototype._duration = null;
easel.tasks.Delay.prototype._elapsed = null;
easel.tasks.Delay.prototype.update = function(dt) {
	this._elapsed += dt;
	if(this._elapsed >= this._duration) {
		this._elapsed = 0;
		return true;
	}
	else {
		return false;
	}
}
easel.tasks.Delay.prototype.__class__ = easel.tasks.Delay;
easel.tasks.Delay.__interfaces__ = [easel.tasks.Task];
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
easel.display.FilledSprite = function(fillStyle,width,height) { if( fillStyle === $_ ) return; {
	if(height == null) height = 0;
	if(width == null) width = 0;
	easel.display.Sprite.apply(this,[]);
	this._width = width;
	this._height = height;
	{
		this.fillStyle = fillStyle;
		this._isContentsDirty = true;
		fillStyle;
	}
}}
easel.display.FilledSprite.__name__ = ["easel","display","FilledSprite"];
easel.display.FilledSprite.__super__ = easel.display.Sprite;
for(var k in easel.display.Sprite.prototype ) easel.display.FilledSprite.prototype[k] = easel.display.Sprite.prototype[k];
easel.display.FilledSprite.prototype._height = null;
easel.display.FilledSprite.prototype._width = null;
easel.display.FilledSprite.prototype.draw = function(ctx) {
	var w = ((this._width > 0)?this._width:ctx.canvas.width);
	var h = ((this._height > 0)?this._height:ctx.canvas.height);
	if(this.fillStyle != null) {
		ctx.fillStyle = this.fillStyle;
		ctx.fillRect(0,0,w,h);
	}
}
easel.display.FilledSprite.prototype.fillStyle = null;
easel.display.FilledSprite.prototype.setFillStyle = function(fillStyle) {
	this.fillStyle = fillStyle;
	this._isContentsDirty = true;
	return fillStyle;
}
easel.display.FilledSprite.prototype.setStrokeStyle = function(strokeStyle) {
	this.strokeStyle = strokeStyle;
	this._isContentsDirty = true;
	return strokeStyle;
}
easel.display.FilledSprite.prototype.strokeStyle = null;
easel.display.FilledSprite.prototype.__class__ = easel.display.FilledSprite;
tetris.PieceSprite = function(piece) { if( piece === $_ ) return; {
	easel.display.Group.apply(this,[]);
	this.setX(piece.x * 20);
	this.setY(piece.y * 20);
	this.setCenterX(0.5 * 20);
	this.setCenterY(0.5 * 20);
	var image = tetris.Main.assets.get("blocks.png");
	{
		var _g = 0, _g1 = piece.coords;
		while(_g < _g1.length) {
			var coord = _g1[_g];
			++_g;
			var block = new easel.display.ImageSprite(image,7);
			block.setX(coord[0] * 20);
			block.setY(coord[1] * 20);
			block.setFrame(piece.color);
			this.add(block);
		}
	}
}}
tetris.PieceSprite.__name__ = ["tetris","PieceSprite"];
tetris.PieceSprite.__super__ = easel.display.Group;
for(var k in easel.display.Group.prototype ) tetris.PieceSprite.prototype[k] = easel.display.Group.prototype[k];
tetris.PieceSprite.prototype.__class__ = tetris.PieceSprite;
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
PauseScene = function(p) { if( p === $_ ) return; {
	easel.Scene.apply(this,[]);
	var bg = new easel.display.FilledSprite("#0000ff");
	bg.alpha = 0.5;
	this.add(bg);
	var label = new easel.display.TextSprite("PAUSED");
	{
		label.fillStyle = "#ffffff";
		label._isContentsDirty = true;
		"#ffffff";
	}
	{
		label.font = "24px bold";
		label._isContentsDirty = true;
		"24px bold";
	}
	{
		label.x = 200;
		label._isTransformDirty = true;
		200;
	}
	{
		label.y = 300;
		label._isTransformDirty = true;
		300;
	}
	label.packBounds();
	haxe.Log.trace(label.boundingBox[2],{ fileName : "PauseScene.hx", lineNumber : 35, className : "PauseScene", methodName : "new"});
	this.add(label);
	this.addTask(new easel.tasks.Repeat(new easel.tasks.Sequence([new easel.tasks.ScaleTo(label,1.5,1.5,0.5,easel.tasks.Tween.LINEAR),new easel.tasks.ScaleTo(label,1,1,0.5,easel.tasks.Tween.LINEAR)])));
}}
PauseScene.__name__ = ["PauseScene"];
PauseScene.__super__ = easel.Scene;
for(var k in easel.Scene.prototype ) PauseScene.prototype[k] = easel.Scene.prototype[k];
PauseScene.prototype.load = function() {
	var button = new easel.Div("unpause button");
	var self = this;
	button.onClick._slots.push(function(_) {
		self.director.popScene();
	});
	this.add(button);
}
PauseScene.prototype.__class__ = PauseScene;
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
easel.tasks.MoveTo.quadIn = function(sprite,toX,toY,seconds) {
	return new easel.tasks.MoveTo(sprite,toX,toY,seconds,easel.tasks.Tween.QUAD_IN);
}
easel.tasks.MoveTo.expoIn = function(sprite,toX,toY,seconds) {
	return new easel.tasks.MoveTo(sprite,toX,toY,seconds,easel.tasks.Tween.EXPO_IN);
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
haxe.Firebug = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	}
	catch( $e3 ) {
		{
			var e = $e3;
			{
				return false;
			}
		}
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = $closure(haxe.Firebug,"trace");
	js.Lib.setErrorHandler($closure(haxe.Firebug,"onError"));
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	{
		var _g = 0;
		while(_g < stack.length) {
			var s = stack[_g];
			++_g;
			buf += ("Called from " + s) + "\n";
		}
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = (inf != null && inf.customParams != null?inf.customParams[0]:null);
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = (inf == null?"error":"log");
	console[type](((inf == null?"":((inf.fileName + ":") + inf.lineNumber) + " : ")) + Std.string(v));
}
haxe.Firebug.prototype.__class__ = haxe.Firebug;
tetris.Piece = function(color,coords) { if( color === $_ ) return; {
	this.color = color;
	this.coords = coords;
}}
tetris.Piece.__name__ = ["tetris","Piece"];
tetris.Piece.createRandom = function() {
	var preset = tetris.Piece.presets[Math.floor(Math.random() * tetris.Piece.presets.length)];
	return new tetris.Piece(preset.color,preset.coords);
}
tetris.Piece.prototype.color = null;
tetris.Piece.prototype.coords = null;
tetris.Piece.prototype.rotate = function() {
	if(this.coords == tetris.Piece.presets[0].coords) {
		return null;
	}
	else {
		var next = [];
		{
			var _g = 0, _g1 = this.coords;
			while(_g < _g1.length) {
				var coord = _g1[_g];
				++_g;
				next.push([-coord[1],coord[0]]);
			}
		}
		var rotated = new tetris.Piece(this.color,next);
		rotated.x = this.x;
		rotated.y = this.y;
		return rotated;
	}
}
tetris.Piece.prototype.x = null;
tetris.Piece.prototype.y = null;
tetris.Piece.prototype.__class__ = tetris.Piece;
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
easel.display.TextSprite = function(text) { if( text === $_ ) return; {
	if(text == null) text = "";
	easel.display.Sprite.apply(this,[]);
	{
		this.text = text;
		this._isContentsDirty = true;
		text;
	}
	{
		this.font = "12px serif";
		this._isContentsDirty = true;
		"12px serif";
	}
}}
easel.display.TextSprite.__name__ = ["easel","display","TextSprite"];
easel.display.TextSprite.__super__ = easel.display.Sprite;
for(var k in easel.display.Sprite.prototype ) easel.display.TextSprite.prototype[k] = easel.display.Sprite.prototype[k];
easel.display.TextSprite.prototype.align = null;
easel.display.TextSprite.prototype.baseline = null;
easel.display.TextSprite.prototype.draw = function(ctx) {
	ctx.font = this.font;
	if(this.align != null) {
		ctx.textAlign = this.align;
	}
	if(this.baseline != null) {
		ctx.textBaseline = this.baseline;
	}
	if(this.fillStyle != null) {
		ctx.fillStyle = this.fillStyle;
		ctx.fillText(this.text,0,0,this.maxWidth);
	}
	if(this.strokeStyle != null) {
		ctx.strokeStyle = this.strokeStyle;
		ctx.strokeText(this.text,0,0,this.maxWidth);
	}
}
easel.display.TextSprite.prototype.fillStyle = null;
easel.display.TextSprite.prototype.font = null;
easel.display.TextSprite.prototype.maxWidth = null;
easel.display.TextSprite.prototype.packBounds = function(ctx) {
	if(ctx != null) {
		ctx.save();
		ctx.font = this.font;
		this.boundingBox[2] = ctx.measureText(this.text).width;
		ctx.restore();
		if(this.maxWidth != null && this.maxWidth > this.boundingBox[2]) {
			this.boundingBox[2] = this.maxWidth;
		}
		this.boundingBox[3] = 50;
		switch(this.align) {
		case "center":{
			this.boundingBox[0] = -this.boundingBox[2] / 2;
		}break;
		case "right":{
			this.boundingBox[0] = -this.boundingBox[2];
		}break;
		default:{
			this.boundingBox[0] = 0;
		}break;
		}
		switch(this.baseline) {
		case "top":{
			this.boundingBox[1] = 0;
		}break;
		case "hanging":{
			this.boundingBox[1] = 0;
		}break;
		case "middle":{
			this.boundingBox[1] = -this.boundingBox[3] / 2;
		}break;
		default:{
			this.boundingBox[1] = -this.boundingBox[3];
		}break;
		}
		haxe.Log.trace(this.boundingBox,{ fileName : "TextSprite.hx", lineNumber : 104, className : "easel.display.TextSprite", methodName : "packBounds"});
	}
	easel.display.Sprite.prototype.packBounds.apply(this,[ctx]);
}
easel.display.TextSprite.prototype.setAlign = function(align) {
	this.align = align;
	this._isContentsDirty = true;
	return align;
}
easel.display.TextSprite.prototype.setBaseline = function(baseline) {
	this.baseline = baseline;
	this._isContentsDirty = true;
	return baseline;
}
easel.display.TextSprite.prototype.setFillStyle = function(fillStyle) {
	this.fillStyle = fillStyle;
	this._isContentsDirty = true;
	return fillStyle;
}
easel.display.TextSprite.prototype.setFont = function(font) {
	this.font = font;
	this._isContentsDirty = true;
	return font;
}
easel.display.TextSprite.prototype.setMaxWidth = function(maxWidth) {
	this.maxWidth = maxWidth;
	this._isContentsDirty = true;
	return maxWidth;
}
easel.display.TextSprite.prototype.setStrokeStyle = function(strokeStyle) {
	this.strokeStyle = strokeStyle;
	this._isContentsDirty = true;
	return strokeStyle;
}
easel.display.TextSprite.prototype.setText = function(text) {
	this.text = text;
	this._isContentsDirty = true;
	return text;
}
easel.display.TextSprite.prototype.strokeStyle = null;
easel.display.TextSprite.prototype.text = null;
easel.display.TextSprite.prototype.__class__ = easel.display.TextSprite;
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
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	{ var $it4 = it.iterator();
	while( $it4.hasNext() ) { var i = $it4.next();
	a.push(i);
	}}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	{ var $it5 = it.iterator();
	while( $it5.hasNext() ) { var i = $it5.next();
	l.add(i);
	}}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	{ var $it6 = it.iterator();
	while( $it6.hasNext() ) { var x = $it6.next();
	l.add(f(x));
	}}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	{ var $it7 = it.iterator();
	while( $it7.hasNext() ) { var x = $it7.next();
	l.add(f(i++,x));
	}}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		{ var $it8 = it.iterator();
		while( $it8.hasNext() ) { var x = $it8.next();
		if(x == elt) return true;
		}}
	}
	else {
		{ var $it9 = it.iterator();
		while( $it9.hasNext() ) { var x = $it9.next();
		if(cmp(x,elt)) return true;
		}}
	}
	return false;
}
Lambda.exists = function(it,f) {
	{ var $it10 = it.iterator();
	while( $it10.hasNext() ) { var x = $it10.next();
	if(f(x)) return true;
	}}
	return false;
}
Lambda.foreach = function(it,f) {
	{ var $it11 = it.iterator();
	while( $it11.hasNext() ) { var x = $it11.next();
	if(!f(x)) return false;
	}}
	return true;
}
Lambda.iter = function(it,f) {
	{ var $it12 = it.iterator();
	while( $it12.hasNext() ) { var x = $it12.next();
	f(x);
	}}
}
Lambda.filter = function(it,f) {
	var l = new List();
	{ var $it13 = it.iterator();
	while( $it13.hasNext() ) { var x = $it13.next();
	if(f(x)) l.add(x);
	}}
	return l;
}
Lambda.fold = function(it,f,first) {
	{ var $it14 = it.iterator();
	while( $it14.hasNext() ) { var x = $it14.next();
	first = f(x,first);
	}}
	return first;
}
Lambda.count = function(it) {
	var n = 0;
	{ var $it15 = it.iterator();
	while( $it15.hasNext() ) { var _ = $it15.next();
	++n;
	}}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.prototype.__class__ = Lambda;
List = function(p) { if( p === $_ ) return; {
	this.length = 0;
}}
List.__name__ = ["List"];
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x;
	else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.first = function() {
	return (this.h == null?null:this.h[0]);
}
List.prototype.h = null;
List.prototype.isEmpty = function() {
	return (this.h == null);
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return (this.h != null);
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}}
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = sep;
		s.b[s.b.length] = l[0];
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.last = function() {
	return (this.q == null?null:this.q[0]);
}
List.prototype.length = null;
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.q = null;
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1];
			else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false;
		else s.b[s.b.length] = ", ";
		s.b[s.b.length] = Std.string(l[0]);
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
}
List.prototype.__class__ = List;
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
tetris.Main = function() { }
tetris.Main.__name__ = ["tetris","Main"];
tetris.Main.assets = null;
tetris.Main.main = function() {
	var canvas = js.Lib.document.getElementById("screen");
	var director = new easel.Director(canvas);
	if(haxe.Firebug.detect()) {
		haxe.Firebug.redirectTraces();
	}
	tetris.Main.assets = new easel.util.AssetPack("static/");
	tetris.Main.assets.onProgress._slots.push(function(p) {
		haxe.Log.trace("Preload progress: " + p,{ fileName : "Main.hx", lineNumber : 32, className : "tetris.Main", methodName : "main"});
	});
	tetris.Main.assets.onComplete._slots.push(function(_) {
		director.init(new tetris.PlayingScene());
	});
	tetris.Main.assets.load(["chrome.png","blocks.png"]);
}
tetris.Main.prototype.__class__ = tetris.Main;
tetris.Color = { __ename__ : ["tetris","Color"], __constructs__ : ["Pink","RGB"] }
tetris.Color.Pink = ["Pink",0];
tetris.Color.Pink.toString = $estr;
tetris.Color.Pink.__enum__ = tetris.Color;
tetris.Color.RGB = function(r,g,b) { var $x = ["RGB",1,r,g,b]; $x.__enum__ = tetris.Color; $x.toString = $estr; return $x; }
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
		catch( $e16 ) {
			{
				var e = $e16;
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
	catch( $e17 ) {
		{
			var e = $e17;
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
tetris.BoardSprite = function(board) { if( board === $_ ) return; {
	easel.display.Group.apply(this,[]);
	this._board = board;
	this._blocks = [];
	board._slots.push($closure(this,"handle"));
}}
tetris.BoardSprite.__name__ = ["tetris","BoardSprite"];
tetris.BoardSprite.__super__ = easel.display.Group;
for(var k in easel.display.Group.prototype ) tetris.BoardSprite.prototype[k] = easel.display.Group.prototype[k];
tetris.BoardSprite.prototype._activePiece = null;
tetris.BoardSprite.prototype._blocks = null;
tetris.BoardSprite.prototype._board = null;
tetris.BoardSprite.prototype.handle = function(event) {
	var $e = (event);
	switch( $e[1] ) {
	case 0:
	var dy = $e[4], dx = $e[3], p = $e[2];
	{
		this._activePiece.setX(20 * p.x);
		this._activePiece.setY(20 * p.y);
	}break;
	case 1:
	var p = $e[2];
	{
		this._activePiece.setX(20 * p.x);
		this._activePiece.setY(20 * p.y);
	}break;
	case 4:
	var p = $e[2];
	{
		this._activePiece = new tetris.PieceSprite(p);
		this.add(this._activePiece);
	}break;
	case 5:
	var rows = $e[2];
	{
		var toRemove = [];
		var explosions = new easel.display.Group();
		rows.push(0);
		var falling = [];
		{
			var _g1 = 0, _g = rows.length - 1;
			while(_g1 < _g) {
				var r = _g1++;
				var row = rows[r];
				var boom = new easel.display.FilledSprite("#ffffff",this._board._width * 20,20);
				boom.setY(row * 20 - 20 / 2);
				boom.setX(-20 / 2);
				explosions.add(boom);
				{
					var _g3 = 0, _g2 = this._board._width;
					while(_g3 < _g2) {
						var col = _g3++;
						var block = this._blocks[row * this._board._width + col];
						if(block != null) {
							toRemove.push(block);
						}
					}
				}
				var ii = row - 1;
				while(ii > rows[r + 1]) {
					{
						var _g3 = 0, _g2 = this._board._width;
						while(_g3 < _g2) {
							var jj = _g3++;
							this._blocks[this._board._width * ((ii + r) + 1) + jj] = this._blocks[this._board._width * ii + jj];
							var block = this._blocks[this._board._width * ii + jj];
							if(block != null) {
								falling.push(new easel.tasks.MoveTo(block,block.x,((ii + r) + 1) * 20,(r + 1) * 0.25,easel.tasks.Tween.QUAD_IN));
							}
						}
					}
					ii -= 1;
				}
			}
		}
		explosions.alpha = 0;
		this.add(explosions);
		var label = new easel.display.TextSprite();
		label.setText(tetris.BoardSprite.ONOMATOPOEIA[Math.floor(Math.random() * tetris.BoardSprite.ONOMATOPOEIA.length)]);
		{
			label.baseline = "top";
			label._isContentsDirty = true;
			"top";
		}
		{
			label.align = "center";
			label._isContentsDirty = true;
			"center";
		}
		{
			label.font = "bold 16px sans-serif";
			label._isContentsDirty = true;
			"bold 16px sans-serif";
		}
		{
			label.fillStyle = "red";
			label._isContentsDirty = true;
			"red";
		}
		label.setX(this._activePiece.x);
		label.setY(this._activePiece.y);
		this.add(label);
		this.addTask(new easel.tasks.Sequence([new easel.tasks.Parallel([new easel.tasks.ScaleTo(label,1.5,1.5,1,easel.tasks.Tween.LINEAR),new easel.tasks.RotateTo(label,(Math.random() - 0.5) * (Math.PI / 4),1,easel.tasks.Tween.LINEAR),new easel.tasks.MoveTo(label,label.x,label.y - 20,1,easel.tasks.Tween.LINEAR)]),new easel.tasks.Function($closure(label,"destroy"))]));
		this.addTask(new easel.tasks.Sequence([new easel.tasks.AlphaTo(explosions,0.8,0.5,easel.tasks.Tween.LINEAR),new easel.tasks.Function(function() {
			{
				var _g = 0;
				while(_g < toRemove.length) {
					var block = toRemove[_g];
					++_g;
					block.destroy();
				}
			}
			explosions.destroy();
		}),new easel.tasks.Parallel(falling)]));
		easel.media.AudioManager.play("static/clear");
	}break;
	case 3:
	var p = $e[2];
	{
		this._activePiece.destroy();
		this.handle(tetris.BoardEvent.NextPiece(p,null));
		{
			var _g = this._activePiece;
			_g.setRotation(_g.rotation - Math.PI / 2);
		}
		this._activePiece.addTask(new easel.tasks.RotateTo(this._activePiece,this._activePiece.rotation + Math.PI / 2,0.1,easel.tasks.Tween.LINEAR));
	}break;
	case 2:
	var p = $e[2];
	{
		var image = tetris.Main.assets.get("blocks.png");
		{
			var _g = 0, _g1 = p.coords;
			while(_g < _g1.length) {
				var coord = _g1[_g];
				++_g;
				var block = new easel.display.ImageSprite(image,7);
				var bx = p.x + coord[0];
				var by = p.y + coord[1];
				this._blocks[by * this._board._width + bx] = block;
				block.setX(bx * 20);
				block.setY(by * 20);
				block.setCenterX(0.5 * 20);
				block.setCenterY(0.5 * 20);
				block.setFrame(p.color);
				this.add(block);
			}
		}
		var sprite = this._activePiece;
		sprite.composite = "xor";
		sprite.alpha = 0.8;
		this.addTask(new easel.tasks.Sequence([new easel.tasks.AlphaTo(sprite,0.1,0.6,easel.tasks.Tween.LINEAR),new easel.tasks.Function($closure(sprite,"destroy"))]));
		this.add(sprite);
	}break;
	default:{
		null;
	}break;
	}
}
tetris.BoardSprite.prototype.__class__ = tetris.BoardSprite;
tetris.PlayingScene = function(p) { if( p === $_ ) return; {
	easel.Scene.apply(this,[]);
	this.onUpdate._slots.push($closure(this,"doUpdate"));
}}
tetris.PlayingScene.__name__ = ["tetris","PlayingScene"];
tetris.PlayingScene.__super__ = easel.Scene;
for(var k in easel.Scene.prototype ) tetris.PlayingScene.prototype[k] = easel.Scene.prototype[k];
tetris.PlayingScene.prototype._board = null;
tetris.PlayingScene.prototype._boardSprite = null;
tetris.PlayingScene.prototype._lastTick = null;
tetris.PlayingScene.prototype._level = null;
tetris.PlayingScene.prototype._preview = null;
tetris.PlayingScene.prototype._score = null;
tetris.PlayingScene.prototype._stepDelay = null;
tetris.PlayingScene.prototype.click = function(event) {
	var x = (event.clientX - this._boardSprite.x) / 20;
	var y = (event.clientY - this._boardSprite.y) / 20;
	if(y < this._board._piece.y) {
		this._board.rotate();
	}
	else if(y > this._board._height - 2) {
		this._board.drop();
	}
	else if(x < this._board._piece.x) {
		this._board.movePiece(-1,0);
	}
	else if(x > this._board._piece.x + 1) {
		this._board.movePiece(1,0);
	}
}
tetris.PlayingScene.prototype.doUpdate = function(elapsed) {
	this._lastTick += elapsed;
	while(this._lastTick > this._stepDelay) {
		this._lastTick -= this._stepDelay;
		this._board.step();
	}
}
tetris.PlayingScene.prototype.handler = function(event) {
	var $e = (event);
	switch( $e[1] ) {
	case 8:
	{
		easel.media.AudioManager.play("static/gameover");
		var score = this._board.score;
		haxe.Log.trace("Finished with score: " + score,{ fileName : "PlayingScene.hx", lineNumber : 112, className : "tetris.PlayingScene", methodName : "handler"});
		this.director.replaceScene(new tetris.GameOverScene());
	}break;
	case 3:
	{
		easel.media.AudioManager.play("static/rotate");
	}break;
	case 2:
	{
		easel.media.AudioManager.play("static/place");
	}break;
	case 4:
	var preview = $e[3];
	{
		if(this._preview != null) {
			this._preview.destroy();
		}
		this._preview = new tetris.PieceSprite(preview);
		this._preview.setX(275);
		this._preview.setY(80);
		this.add(this._preview);
		var circle = new easel.display.CircleSprite(1);
		var p = this._preview;
		{
			p.mask = null;
			p._isContentsDirty = true;
			null;
		}
	}break;
	case 6:
	{
		haxe.Log.trace("score " + this._board.score,{ fileName : "PlayingScene.hx", lineNumber : 156, className : "tetris.PlayingScene", methodName : "handler"});
		this._score.setContent("" + this._board.score);
	}break;
	case 7:
	{
		easel.media.AudioManager.play("static/levelup");
		this._stepDelay = 1000 / this._board.level;
		var sprite = this._level;
		sprite.setText("L" + this._board.level);
		{
			sprite.scaleX = 10;
			sprite._isTransformDirty = true;
			10;
		}
		this.addTask(new easel.tasks.ScaleTo(sprite,1,1,1,easel.tasks.Tween.LINEAR));
	}break;
	default:{
		null;
	}break;
	}
}
tetris.PlayingScene.prototype.keydown = function(event) {
	switch(event.keyCode) {
	case 37:{
		this._board.movePiece(-1,0);
	}break;
	case 39:{
		this._board.movePiece(1,0);
	}break;
	case 38:{
		this._board.rotate();
	}break;
	case 40:{
		this._board.drop();
	}break;
	default:{
		return;
	}break;
	}
	event.preventDefault();
}
tetris.PlayingScene.prototype.load = function() {
	var overlay = js.Lib.document.getElementById("overlay");
	var button = new easel.Div("pause button");
	var self = this;
	button.onClick._slots.push(function(_) {
		self.director.pushScene(new PauseScene());
	});
	this.add(button);
	this._score = new easel.Div("score");
	this.add(this._score);
	this.onKeyDown._slots.push($closure(this,"keydown"));
	this.onClick._slots.push($closure(this,"click"));
	this.add(new easel.display.ImageSprite(tetris.Main.assets.get("chrome.png")));
	this._board = new tetris.Board(10,20);
	this._boardSprite = new tetris.BoardSprite(this._board);
	this._boardSprite.setCenterX(-20 / 2);
	this._boardSprite.setCenterY(-20 / 2);
	this._boardSprite.setX(13);
	this._boardSprite.setY(9);
	this.add(this._boardSprite);
	this._level = new easel.display.TextSprite("0");
	this._level.setFont("bold 48px cursive");
	this._level.setFillStyle("#00c000");
	this._level.setBaseline("middle");
	this._level.setAlign("center");
	this._level.setX(267);
	this._level.setY(365);
	this._level.setRotation(Math.PI / 32);
	this.add(this._level);
	this._board._slots.push($closure(this,"handler"));
	this._board.startGame();
}
tetris.PlayingScene.prototype.__class__ = tetris.PlayingScene;
tetris.GameOverScene = function(p) { if( p === $_ ) return; {
	easel.Scene.apply(this,[]);
}}
tetris.GameOverScene.__name__ = ["tetris","GameOverScene"];
tetris.GameOverScene.__super__ = easel.Scene;
for(var k in easel.Scene.prototype ) tetris.GameOverScene.prototype[k] = easel.Scene.prototype[k];
tetris.GameOverScene.prototype.load = function() {
	this.add(new easel.display.FilledSprite("#ffffff"));
	var label = new easel.display.TextSprite("Game Over");
	{
		label.align = "center";
		label._isContentsDirty = true;
		"center";
	}
	{
		label.baseline = "middle";
		label._isContentsDirty = true;
		"middle";
	}
	{
		label.font = "bold 52px cursive";
		label._isContentsDirty = true;
		"bold 52px cursive";
	}
	{
		label.fillStyle = "black";
		label._isContentsDirty = true;
		"black";
	}
	{
		label.scaleX = 0.01;
		label._isTransformDirty = true;
		0.01;
	}
	{
		label.scaleY = 0.01;
		label._isTransformDirty = true;
		0.01;
	}
	label.setX(this.director.ctx.canvas.width / 2);
	label.setY(this.director.ctx.canvas.height / 2);
	this.add(label);
	var sub = new easel.display.TextSprite("Click to Replay");
	{
		sub.align = "center";
		sub._isContentsDirty = true;
		"center";
	}
	{
		sub.baseline = "middle";
		sub._isContentsDirty = true;
		"middle";
	}
	{
		sub.font = "bold 16px monospace";
		sub._isContentsDirty = true;
		"bold 16px monospace";
	}
	{
		sub.fillStyle = "black";
		sub._isContentsDirty = true;
		"black";
	}
	sub.setX(this.director.ctx.canvas.width / 2);
	sub.setY(this.director.ctx.canvas.height / 2 + 50);
	this.add(sub);
	var chunksX = 5;
	var chunksY = 5;
	var sw = Math.floor(this.director.ctx.canvas.width / chunksX);
	var sh = Math.floor(this.director.ctx.canvas.height / chunksY);
	var source = js.Lib.document.createElement("canvas");
	source.width = this.director.ctx.canvas.width;
	source.height = this.director.ctx.canvas.height;
	source.getContext("2d").drawImage(this.director.ctx.canvas,0,0);
	{
		var _g = 0;
		while(_g < chunksX) {
			var y = _g++;
			{
				var _g1 = 0;
				while(_g1 < chunksY) {
					var x = _g1++;
					var sx = sw * x;
					var sy = sh * y;
					var sprite = new tetris.ParticleSprite(source,sx,sy,sw,sh);
					sprite.setX(sx + sw / 2);
					sprite.setY(sy + sh / 2);
					sprite.setCenterX(sw / 2);
					sprite.setCenterY(sh / 2);
					this.add(sprite);
					this.addTask(new easel.tasks.MoveTo(sprite,sprite.x + 30 * (Math.random() - 0.5),416,2,easel.tasks.Tween.LINEAR));
					this.addTask(new easel.tasks.RotateTo(sprite,(Math.random() * 2) * Math.PI + Math.PI,2,easel.tasks.Tween.LINEAR));
				}
			}
		}
	}
	var self = this;
	this.addTask(new easel.tasks.Sequence([new easel.tasks.Delay(1.5),new easel.tasks.Parallel([new easel.tasks.ScaleTo(label,1,1,1,easel.tasks.Tween.LINEAR),new easel.tasks.RotateTo(label,Math.PI / 10,1,easel.tasks.Tween.LINEAR)])]));
	this.onClick._slots.push(function(_) {
		self.director.replaceScene(new tetris.PlayingScene());
	});
}
tetris.GameOverScene.prototype.__class__ = tetris.GameOverScene;
tetris.ParticleSprite = function(source,sx,sy,sw,sh) { if( source === $_ ) return; {
	easel.display.Sprite.apply(this,[]);
	this._source = source;
	this._sx = sx;
	this._sy = sy;
	this._sw = sw;
	this._sh = sh;
}}
tetris.ParticleSprite.__name__ = ["tetris","ParticleSprite"];
tetris.ParticleSprite.__super__ = easel.display.Sprite;
for(var k in easel.display.Sprite.prototype ) tetris.ParticleSprite.prototype[k] = easel.display.Sprite.prototype[k];
tetris.ParticleSprite.prototype._sh = null;
tetris.ParticleSprite.prototype._source = null;
tetris.ParticleSprite.prototype._sw = null;
tetris.ParticleSprite.prototype._sx = null;
tetris.ParticleSprite.prototype._sy = null;
tetris.ParticleSprite.prototype.draw = function(ctx) {
	ctx.drawImage(this._source,this._sx,this._sy,this._sw,this._sh,0,0,this._sw,this._sh);
}
tetris.ParticleSprite.prototype.packBounds = function(ctx) {
	null;
}
tetris.ParticleSprite.prototype.__class__ = tetris.ParticleSprite;
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
easel.tasks.StyleTo = function(div,prop,from,to,unit,seconds,easing) { if( div === $_ ) return; {
	easel.tasks.Tween.apply(this,[seconds,easing]);
	this._style = (div)._element.style;
	this._prop = prop;
	this._from = from;
	this._to = to;
	this._unit = unit;
}}
easel.tasks.StyleTo.__name__ = ["easel","tasks","StyleTo"];
easel.tasks.StyleTo.__super__ = easel.tasks.Tween;
for(var k in easel.tasks.Tween.prototype ) easel.tasks.StyleTo.prototype[k] = easel.tasks.Tween.prototype[k];
easel.tasks.StyleTo.linear = function(div,prop,from,to,unit,seconds) {
	return new easel.tasks.StyleTo(div,prop,from,to,unit,seconds,easel.tasks.Tween.LINEAR);
}
easel.tasks.StyleTo.prototype._from = null;
easel.tasks.StyleTo.prototype._prop = null;
easel.tasks.StyleTo.prototype._style = null;
easel.tasks.StyleTo.prototype._to = null;
easel.tasks.StyleTo.prototype._unit = null;
easel.tasks.StyleTo.prototype.tick = function() {
	this._style.setProperty(this._prop,this._easing(this._elapsed,this._from,this._to,this._duration) + this._unit,null);
}
easel.tasks.StyleTo.prototype.__class__ = easel.tasks.StyleTo;
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
	catch( $e18 ) {
		{
			var e = $e18;
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
	{ var $it19 = it;
	while( $it19.hasNext() ) { var i = $it19.next();
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
tetris.Piece.presets = [new tetris.Piece(1,[[-1,-1],[-1,0],[0,0],[0,-1]]),new tetris.Piece(6,[[-2,0],[-1,0],[0,0],[1,0]]),new tetris.Piece(2,[[0,-1],[1,-1],[0,0],[-1,0]]),new tetris.Piece(0,[[0,-1],[-1,-1],[0,0],[1,0]]),new tetris.Piece(4,[[-1,-1],[-1,0],[0,0],[1,0]]),new tetris.Piece(3,[[1,-1],[-1,0],[0,0],[1,0]]),new tetris.Piece(5,[[0,-1],[-1,0],[0,0],[1,0]])];
js.Lib.onerror = null;
tetris.BoardSprite.BLOCK_SIZE = 20;
tetris.BoardSprite.ONOMATOPOEIA = ["BAM","BANG","BLOOP","BLURP","BOFF","BONK","CLANK","CLUNK","GLURP","KAPOW","PAM","PLOP","POW","SPLAT","THUNK","WHAP","WHACK","WHAM","ZAM","ZAP","ZLONK"];
$Main.init = tetris.Main.main();
