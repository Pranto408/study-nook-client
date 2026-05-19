import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">404</h1>

      <p className="mt-4">Page Not Found</p>

      <Link href="/" className="mt-5 px-4 py-2 bg-black text-white rounded">
        Go Home
      </Link>
    </div>
  );
}
