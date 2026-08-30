import { supabase } from "./supabase.js";

const registerForm = document.querySelector("form");
const message = document.querySelector("#message");

// Handle registration form
registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  try {
    // Register user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      message.textContent = error.message;
      message.className = "error";
      return;
    }

    if (data.user) {
      message.textContent =
        "Registration successful! Check your email to confirm your account.";
      message.className = "success";
    }
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    message.className = "error";
    console.error(error);
  }
});
