// LOGIN PAGE VARIABLES

let loginPage = document.getElementById("loginPageContainer");

let loginBtn = document.getElementById("loginBtn");

let inputEmail = document.getElementById("emailLogin");
let inputPassword = document.getElementById("passwordLogin");

let loginContainer = document.getElementById("loginInputContainer");



if (localStorage.getItem("user")) {
    //är inloggad
    printLoggedInPage();
} else {
    // är inte inloggad
    printLoginPage();
    
}


function printLoginPage() {
    loginPage.innerHTML = "";

    let loginImg = document.createElement("img");
    loginImg.src = "assets/white-monstera-leaf.jpg";
    loginImg.alt = "White matte monstera leaf on white background";
    loginImg.width = 254;
    loginImg.height = 341;

    let pageTitle = document.createElement("h1");
    pageTitle.innerText = "What's on your mind today?";

    let emailLogin = document.createElement("input");
    emailLogin.placeholder = "Email";

    let passwordLogin = document.createElement("input");
    passwordLogin.placeholder = "Password";
    passwordLogin.type = "password";


    let loginBtn = document.createElement("button");
    loginBtn.innerText = "Login";


    loginBtn.addEventListener("click", () => {
        let loginUser = {userEmail: emailLogin.value, userPassword: passwordLogin.value};
     
        fetch("http://localhost:3000/users/login", {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(loginUser)
        })
        .then(res => res.json())
        .then(data => {
         console.log("hallå", data);
         localStorage.setItem("user", data.user)
        })
     
     })

     loginContainer.append(pageTitle, emailLogin, passwordLogin, loginBtn);

     loginPage.append(loginImg, loginContainer);

}




function printLoggedInPage() {
// print out text editor etc

}
