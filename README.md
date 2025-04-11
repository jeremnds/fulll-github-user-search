# GitHub User Search App

🔗 [Live Demo](https://fulll-github-user-search.vercel.app)

Built as part of a frontend technical test for [Fulll](https://github.com/fulll).  
The goal was to create a GitHub user search interface based on this [technical challenge](https://github.com/fulll/hiring/blob/master/Frontend/github-user-search-intermediaire-senior.md).

Users can search GitHub profiles and manage them locally (select, duplicate, delete).

## Features

- GitHub user search via public API
- Debounced input
- Select, duplicate, delete users
- Edit mode toggle

## Tech Stack

- React (Vite)
- TypeScript
- React Context API
- React Testing Library
- Vitest

## Project Structure

The project follows a lightweight feature-based structure, inspired by [Bulletproof React](https://github.com/alan2207/bulletproof-react), adapted to the small scope of the test.

Each feature (like `search`, `toolbar`, or `users`) contains its own components, styles, and tests. This helps keep the code **modular**, **readable**, and **scalable**.

```
src/
├── app/                    # App root (main entry point)
├── components/             # Reusable UI elements
├── contexts/               # Global state with UsersContext
├── features/               # Feature-based logic
│   ├── search/             # Search input component
│   ├── toolbar/            # Toolbar actions & edit mode
│   └── users/              # User card & user list
├── hooks/                  # Custom hooks (e.g., useUsers, useDebounce)
├── tests/                  # Test setup and mocks
├── types/                  # Shared TypeScript types
├── utils/                  # Utility functions
```

This approach improves **separation of concerns**, avoids **prop drilling**, and makes testing much easier.

## Why Context?

All user-related state (query, search result, selected users, loading, edit mode...) is shared across multiple components.  
Using a single `UsersContext` makes the state **centralized**, **testable**, and **easily accessible** from anywhere in the UI.

## Installation

This project uses [pnpm](https://pnpm.io) for faster and more efficient installs.  
However, you can also install dependencies using `npm` or `yarn` if you prefer:

```bash
pnpm install
pnpm dev

npm install
npm run dev
```

## Testing

The app is tested with React Testing Library and Vitest.  
All key components are unit tested, and the `UsersContext` is mocked for full control during tests.

To run tests:

```bash
pnpm test

npm run test
```
