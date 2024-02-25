// GLOBAL LOGIN PAGE VARIABLES
let loginPage = document.getElementById("loginPageContainer");
let loginBtn = document.getElementById("loginBtn");
let inputEmail = document.getElementById("emailLogin");
let inputPassword = document.getElementById("passwordLogin");
let loginContainer = document.getElementById("loginInputContainer");

// GLOBAL CREATE NEW ACCOUNT VARIABLES
let createUserContainer = document.getElementById("createUserContainer");
let createUserInputs = document.getElementById("createUserInputs");

// GLOBAL LOGGED IN VIEW VARIABLES
let loggedInViewContainer = document.getElementById("loggedInContainer");
let noteContainer = document.getElementById("noteContentContainer");

// check state of logged in user
if (localStorage.getItem("user")) {
    //är inloggad
    printLoggedInPage();  
} else {
    printLoginPage();
}


// print out loginpage
function printLoginPage() {
    loginPage.innerHTML = "";
   
    let loginImg = document.createElement("img");
    loginImg.src = "assets/white-monstera-leaf-2.jpg";
    loginImg.alt = "White matte monstera leaf on white background";

    let pageTitle = document.createElement("h1");
    pageTitle.innerText = "What's on your mind today?";

    let emailLogin = document.createElement("input");
    emailLogin.placeholder = "Email";

    let passwordLogin = document.createElement("input");
    passwordLogin.placeholder = "Password";
    passwordLogin.type = "password";

    let loginBtn = document.createElement("button");
    loginBtn.innerText = "Login";
    loginBtn.classList.add("primaryBtn");

    let createNewUserBtn = document.createElement("button");
    createNewUserBtn.innerText = "Create account";
    createNewUserBtn.classList.add("secondaryBtn");
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

// print out create new user page
function printNewUserPage() {
    loginPage.innerHTML = "";
        
    let newUserImg = document.createElement("img");
    newUserImg.src = "assets/silver-monstera-leaf.jpg";
    newUserImg.alt = "Silver monstera leaf against white background";
   
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
    createAccountBtn.classList.add("createAccountBtn");
    createAccountBtn.innerText = "Create account";

    createAccountBtn.addEventListener("click", () => {
        if (createName.value.trim() === '' || createEmail.value.trim() === '' || createPassword.value.trim() === '') {
            console.log("Please fill out all fields!");
            return; 
        }
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
            
           localStorage.setItem("user", data.user);
           loginPage.innerHTML = "";
           printLoggedInPage();
        })
     })

    createUserInputs.append(newUserPageTitle, createName, createEmail, createPassword, createAccountBtn);
    createUserContainer.append(createUserInputs, newUserImg);
}

// print out logged in view
function printLoggedInPage() {
    loginPage.innerHTML = "";
    createUserContainer.innerHTML = "";
    console.log("inloggad sida");

    let logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Logout";
    logoutBtn.classList.add("logoutBtn")
    logoutBtn.addEventListener("click", logoutUser);

    let loggedInView = document.getElementById("loggedInContainer");

    let loggedInViewTitle = document.createElement("h3");

    let noteTitle = document.createElement("input");
    noteTitle.placeholder = "Title...";

    let textArea = document.createElement("textarea");
    textArea.id = "noteContent";

    let saveNoteBtn = document.createElement("button");
    saveNoteBtn.innerText = "Save note";
    saveNoteBtn.classList.add("saveNoteBtn");
    saveNoteBtn.addEventListener("click", function() {
        postNewNoteToDatabase(noteTitle, textArea);});

    loggedInView.append(logoutBtn, loggedInViewTitle, noteTitle, textArea, saveNoteBtn);
   
    let uuid = localStorage.getItem("user");

    fetch(`http://localhost:3000/users/${uuid}`) 
    .then(res => res.json()) // Corrected syntax
    .then(data => {
        const userName = data.userName;
        loggedInViewTitle.innerText = `What's on your mind today, ${userName}?`;
        console.log(userName);
    })

    tinymce.init({
        selector: "#noteContent",
        height: 200,
        statusbar: false,
        menubar: false,
        toolbar: "undo redo forecolor backcolor styleselect bold italic alignleft alignright code",
    
        setup: function(editor) {
            editor.on("change", function() {
                editor.save();
            })
        }
    })
    printAllNotesForUser(); 
}

