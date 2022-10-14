// Sign up
const signupForm = document.querySelector("#signupForm");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const user = {
        userName: document.querySelector("#userName").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    };

    if (user.userName !== "") {
        if (user.userName.length >= 8) {
            if (user.email !== "") {
                if (user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
                    if (user.password !== "") {
                        if (user.password.length >= 8) {
                            const response = await postSignupUserData(user);
                            if (response.status === 201) {
                                alert("Sign up is succesful")
                                window.location.replace(
                                    "http://127.0.0.1:5500/frontend/html/login.html"
                                );
                            } else {
                                alert("ERROR: User name, email or both of them is already used!")  
                            }
                        } else {
                            alert("ERROR: Password must be atleast 8 charecters long!")
                        }
                    } else {
                        alert("ERROR: Password is required!")
                    }
                } else {
                    alert("ERROR: Email address is not valid")
                }
            } else {
                alert("ERROR: Email is required!")
            }
        } else {
            alert("ERROR: User name must be atleast 8 charecters long!")
        }   
    } else {
        alert("ERROR: User name is required!")
    }
});