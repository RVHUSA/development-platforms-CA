import { supabase } from "./supabase.js";
import { logout } from "./auth.js";

// Check authentication when the page loads (if the user is logged in)
const {
  data: { session },
} = await supabase.auth.getSession();

const articleForm = document.querySelector("#article-form");
const createArticle = document.querySelector("#create-article");
const articlesContainer = document.querySelector("#articles-container");
const message = document.querySelector("#message");
const logoutButton = document.querySelector("#logout-button");
const guestLinks = document.querySelector("#guest-links");
const userLinks = document.querySelector("#user-links");
const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");

// Show or hide elements based on authentication status
if (session) {
  guestLinks.style.display = "none";
  userLinks.style.display = "flex";
  createArticle.style.display = "block";
} else {
  guestLinks.style.display = "flex";
  userLinks.style.display = "none";
  createArticle.style.display = "none";
}

// Toggle mobile navigation
menuButton.addEventListener("click", function () {
  navMenu.classList.toggle("open");

  const isOpen = navMenu.classList.contains("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

// Load articles when the page opens
await loadArticles();

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
        user_id: session.user.id,
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

    // Refresh articles after creating a new one
    await loadArticles();
  } catch (error) {
    message.textContent = "Something went wrong. Please try again.";
    message.className = "error";
    console.error(error);
  }
});

// Load articles from Supabase
async function loadArticles() {
  articlesContainer.innerHTML = "";

  try {
    const { data: articles, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      message.textContent = error.message;
      message.className = "error";
      return;
    }

    if (!articles || articles.length === 0) {
      articlesContainer.textContent = "No articles yet.";
      return;
    }

    articles.forEach((article) => {
      const articleElement = createArticleElement(article);
      articlesContainer.appendChild(articleElement);
    });
  } catch (error) {
    console.error(error);
  }
}

// Create HTML for an article
function createArticleElement(article) {
  const articleElement = document.createElement("article");

  const heading = document.createElement("h3");
  heading.textContent = article.title;

  const body = document.createElement("p");
  body.textContent = article.body;

  const category = document.createElement("p");
  category.textContent = article.category;
  category.classList.add("article-category");

  const date = document.createElement("p");
  date.textContent =
    "Created: " + new Date(article.created_at).toLocaleDateString("en-GB");
  date.classList.add("article-date");

  articleElement.appendChild(heading);
  articleElement.appendChild(body);
  articleElement.appendChild(category);
  articleElement.appendChild(date);

  return articleElement;
}

// Handle logout
if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}
