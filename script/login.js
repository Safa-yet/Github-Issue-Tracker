let loginBtn = document.getElementById("loginBtn");
let sAlert = document.getElementById("successAlert");

let modal = document.getElementById("my_modal_1");

loginBtn.addEventListener("click", () => {
  let password = document.getElementById("passwordInput").value;
  let user = document.getElementById("userInput").value;

  console.log(user);
  console.log(password);
  if (user === "admin" && password === "admin123") {
    window.location.assign("./home.html");
    sAlert.classList.remove("hidden");
  } else {
    modal.showModal();
  }
});
