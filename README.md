# Development Platforms CA - Drafted

Drafted is a simple article-sharing website. Users can register and log in using Supabase authentication, create articles, and view published articles.

## Built With

- HTML
- CSS
- JavaScript
- Supabase

## Features

- User registration with email confirmation
- User login and logout
- Article creation for authenticated users
- Display of published articles
- Supabase database integration
- Row Level Security (RLS)
- Responsive design

## Installation

Clone the repository:

```bash
git clone https://github.com/RVHUSA/development-platforms-CA.git
```

Open the project folder in VS Code.


## Supabase Configuration

The project uses Supabase for authentication and database storage.

The Supabase client is configured in `js/supabase.js` using the project URL and publishable key.

The project uses the following Supabase tables:

- `articles`
- `profiles`

Row Level Security (RLS) policies are used to control access to the database.

## Running the Project

The project can be run locally using Live Server in VS Code.

1. Open the project in VS Code.
2. Open `index.html`.
3. Start Live Server.
4. The website will open in your browser.

## AI Usage

AI tools were used during the development of this project. See `AI_LOG.md` for documentation of AI assistance.
