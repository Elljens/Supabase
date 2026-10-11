import { supabase } from "./supabase.js";
import { checkAuth, logout } from "./auth.js";

checkAuth();

loadNews();

async function loadNews() {
  const newsContainer = document.querySelector("#news-list");
  newsContainer.innerHTML = "";

  try {
    const { data: posts, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      newsContainer.innerHTML = "Something went wrong. Try igain later";
      return;
    }

    if (!posts || posts.length === 0) {
      newsContainer.innerHTML = "No posts found";
      return;
    }

    posts.forEach((post) => {
      const newsElement = document.createElement("div");
      newsElement.classList.add(
        "flex",
        "flex-col",
        "shadow-md",
        "rounded-md",
        "max-w-md",
        "mx-auto"
      );

      const title = document.createElement("h3");
      title.textContent = post.title;
      title.classList.add(
        "bg-blue-900",
        "text-white",
        "font-medium",
        "p-3",
        "rounded-t-md",
        "min-h-18"
      );

      const created = document.createElement("p");
      created.textContent =
        "Created: " + new Date(post.created_at).toLocaleString();
      created.classList.add("text-xs", "px-3", "py-1");

      const body = document.createElement("p");
      body.textContent = post.body;
      body.classList.add("p-3");

      const creator = document.createElement("p");
      creator.textContent = "Writer id: " + post.submitted_by;
      creator.classList.add("text-gray-500", "text-xs", "p-3", "mt-auto");

      newsElement.appendChild(title);
      newsElement.appendChild(created);
      newsElement.appendChild(body);
      newsElement.appendChild(creator);

      newsContainer.appendChild(newsElement);
    });
  } catch (error) {}
}

const createBtn = document.querySelector("#create-link");
const createSection = document.querySelector("#create-section");

createBtn.addEventListener("click", () => {
  createSection.classList.toggle("hidden");

  if (createSection.classList.contains("hidden")) {
    createBtn.innerHTML =
      '<i class="fa-solid fa-square-plus"></i> Create a new post';
  } else {
    createBtn.innerHTML =
      '<i class="fa-solid fa-square-xmark"></i> Close post form';
  }
});

const newsForm = document.querySelector("form");
const formError = document.querySelector("#formError");
const formSuccess = document.querySelector("#formSuccess");

newsForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const title = form.title.value.trim();
  const body = form.content.value.trim();

  try {
    const { error } = await supabase.from("news").insert([{ title, body }]);

    if (error) {
      formSuccess.classList.add("hidden");

      formError.classList.remove("hidden");
      formError.textContent = error.message;
      return;
    }

    formError.classList.add("hidden");

    formSuccess.classList.remove("hidden");
    formSuccess.textContent = "New post created!";
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1000);
  } catch (error) {}
});

const logoutBtn = document.querySelector("#logout-btn");
logoutBtn.addEventListener("click", logout);
