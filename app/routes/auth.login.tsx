// app/routes/auth.login.tsx
import { Form, redirect } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString() ?? "";
  return redirect("/");
};

export default function AuthLoginPage() {
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <Form method="post" className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Email</span>
            <input
              type="email"
              name="email"
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 transition-colors"
          >
            Log In
          </button>
        </Form>
      </div>
    </div>
  );
}
