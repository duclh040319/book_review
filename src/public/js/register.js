const btnSubmit = document.querySelector(".btn");
const form = document.forms["register-form"];
const handleSubmit = (e) => {
  e.preventDefault();
  form.action = "/api/v1/auth/register";
  form.submit();
};
btnSubmit.addEventListener("click", handleSubmit);
