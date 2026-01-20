// write login validation here


alert("s")

// and write signup validation here
function signup(){

 let isvalid=true
 let username=document.getElementById("username")  
 let emai=document.getElementById("email")  
 let password=document.getElementById("password")  
 let confirmpassword=document.getElementById("confirmpassword")  

 let name=username.value.trim()
let nameregex=/^[A-Za-z]+$/

if(name.length<3)
 {   isvalid=false;
showError(username, "Username must be at least 3 characters");
}
else if(!nameregex.test(name))
    isvalid=false


}