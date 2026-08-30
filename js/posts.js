import { requireAuth, logout } from "./auth.js";

const logoutButton = document.querySelector("#logout-button");

// Check authentication when the page loads
await requireAuth();

// Handle logout
logoutButton.addEventListener("click", logout);
