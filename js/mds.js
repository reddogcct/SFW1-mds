// mds JavaScript Library
// Author: Marcos DeSousa
// Version 1.0 alpha

var mds = function(selector){
	return new mds.prototype.init(selector);
};//close mds function

mds.prototype = {

	init: function(selector){
		//init the library
		if(typeof selector === "string"){
			this.elements = document.querySelectorAll(selector);
		}else if(selector.nodeType){
			this.elements = [selector];
		};//close if statement typeof
	},//close init function
	
	elements: [],
	
	each: function(fn){
		for(var i=0, j=this.elements.length; i<j; i++){
			//this method calls our function but it changes the this. of the function to this.elements[i];
			fn.call(this.elements[i]);
		};//close for loop
		
		return this;
	},//close each function
	
	css: function(props){
		for(var prop in props){
			this.each(function(){
				this.style[prop] = props[prop];
			});//close this.each function
		};//close for loop
	},//close css function
	
	hasClass: function(name){
		var hasit = false;
		
		this.each(function(){
			var pattern = new RegExp("(^| )" + name + "( |$)");
			if( pattern.test(this.className) ){
				hasit = true;
			};//close if statement
		});//close each function
		
		return hasit;
	},//close has class function
	
	addClass: function(name){
		this.each(function(){
			if( !mds(this).hasClass(name) ){
				this.className += " "+ name;
			};//close if !mds(this) statement
		});//close each function
	},//close add class function
	
	removeClass: function(name){
		this.each(function(){
			var pattern = new RegExp("(^| )" + name + "( |$)");
			this.className = this.className.replace(pattern , "$1").replace(/ $/ , "");
		});//close each function
	}//close remove class function
	
};//close mds prototype


/* --------------------- START LIBRARY UTILITIES FUNCTIONS ------------------- */


/*
	mds.ajax({
		url: "xhr/file.php",
		type: "GET",
		success: function(response){},
		error: function(response){},
		timeout: 800
	});//close mds ajax object
*/
mds.ajax = function(options){

	options = {
		url: options.url || "",
		type: options.type || "GET",
		timeout: options.timeout || 8000,
		success: options.success || function(){},
		error: options.error || function(){}
	};//close options object
	
	setTimeout(function(){
		if(xhr){
			xhr.abort();
		};//close if statement
	}, options.timeout);//close set timeout function
	
	var checkHttp = function(){
		try{
			return 	!xhr.status && location.protocol === "file:" || 
					( xhr.status >= 200 && xhr.status <= 300 ) ||
					xhr.status === 304 ||
					navigator.userAgent.indexOf("Safari") >= 0 && xhr.status === "undefined"
			;//close return statement
		}catch(err){ };
		
		return false;
	};//close check HTTP function
		
	var parseData = function(){
		var ct = xhr.getResponseHeader("content-type");
		var isxml = ct && ct.indexOf("xml") >= 0;
		
		//if true return xhr.responseXMl if its false return xhr.responseTextx
		return isxml ? xhr.responseXML : xhr.responseText;
	};//close parse data function
	
	var serialize = function(){
		
	};//close serialize function
		
	var xhr = new XMLHttpRequest();
	xhr.open(options.type, options.url, true);
	
	xhr.onreadystatechange = function(){
		if ( xhr.readyState === 4){
			var valid = checkHttp();
			
			if ( valid ){
				//success
				var response = parseData();
				options.success( response );
			}else{
				//error
				options.error(xhr);
			};//close if/else statement
			
			xhr = undefined;//destroy xhr so that it prevents memory leak
		};//close if statement
	};//close on ready state change function
	
	//all browsers request undefined to be sent, and only firefox requires null. Since null is undefined in JS then we can use null, which is undefined also
	xhr.send(null);

};//close mds ajax function





/* --------------------- END LIBRARY UTILITIES FUNCTIONS ------------------- */


mds.prototype.init.prototype = mds.prototype;




















