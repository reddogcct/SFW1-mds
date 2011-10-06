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

mds.prototype.init.prototype = mds.prototype;