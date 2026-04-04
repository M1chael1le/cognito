import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-dark">
          Cognito
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-secondary hover:text-dark transition-colors text-sm font-medium"
          >
            Home
          </Link>
          <Link
            href="/agents"
            className="text-secondary hover:text-dark transition-colors text-sm font-medium"
          >
            Marketplace
          </Link>
          <Link
            href="/experts"
            className="text-secondary hover:text-dark transition-colors text-sm font-medium"
          >
            For Experts
          </Link>
        </div>
      </div>
    </nav>
  );
}
