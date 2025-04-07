// app/routes/parse.$uploadId.tsx
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabaseAdmin } from "~/utils/supabase.server";
import { redisClient } from "~/utils/redis.server";

export const loader: LoaderFunction = async ({ params }) => {
  const uploadId = params["uploadId"];
  if (!uploadId) throw new Error("Missing uploadId param");
  const status = await redisClient.get(`uploadStatus:${uploadId}`);
  const { data: fragments, error } = await supabaseAdmin
    .from("content_fragments")
    .select("*")
    .eq("upload_id", uploadId)
    .order("order_index", { ascending: true });
  if (error) throw new Error(error.message);
  return { status: status ?? "unknown", fragments: fragments ?? [] };
};

export default function ParseUploadIdPage() {
  const { status, fragments } = useLoaderData<typeof loader>();
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Parsed Content</h2>
      <p className="mb-4">Status: {status}</p>
      {fragments.map((frag: any) => (
        <div key={frag.id} className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded">
          <p className="font-semibold">Type: {frag.fragment_type}</p>
          <pre className="whitespace-pre-wrap mt-2 text-sm text-gray-700 dark:text-gray-300">
            {frag.text_content}
          </pre>
        </div>
      ))}
    </div>
  );
}
