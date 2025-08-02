import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Code2, CodeXmlIcon, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import CodeNestLogo from "@/components/CodeNestLogo";

async function Header() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const user = await currentUser();

  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  return (
    <div className="relative z-10">
      <div
        className="flex items-center justify-between 
        bg-[#0a0a0f]/90 backdrop-blur-xl p-3 sm:p-4 lg:p-6 mb-4 rounded-lg
        border border-gray-800/50 shadow-2xl"
      >
        {/* Left section - Logo and Navigation */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-8 min-w-0">
          
          <CodeNestLogo/>

          {/* Navigation - Hidden on mobile, shown on larger screens */}
          <nav className="hidden lg:flex items-center">
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
              <span
                className="text-sm font-medium relative z-10 group-hover:text-white
                 transition-colors"
              >
                Snippets
              </span>
            </Link>
          </nav>
        </div>

        {/* Right section - Controls and Profile */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0">
          {/* Editor Controls */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
              <ThemeSelector />
              <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
            </div>

            {/* Pro Button - Responsive sizing */}
            {!convexUser?.isPro && (
              <Link
                href="/pricing"
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 lg:px-4 py-1.5 rounded-lg 
                border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                transition-all duration-300 group"
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 group-hover:text-amber-300 transition-colors group-hover:rotate-12" />
                <span className="text-xs sm:text-sm font-medium text-amber-400/90 group-hover:text-amber-300 transition-colors">
                  Pro
                </span>
              </Link>
            )}

            {/* Run Button */}
            <SignedIn>
              <RunButton />
            </SignedIn>
          </div>

          {/* Profile Section */}
          <div className="flex items-center pl-2 sm:pl-3 border-l border-gray-800/60">
            <HeaderProfileBtn />
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Only show on small screens */}
      <div className="lg:hidden mb-4">
        <div className="bg-[#0a0a0f]/80 backdrop-blur-xl rounded-lg border border-gray-800/50 p-3">
          <Link
            href="/snippets"
            className="relative group flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 bg-gray-800/50 
              hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden w-full"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
              to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
            <span
              className="text-sm font-medium relative z-10 group-hover:text-white
               transition-colors"
            >
              Browse Code Snippets
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;