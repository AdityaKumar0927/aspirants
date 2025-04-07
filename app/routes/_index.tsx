// app/routes/_index.tsx
import { Link } from "@remix-run/react";

export default function IndexPage() {
  return (
    <main className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-center">
          Welcome to the AI-Powered Platform
        </h1>
        <nav className="flex flex-col items-center space-y-4">
          <Link
            to="/edge"
            className="px-6 py-3 text-lg rounded-md bg-blue-600 hover:bg-blue-700 text-white w-64 text-center transition-colors"
          >
            Check Service Health
          </Link>
          <Link
            to="/upload"
            className="px-6 py-3 text-lg rounded-md bg-green-600 hover:bg-green-700 text-white w-64 text-center transition-colors"
          >
            Upload or Parse Content
          </Link>
        </nav>
      </div>
    </main>
  );
}
