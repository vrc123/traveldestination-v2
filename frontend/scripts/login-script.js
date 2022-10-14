// Login
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = {
        userName: document.querySelector("#userNameOrEmail").value,
        email: document.querySelector("#userNameOrEmail").value,
        password: document.querySelector("#password").value,
    }

    const response = await postLoginUserData(user);

    login(response);

    if (response) {
        alert("Login is succesful")
        window.location.replace(
            "http://127.0.0.1:5500/frontend/html/index.html"
        );
    } else {
        alert("ERROR: Something went wrong!")    
    }
/*
    if (response.status === 200) {
        alert("Login is succesful")
        window.location.replace(
            "localhost:3000/onlyauthenticated"
        );
    } else {
        alert("ERROR: Something went wrong!")    
    }
*/
});