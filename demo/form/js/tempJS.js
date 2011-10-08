// Temporary JavaScript File for Portal Register Page
// Author: Marcos DeSousa
// Version 1.0 alpha

(function(){
	
	var validationSet = {
		email: {
			test: function(elem){
				var pattern = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
				
				return pattern.test(elem.value);
			},//close email test function
			
			message: "Invalid email address";
		},//close email object
		
		reemail: {
			test: function(elem){
				var original = mds("#myform .email")[0];
				var match = elem.value === original.value;
				return match;
				
			},//close re type email test function
			
			message: "Email must match";
		},//close re type email object
		
		phone: {
			test: function(elem){
				var pattern = /^[2-9]\d{2}-\d{3}-\d{4}$/;
				
				return pattern.test(elem.value);
			},//close phone test function
			
			message: "Invalid phone number";
		},//close phone object
		
		text: {
			test: function(elem){
				var pattern = /^[a-zA-Z0-9]+(([\'\,\.\-][a-zA-Z ])?[a-zA-Z ]*)*$/;
				
				return pattern.test(elem.value);
			},//close text test function
			
			message: "Please input letters only";
		},//close text object
		
		password: {
			test: function(elem){
				var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
				
				return pattern.test(elem.value);
			},//close password test function
			
			message: "Password must be 6 and 15 characters,and include at least one lowercase, uppercase, number.";
		},//close password object
		
		repassword: {
			test: function(elem){
				var original = mds("#myform .password")[0];
				var match = elem.value === original.value;
				return match;
				
			},//close re type password test function
			
			message: "Password must match";
		},//close re type password object
		
		website: {
			test: function(elem){
				var pattern = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/;
				
				return pattern.test(elem.value);
			},//close test function
			
			message: "Invalid website address";
		},//close website object
		
		username:{
			test: function(elem){
				var pattern = /^[a-zA-Z0-9]+(([\'\,\.\-][a-zA-Z])?[a-zA-Z]*)*$/;
				
				return pattern.test(elem.value);
			},//close test function
			
			message: "Invalid username user letters and numbers only";
		}//close username object
		
	};//close validation set
	
	var regFields = mds("#myform input");
	
	regFields.each(function(){
		this.onkeyup = function(){
			for(var key in validationSet){
				if ( mds(this).hassClass() ){
					if( validationSet[key].test(this) ){
						console.log("success");
					}else{
						console.log("no match");
						var errorID = this.id + “-error”;
						
						mds(errorID)[0].innerHTML = validationSet[key].message;
					};//close if statement
				};//close if statement
			};//close for loop
		};//close on key up function
	});//close reg fields each function

})();//close self run function