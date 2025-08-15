# Example Upload to Firebase

This project is a modern file upload web application built with **React**, **TypeScript**, and **Vite**. It features a drag-and-drop upload interface, file preview, progress tracking, and reordering of files using drag-and-drop. The app integrates with **Firebase Storage** for file uploads and supports local development using the Firebase Storage Emulator.

![Demonstração](support/example.gif)

## Features

- ⚡️ Fast development with Vite, React 19, and TypeScript
- 🎨 Styled with Tailwind CSS and Radix UI components
- 📦 File upload with drag-and-drop, preview, and progress bar
- 🔄 Reorder files via drag-and-drop
- ☁️ Uploads files to Firebase Storage (with emulator support for local development)
- 🧪 Unit tests with Vitest and React Testing Library
- 🧹 Linting with ESLint and recommended configs

## Getting Started

1. **Install dependencies:**

```sh
npm install
```

2. **Start the Firebase emulator:**

```sh
npm run emulators
```

3. **Run the development server:**

```sh
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

5. You need to create a `.firebaserc` with some informations project

```
 {
  "projects": {
    "default": "project name"
  }
}

```

## Project Structure

- `src/components/upload-input/` – Main upload UI, including drag-and-drop, file list, and progress
- `src/lib/firebase.ts` – Firebase initialization and storage config
- `src/App.tsx` – Main app entry, integrates upload component
- `storage.rules` – Firebase Storage security rules (open for development)
- `firebase.json` – Firebase emulator configuration

## Notes

- The app connects to the Firebase Storage Emulator on `localhost:9199` during development.
- You can customize the upload logic, UI, and Firebase rules as needed.
