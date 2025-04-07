// app/routes/auth.logout.tsx
import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async () => {
  return redirect("/");
};

export default function AuthLogoutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}
