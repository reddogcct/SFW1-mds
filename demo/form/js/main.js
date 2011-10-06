// mds JavaScript Library
// Author: Marcos DeSousa
// Version 1.0 alpha

(function(){
	
	/*
	var formFields = document.querySelectorAll("#myform input");
	
	for(var i=0, j=formFields.length; i<j; i++){
		
		formFields[i].style.backgroundColor = "#777777";
		formFields[i].style.color = "#ffffff";
		formFields[i].style.padding = "2px";
		
	};//close for loop
	*/
	
	var formFields = mds("#myform input");
	
	formFields.each(function(){	
		//this.style.backgroundColor = "#777777";
		//this.style.padding = "2px";
		//this.style.color = "#ffffff";
	});//close formFields each function
	
	formFields.css({
		"backgroundColor": "#777777",
		"color": "#ffffff",
		"padding": "4px 2px"
	});
	
	mds("div").addClass("testing");
	

})();//close self run function