// app/routes/me.tsx
export default function MePage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">My Account</h2>
        <p className="text-gray-700 dark:text-gray-300">This is your user dashboard (mocked).</p>
      </div>
    </div>
  );
}
