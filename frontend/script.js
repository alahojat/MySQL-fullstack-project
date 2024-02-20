// LOGIN PAGE VARIABLES

let loginPage = document.getElementById("loginPageContainer");

let loginBtn = document.getElementById("loginBtn");

let inputEmail = document.getElementById("emailLogin");
let inputPassword = document.getElementById("passwordLogin");

let loginContainer = document.getElementById("loginInputContainer");

// CREATE NEW ACCOUNT VARIABLES

let createUserContainer = document.getElementById("createUserContainer");
let createUserInputs = document.getElementById("createUserInputs");

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

    let createNewUserBtn = document.createElement("button");
    createNewUserBtn.innerText = "Create account";
    createNewUserBtn.addEventListener("click", printNewUserPage);



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
            if (emailLogin.value.trim() === '' || passwordLogin.value.trim() === '') {
                // Display an error message or take appropriate action
                console.log("Please fill out all fields!");
                return; // Exit the function early
            }
         console.log("hallå", data);
         localStorage.setItem("user", data.user)
         loginPage.innerHTML = "";
        })
     
     })

     loginContainer.append(pageTitle, emailLogin, passwordLogin, loginBtn, createNewUserBtn);

     loginPage.append(loginImg, loginContainer);
   
}

function printNewUserPage() {
    loginPage.innerHTML = "";
        
    let newUserImg = document.createElement("img");
    newUserImg.src = "assets/silver-monstera-leaf.jpg";
    newUserImg.alt = "Silver monstera leaf against white background";
    newUserImg.width = 254;
    newUserImg.height = 341;

    let newUserPageTitle = document.createElement("h1");
    newUserPageTitle.innerText = "Create an account";

    let createName = document.createElement("input");
    createName.placeholder = "Name";

    let createEmail  = document.createElement("input");
    createEmail.placeholder = "Email";

    let createPassword = document.createElement("input");
    createPassword.placeholder = "Password";
    createPassword.type = "password";

    let createAccountBtn = document.createElement("button");
    createAccountBtn.innerText = "Create account";

    

    createAccountBtn.addEventListener("click", () => {
        let newUser = {userName: createName.value, userEmail: createEmail.value, userPassword: createPassword.value};
     
        fetch("http://localhost:3000/users/add", {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if (createName.value.trim() === '' || createEmail.value.trim() === '' || createPassword.value.trim() === '') {
                // Display an error message or take appropriate action
                console.log("Please fill out all fields!");
                return; // Exit the function early
            }
           localStorage.setItem("user", data.user)
        })
     
     })

    createUserInputs.append(newUserPageTitle, createName, createEmail, createPassword, createAccountBtn);
    createUserContainer.append(createUserInputs, newUserImg);
   
}


function printLoggedInPage() {
    loginPage.innerHTML = "";
    createUserContainer.innerHTML = "";
    console.log("inloggad sida");
    
}
