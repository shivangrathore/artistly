export default function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Artistly. All rights reserved.
          </p>
          <ul className="flex space-x-4">
            <li>
              <a href="/privacy" className="text-sm hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-sm hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
