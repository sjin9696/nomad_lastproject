const loginForm = document.querySelector("#login-form");
const greeting = document.querySelector("#greeting");
const logoutButton = document.querySelector("#logout-button");
const loginButton = document.querySelector("#login-button");

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginForm.querySelector("input").value;
    localStorage.setItem("username", username);
    greeting.innerText = `${username}님, 환영합니다!`;
    greeting.classList.remove("hidden");
    loginForm.style.display = "none";
    loginForm.querySelector("button").style.display = "none";
    logoutButton.style.display = "block";
}

function onLogout() {
    localStorage.removeItem("username");
    greeting.innerText = "";
    greeting.classList.add("hidden");
    loginForm.style.display = "block";
    loginForm.querySelector("button").style.display = "block";
    logoutButton.style.display = "none";
}

window.onload = function() {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        greeting.innerText = `${savedUsername}님, 환영합니다!`;
        greeting.classList.remove("hidden");
        loginForm.style.display = "none";
        loginForm.querySelector("button").style.display = "none";
        logoutButton.style.display = "block";
    } else {
        logoutButton.style.display = "none";
    }
};

loginButton.addEventListener("click", onLoginSubmit);
logoutButton.addEventListener("click", onLogout);
