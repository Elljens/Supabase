import { supabase } from "./supabase.js";

const unloggedMenu = document.querySelector("#nav1");
const loggedinMenu = document.querySelector("#nav2");
const createLink = document.querySelector("#create-link");

export async function checkAuth() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    loggedinMenu.classList.add("hidden");
    unloggedMenu.classList.remove("hidden");
    createLink.classList.add("hidden");
  } else {
    loggedinMenu.classList.remove("hidden");
    unloggedMenu.classList.add("hidden");
    createLink.classList.remove("hidden");
  }
  console.log("user", user);
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("Error logging out:", error);
  }
  alert("You are logged out");

  window.location.href = "index.html";
}
