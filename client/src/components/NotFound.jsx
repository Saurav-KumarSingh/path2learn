import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white px-6">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-orange-500 animate-pulse transition-all duration-300">404</h1>
        
        {/* Message */}
        <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
        <p className="mt-2 text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Button */}
        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium shadow-lg transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
