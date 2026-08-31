import { supabase } from "./supabase.js";
import { requireAuth, logout } from "./auth.js";

// Check authentication when the page loads (if the user is logged in)
const session = await requireAuth();
const userId = session.user.id;

const articleForm = document.querySelector("#article-form");
const articlesContainer = document.querySelector("#articles-container");
const message = document.querySelector("#message");
const logoutButton = document.querySelector("#logout-button");

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

  articleElement.appendChild(heading);
  articleElement.appendChild(body);
  articleElement.appendChild(category);

  return articleElement;
}

// Handle logout
logoutButton.addEventListener("click", logout);
