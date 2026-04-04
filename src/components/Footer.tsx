export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-secondary text-sm">
          Built at Babson College &copy; {new Date().getFullYear()} Cognito
        </p>
      </div>
    </footer>
  );
}
