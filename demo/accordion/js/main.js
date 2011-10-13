// Accordion Example
// Author: Marcos DeSousa
// Version 1.0 alpha

/*
var firstDiv = mds("#accordion .content").elements[0];

var accHeight = mds(firstDiv).getStyle("height");

var newVal;
var change = 200;
var duration = 1600;
var time = 0;

var animation = setInterval(function(){
	time += 30;
	
	if(time >= duration){
		clearInterval(animation);
		return false;
	};//close if statement
	
	newVal = Math.easeOutBack(time, parseFloat(accHeight), change, duration, 1);
	
	firstDiv.style.height = newVal + "px";
	
}, 30)//close set interval function
*/

(function(){
	
	var overlay = document.getElementById("overlay");
	overlay.style.display = "block";
	
	var overLayHeight = parseFloat( mds(overlay).getStyle("height") );
	
	overlay.style.top = -overLayHeight + "px";
	
	mds(overlay).animate({
		props: {top:0}
	});
	
	overlay.onclick = function(){
		mds(overlay).animate({
			props: {top: -overLayHeight}
		});
	};//close over lay click function
	
	/*
	var firstDiv =	document.querySelectorAll(".content")[0];
	firstDiv.style.position = "relative";
	
	var h = parseFloat(mds(firstDiv).getStyle("height"));
	
	mds(firstDiv).animate({
		duration: 1000,
		props: {
			height: 0,
			top: -h
		}
	
	});//close firstDiv animate
	*/
	
	/*
	mds("#accordion .content").animate({
		duration: 2000,
		easing: "easeOutBounce",
		props: {
			height: 200,
			margin: 20,
			padding: 50
		}		
	});//close animate object
	*/


})();//close self executing function