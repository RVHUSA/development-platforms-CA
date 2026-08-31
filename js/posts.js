import { supabase } from "./supabase.js";
import { requireAuth, logout } from "./auth.js";

// Check authentication when the page loads (if the user is logged in)
const session = await requireAuth();
const userId = session.user.id;

const articleForm = document.querySelector("#article-form");
const message = document.querySelector("#message");
const logoutButton = document.querySelector("#logout-button");

// Create a new article
articleForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const title = form.title.value.trim();
  const body = form.body.value.trim();
  const category = form.category.value.trim();

  try {
    const { error } = await supabase.from("articles").insert([
      {
        title,
        body,
        category,
        user_id: userId,
      },
    ]);

    if (error) {
      message.textContent = error.message;
      message.className = "error";
      return;
    }

    message.textContent = "Article published successfully.";
    message.className = "success";

    form.reset();
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    message.className = "error";
    console.error(error);
  }
});

// Handle logout
logoutButton.addEventListener("click", logout);
