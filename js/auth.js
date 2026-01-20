// write login validation here
var name
var email
var password
var confirmpassword

let users = JSON.parse(localStorage.getItem("users")) || [];



function login(){
    let isexist=0
    email=document.getElementById("email").value.trim()
        password=document.getElementById("password").value 
        if(validateemail()&&loginpassword())
{
    let getpass=hashPassword(password)
    for(let i=0;i<users.length;i++){
        if(users[i].email===email)
        {    
        isexist=1
        if(getpass==users[i].password)
            isexist=2
        else{
       break
        }}
    }
    if(isexist==1)
        alert("wrong password")
    else if(isexist==2)
    alert("login successfuly")
else if(isexist==0)
alert("account not found ")

}

}

function loginpassword(){
    let passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
if(!passwordregex.test(password))
{
  alert("Password must be 8+ characters, include uppercase, lowercase, and a number");
  return false
}
return true
}



// and write signup validation here


function validatename(){

     let username=document.getElementById("username")  

     name=username.value.trim()
    let nameregex=/^[A-Za-z\s]+$/
    
    if(name.length<3)
     {   
    alert("Username must be at least 3 characters");
    return false
    }
    else if(!nameregex.test(name)){
    alert("Name must contain letters only");
    return false
    }
return true
    
}

function validateemail(){
     email=document.getElementById("email").value.trim()

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
if(!gmailRegex.test(email))
{
    alert("not valid email")
    return false
}
return true

}

function validatepassword(e){
     password=document.getElementById("password").value 
  confirmpassword=document.getElementById("confirmpassword").value

 let passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

 if(password==""||confirmpassword==""||password!==confirmpassword 
    ||!passwordregex.test(password)||!passwordregex.test(confirmpassword))
{
    alert("Password must be 8+ characters, include uppercase, lowercase, and a number");
    return false
}
return true
}

function hashPassword(password) {
    return CryptoJS.SHA256(password).toString();
}

function signup(){


if(validatename()&& validateemail()&&validatepassword())
 {
    let flag=0
    for(let i=0;i<users.length;i++){
        if(users[i].email===email)
        {    alert("email already exist")
        flag=1;
        break;
        }
    }
    if(!flag){
    let obj={
        name:name,
        password:hashPassword(password),
        email:email,
    }
    users.push(obj)
    localStorage.setItem("users",JSON.stringify(users))
    console.log(users)
 }}
}