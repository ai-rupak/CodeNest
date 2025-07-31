import { Blocks } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-800/30 mt-auto bg-gradient-to-b from-gray-950/50 to-black/80 backdrop-blur-sm">
      {/* Elegant top border gradient */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Brand section */}
          <div className="flex items-center gap-3 text-gray-300 group">
            <div className="p-2 rounded-lg bg-gray-800/50 border border-gray-700/50 group-hover:border-blue-500/30 transition-all duration-300">
              <Blocks className="size-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
            <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Built for developers, by developers
            </span>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-2 sm:gap-4">
            {[
              { href: "/support", label: "Support" },
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-gray-800/30 group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-3/4 group-hover:-translate-x-1/2 transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Optional secondary content area */}
        <div className="mt-8 pt-6 border-t border-gray-800/30 hidden sm:block">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; 2025 Your Company. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Made with ❤️ for the developer community</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
    </footer>
  );
}

export default Footer;