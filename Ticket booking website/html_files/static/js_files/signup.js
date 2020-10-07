
function signup()
{
    var em=document.getElementById("email").value;
    var password =document.getElementById("password").value;
    /*let data={
        email : em,
        password:password
    }
    const url="http://localhost:3000/user/signup";
    fetch(url,{
        method: "POST",
        body : JSON.stringify(data)

        }).then(res=>{
            console.log("Request complete ! response :" +res);
        });
		*/
		
		var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
		xmlhttp.open("POST", "http://localhost:3000/user/signup");
		  xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 201) {
		var data= JSON.parse(this.responseText);
		alert(data.message);
		}
		};
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(JSON.stringify({email: em, password: password}));

}
function validatePasswords()
{
    var pass =document.getElementById("password").value;
    var c_pass =document.getElementById("c_password").value;
    if(pass===c_pass)
    {
        console.log("same password");
        signup();
      //window.open("user.html","_self");
    }
    else{
        alert("Enter same password");

    }
  
}
