import { supabase } from "./supabase.js";

const LoginForm = document.querySelector("form");
const formError = document.querySelector("#formError");
const formSuccess = document.querySelector("#formSuccess");

LoginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
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
      console.log("User", data.user);
      console.log("Session", data.session);
      formError.classList.add("hidden");

      formSuccess.classList.remove("hidden");
      formSuccess.textContent = "Login successful. Redirecting to homepage";
      setTimeout(() => {
        window.location.href = "./index.html";
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
});
