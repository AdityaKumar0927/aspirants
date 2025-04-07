// app/routes/upload.url.tsx
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return { message: "Separate route for uploading a URL" };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const url = formData.get("url")?.toString() || "";
  return { info: `URL received: ${url}` };
};

export default function UploadUrlPage() {
  const { message } = useLoaderData<{ message: string }>();
  const actionData = useActionData<{ info?: string }>();
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Upload URL (Alternate Route)</h1>
      <p className="mb-4">{message}</p>
      {actionData?.info && (
        <p className="text-green-600 mb-4">{actionData.info}</p>
      )}
      <Form method="post" className="flex flex-col space-y-4 max-w-md">
        <label className="flex flex-col">
          <span className="mb-1">URL</span>
          <input
            type="text"
            name="url"
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
