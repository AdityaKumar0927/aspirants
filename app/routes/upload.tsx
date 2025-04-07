// app/routes/upload.tsx
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { supabaseAdmin } from "~/utils/supabase.server";
import { redisClient } from "~/utils/redis.server";
import { openai } from "~/utils/openai.server";
import { parseContentWithReadability } from "~/utils/readability.server";

export const loader: LoaderFunction = async () => {
  const { data: uploads } = await supabaseAdmin
    .from("user_uploads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return { uploads: uploads ?? [] };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const url = formData.get("url")?.toString()?.trim();
  if (!url) return { error: "No URL provided." };

  const { data: upData, error: upErr } = await supabaseAdmin
    .from("user_uploads")
    .insert([{ url, file_type: "web", original_name: url }])
    .select("id")
    .single();

  if (upErr || !upData) {
    return { error: "Could not insert user_upload." };
  }
  const uploadId = upData.id;

  const resp = await fetch(url);
  if (!resp.ok) {
    return { error: `Failed to fetch URL: ${resp.statusText}` };
  }
  const html = await resp.text();

  // SERVER-ONLY parse
  const mainText = parseContentWithReadability(url, html);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful summarizer." },
      { role: "user", content: `Summarize the text:\n${mainText}` }
    ]
  });
  const summary = completion.choices?.[0]?.message?.content?.trim() ?? "";

  let orderIndex = 0;
  const { error: fragErr } = await supabaseAdmin
    .from("content_fragments")
    .insert([
      {
        upload_id: uploadId,
        text_content: mainText,
        fragment_type: "web_html",
        order_index: orderIndex++
      },
      {
        upload_id: uploadId,
        text_content: summary,
        fragment_type: "summary",
        order_index: orderIndex++
      }
    ]);

  if (fragErr) {
    return { error: `Error storing fragments: ${fragErr.message}` };
  }

  await redisClient.set(`uploadStatus:${uploadId}`, "processed");
  return redirect(`/parse/${uploadId}`);
};

export default function UploadPage() {
  const { uploads } = useLoaderData<typeof loader>();
  const actionData = useActionData() as { error?: string };

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Upload or Parse a URL</h1>
      {actionData?.error && (
        <p className="text-red-500 mb-4">{actionData.error}</p>
      )}
      <Form method="post" className="flex flex-col space-y-4 max-w-lg">
        <label className="flex flex-col">
          <span className="mb-1">URL</span>
          <input
            type="text"
            name="url"
            placeholder="https://example.com"
            className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Parse
        </button>
      </Form>
      <hr className="my-6" />
      <h3 className="text-xl font-semibold mb-2">Recent Uploads</h3>
      <ul className="space-y-2">
        {uploads.map((u: any) => (
          <li
            key={u.id}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded"
          >
            {u.url || u.file_path}
          </li>
        ))}
      </ul>
    </div>
  );
}
