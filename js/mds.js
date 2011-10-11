// mds JavaScript Library
// Author: Marcos DeSousa
// Version 1.0 alpha

var mds = function(selector){
	return new mds.prototype.init(selector);
};

mds.prototype = {

	init: function(selector){
		// init the library
		if(typeof selector === "string"){
			this.elements = document.querySelectorAll(selector);
		}else if(selector.nodeType){
			this.elements = [selector];
		};

	},

	elements: [],

	each: function(fn){
		for(var i=0, j=this.elements.length; i<j; i++){
			fn.call(this.elements[i]);
		};
		return this;
	},

	css: function(props){
		for(var prop in props){
			this.each(function(){
				this.style[prop] = props[prop];
			});
		};
		return this;
	},

	hasClass: function(name){
		var hasit = false;
		this.each(function(){
			var pattern = new RegExp("(^| )" + name + "( |$)");  
			if( pattern.test(this.className) ){
				hasit = true;
			};  
		});
		return hasit;
	},

	addClass: function(name){
		this.each(function(){
			if( !mds(this).hasClass(name) ){
				this.className += " " + name;
			};
		});
		return this;
	},

	removeClass: function(name){
		this.each(function(){
			var pattern = new RegExp("(^| )" + name + "( |$)");
			this.className = this.className.replace(pattern, "$1").replace(/ $/, "");   
		});
		return this;
	},

	getStyle: function(prop){
		var elem  = this.elements[0];

		if( elem.style[prop] ){
			return elem.style[prop];
		}else if( elem.currentStyle ){
			return elem.currentStyle[prop];
		}else{
			prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
			return document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop); 
		};
	},

	hide: function(){
		this.each(function(){
			this.style.display = "none";
		});
		return this;
	},

	show: function(){
		this.each(function(){
			this.style.display = "";
		});
		return this;
	},

	// mds("thing").elements[0].onclick = function(){}
	// mds("thing").on("keyup", function(){})

	on: function(evt, handler){
		this.each(function(){
			this["on" + evt] = handler;
		});
		return this;
	}

};

// library utility functions (non-DOM)

/*
	mds.ajax({
		url: "xhr/file.php",
		type: "GET",
		success: function(response){},
		error: function(response){},
		timeout: 8000
	});
	
	mds.ajax({
		url: "xhr/file.php",
		success: function(response){}
	});
	
	LECTURE RESUMES AT 4:45pm
	=====================================
*/
mds.ajax = function(options){

	options = {
		url: options.url || "",
		type: options.type || "GET",
		timeout: options.timeout || 8000,
		success: options.success || function(){},
		error: options.error || function(){},
		data: options.data || {}
	};

	setTimeout(function(){
		if(xhr){
			xhr.abort();
		}
	}, options.timeout);

	var checkHttp = function(){
		try{
			return !xhr.status && location.protocol === "file:" ||
				( xhr.status >= 200 && xhr.status < 300 ) ||
				xhr.status === 304 ||
				navigator.userAgent.indexOf("Safari") >= 0 && xhr.status === "undefined"
			;
		}catch(err){};

		return false;
	};

	var parseData = function(){

		var ct = xhr.getResponseHeader("content-type");
		var isxml = ct && ct.indexOf("xml") >= 0;
		return isxml ? xhr.responseXML : xhr.responseText;

	};

	var serialize = function(){
		var ser = [];
		for(var key in options.data){
			ser.push( key + "=" + encodeURIComponent(options.data[key]) );
		};
		return "?" + ser.join("&");
	};

	var xhr = new XMLHttpRequest();

	xhr.open(options.type, options.url + serialize(), true);

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){

			var valid = checkHttp();

			if(valid){
				// success
				var response = parseData();
				options.success( response );
			}else{
				// fail
				options.error(xhr);
			};

			xhr = undefined;
		};
	};

	xhr.send(null);

};



mds.prototype.init.prototype = mds.prototype;

// end of library