// print out all notes for logged in user
function printAllNotesForUser() {
    noteContainer.innerHTML = "";
    let userId = localStorage.getItem("user");

    fetch(`http://localhost:3000/notes/${userId}`)
    .then(res => res.json())
    .then(data => {
        console.log("All notes", data);
        data.map(note => {
            let li = document.createElement("li");
            li.classList.add("noteStyling");

            let noteTitle = document.createElement("h4");
            noteTitle.innerText = note.title;

            let text = document.createElement("p");
            text.innerHTML = note.noteText;
            text.classList.add("note-text"); 

            let editSingleNote = document.createElement("button");
            editSingleNote.innerText = "Edit";
            editSingleNote.addEventListener("click", function() {
                editNoteText(noteTitle, text, note.uuid);
            });

            let deleteSingleNoteBtn = document.createElement("button");
            deleteSingleNoteBtn.innerText = "Delete";
            deleteSingleNoteBtn.classList.add("deleteNoteBtn");
            deleteSingleNoteBtn.addEventListener("click", function() {
                deleteSingleNote(note.uuid);
            });

            li.append(noteTitle, text, editSingleNote, deleteSingleNoteBtn);
            noteContainer.append(li);
        });
    })
    .catch(error => {
        console.error("Error fetching notes:", error);
    });
}

// function to write new post
function postNewNoteToDatabase(noteTitle, textArea) {
    let userId = localStorage.getItem("user");
    
    let newNote = {
        uuid: userId,
        title: noteTitle.value,
        noteText: textArea.value
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
            console.log("Please type new note");
            return; 
        }
        console.log("Is this new note added?", data);
        noteTitle.value = "";
        tinymce.get("noteContent").setContent("");                     
    })
    printAllNotesForUser();
}

// function to delete single note
function deleteSingleNote(uuid) {
    fetch("http://localhost:3000/notes/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uuid: uuid })
       })
       .then(res => res.json())
       .then(data => {
           console.log("the single note deleted", data);   
           printAllNotesForUser();       
       })
         
}

// function to edit existing note
function editNoteText(noteTitle, text, uuid) {
    const currentText = text.innerHTML; 
    const textarea = document.createElement("textarea");
    textarea.innerHTML = currentText; 
    
    text.replaceWith(textarea);

    tinymce.init({
        selector: `textarea`,
        statusbar: false,
        menubar: false,
        toolbar: "undo redo forecolor backcolor styleselect bold italic alignleft alignright code",
        setup: function(editor) {
            editor.on("change", function() {
                editor.save();
            });
        }
    });

    const editButton = textarea.nextElementSibling; 
    if (editButton) {
        editButton.innerText = "Save";
        editButton.addEventListener("click", function() {
            saveNoteText(noteTitle, textarea, text, uuid);
        });
    } 
}

// function to save edited note
function saveNoteText(noteTitle, textarea, text, uuid) {
    const updatedText = tinymce.get(textarea.id).getContent();

    fetch(`http://localhost:3000/notes/edit/${uuid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ noteTitle: noteTitle, noteText: updatedText })
    })
    .then(res => res.json())
    .then(data => {
        text.innerHTML = updatedText;
        textarea.replaceWith(text);
        tinymce.get(textarea.id).remove();
        const editButton = text.nextElementSibling;
        editButton.innerText = "Edit";
        editButton.onclick = function() {
            editNoteText(noteTitle, text, uuid); 
        };
    })
    .catch(error => {
        console.error("Error updating note:", error);
    });
}

// function for logout button
function logoutUser() {
    console.log("User is logged out");
    localStorage.removeItem("user");
    loggedInViewContainer.innerHTML = "";
    loginContainer.innerHTML = "";
    noteContainer.innerHTML = "";
    printLoginPage();   
}




