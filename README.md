# Fullstack Simple CRUD

Simple CRUD application with login/logout authentication, user profiles, and JSONPlaceholder API integration.

## Features

1. Auth System
  - Login & logout (use cookies to store tokens).
  - Automatically redirect to the login page if you don't have a token.

2. Dashboard
  - Displays a list of posts.
  - Post details based on ID (dynamic routing).
  - Access the details page using the URL /dashboard/[id].

3. CRUD Post
  - Retrieve post data from the API (/lib/api.ts).
  - Can create, view details, update, and delete posts.

4. UI/UX
  - Styling uses Tailwind CSS.
  - Reusable components (e.g., cards).
  - Clean structure with src/app (App Router)

## Tech Stack

`Frontend & Server` → Next.js 15 (App Router)

`Styling` → Tailwind CSS + Headless UI

`State & Hooks` → React (useState, useEffect, user context)

`Deployment` → Vercel (default + free custom domain)

## Prerequisites

Before getting started, ensure you have the following prerequisites:

- Node.js 14 or higher
- npm or yarn package manager

## Getting Started

- Install the dependencies:

```bash
  pnpm install
```

- Run the development server:

```bash
  pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.