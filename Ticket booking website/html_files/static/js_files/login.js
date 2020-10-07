function check_details()
{
	 var em=document.getElementById("email").value;
    var password =document.getElementById("pass").value;
	
	//
	
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("POST", "http://localhost:3000/user/login");
		  xmlhttp.onreadystatechange = function() {
		
		//
		if (this.readyState == 4 && this.status == 201) {
		var data= JSON.parse(this.responseText);
		console.log("authSuccess");
		alert(data.message);
		window.open("../views/nowshowing.html","_self");
		
		}
		
		//wrong id pass
		else if (this.readyState == 4 && this.status == 401) {
		var data= JSON.parse(this.responseText);
		alert(data.message);
		console.log("Wrong ID OR PASS");
		}
		
		};
		
		
		
		
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify({email: em, password: password}));
}