// app/routes/edge.tsx
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { checkGoServiceHealth } from "~/lib/goService.client";

type LoaderData = {
  goHealth: string;
};

export const loader: LoaderFunction = async () => {
  try {
    const goHealth = await checkGoServiceHealth();
    return { goHealth };
  } catch {
    return { goHealth: "error" };
  }
};

export default function EdgePage() {
  const { goHealth } = useLoaderData<LoaderData>();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Edge Diagnostics</h2>
        <p className="text-lg mb-2">Go Service Health: {goHealth}</p>
        {goHealth === "error" && (
          <p className="text-red-500 mt-2">Unable to connect to Go service</p>
        )}
      </div>
    </div>
  );
}
