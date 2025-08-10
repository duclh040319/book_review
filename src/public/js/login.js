const btn = document.querySelector(".btn");
const form = document.forms["login-form"];

const handleLogin = (e) => {
  e.preventDefault();
  form.action = "/api/v1/auth/login";
  form.submit();
};

btn.addEventListener("click", handleLogin);
