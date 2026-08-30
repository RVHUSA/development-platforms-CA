import { supabase } from "./supabase.js";

const loginForm = document.querySelector("form");
const message = document.querySelector("#message");

// Handle login form
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      message.textContent = error.message;
      message.className = "error";
      return;
    }

    if (data.user) {
      window.location.href = "./index.html";
    }
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    message.className = "error";
    console.error(error);
  }
});
