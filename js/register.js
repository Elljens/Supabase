import { supabase } from "./supabase.js";

const registerForm = document.querySelector("form");
const formError = document.querySelector("#formError");
const formSuccess = document.querySelector("#formSuccess");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      formSuccess.classList.add("hidden");

      formError.classList.remove("hidden");
      formError.textContent = error.message;
      return;
    }

    if (data.user) {
      formError.classList.add("hidden");

      formSuccess.classList.remove("hidden");
      formSuccess.textContent =
        "Registration successful. Please check your email to verify your account";
    }
  } catch (error) {
    console.log(error);
  }
});
