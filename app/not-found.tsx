
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="px-4 py-2 text-white bg-black rounded hover:bg-gray-800 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
