// LOGIN PAGE VARIABLES

let loginPage = document.getElementById("loginPageContainer");

let loginBtn = document.getElementById("loginBtn");

let inputEmail = document.getElementById("emailLogin");
let inputPassword = document.getElementById("passwordLogin");

let loginContainer = document.getElementById("loginInputContainer");

// CREATE NEW ACCOUNT VARIABLES

let createUserContainer = document.getElementById("createUserContainer");
let createUserInputs = document.getElementById("createUserInputs");

// LOGGED in view variables




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
         printLoggedInPage();
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
           localStorage.setItem("user", data.user);
           loginPage.innerHTML = "";
           printLoggedInPage();
        })
     
     })

    createUserInputs.append(newUserPageTitle, createName, createEmail, createPassword, createAccountBtn);
    createUserContainer.append(createUserInputs, newUserImg);
   
}


function printLoggedInPage() {
    loginPage.innerHTML = "";
    createUserContainer.innerHTML = "";
    console.log("inloggad sida");

    let logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logout";

    let loggedInView = document.getElementById("loggedInContainer");

    let loggedInViewTitle = document.createElement("h3");
   // loggedInViewTitle.innerText = `What's on your mind today, ${localStorage.getItem("user")} ?`;

    let noteTitle = document.createElement("input");
    noteTitle.placeholder = "Title...";

    let textArea = document.createElement("textarea");
    textArea.id = "noteContent";

    let saveNoteBtn = document.createElement("button");
    saveNoteBtn.innerText = "Save note";
    saveNoteBtn.addEventListener("click", postNewNoteToDatabase);

    loggedInView.append(logoutBtn, loggedInViewTitle, noteTitle, textArea, saveNoteBtn);

    tinymce.init({
        selector: "#noteContent",
        plugins: "image",
        toolbar: "image undo redo forecolor backcolor styleselect bold italic alignleft alignright code",
    
        setup: function(editor) {
            editor.on("change", function() {
                editor.save();
            })
        }
    })

    let uuid = localStorage.getItem("user");

    fetch(`http://localhost:3000/users/${uuid}`) 
    .then(res => res.json()) // Corrected syntax
    .then(data => {
        const userName = data.userName;
        loggedInViewTitle.innerText = `What's on your mind today, ${userName}?`;
    })
    

}



function postNewNoteToDatabase() {
console.log("hej hej här är din nya note i databasen");

let newNote = {
    noteTitle: noteTitle.value,
    noteText: textArea.value,
}


fetch("http://localhost:3000/notes/add", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newNote)
})
.then(res => res.json())
    .then(data => {
        if (noteTitle.value.trim() === '' || textArea.value.trim() === '') {
            // Display an error message or take appropriate action
            console.log("Please type new note");
            return; // Exit the function early
        }
        console.log("Is this new note added?", data);
    })


}




