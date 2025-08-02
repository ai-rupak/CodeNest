"use client";
import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Code2, Sparkles, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CodeNestLogo from "./CodeNestLogo";

function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative h-20 flex items-center justify-between">
          {/* Left Section - Logo */}
          <div className="flex items-center gap-10 lg:gap-15">
            <CodeNestLogo/>
                {/* Center Section - Desktop Navigation */}
              <div className="hidden lg:flex items-center">
                <Link
                  href="/snippets"
                  className="relative group flex items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 
                  border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                  to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                  <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                    Snippets
                  </span>
                </Link>
              </div>
          </div>

          

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <SignedOut>
              <Link
                href="/pricing"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-amber-500/20
                 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300" />
                <span className="text-sm font-medium text-amber-400/90 hover:text-amber-300">
                  Pro
                </span>
              </Link>
            </SignedOut>
            <HeaderProfileBtn />
          </div>

          {/* Mobile Right Section */}
          <div className="flex items-center gap-3 lg:hidden">
            <HeaderProfileBtn />
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative group p-2 rounded-xl bg-gray-800/50 hover:bg-blue-500/10 
              border border-gray-800 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
              aria-label="Toggle mobile menu"
            >
              <div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
              to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative z-10">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden absolute left-0 right-0 top-full bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col space-y-4">
              
              {/* Mobile Snippets Link */}
              <Link
                href="/snippets"
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 bg-gray-800/30 hover:bg-blue-500/10 
                border border-gray-800/50 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Code2 className="w-5 h-5 relative z-10 text-blue-400 group-hover:rotate-3 transition-transform" />
                <span className="text-base font-medium relative z-10 group-hover:text-white transition-colors">
                  Snippets
                </span>
              </Link>

              {/* Mobile Pro Link */}
              <SignedOut>
                <Link
                  href="/pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative group flex items-center gap-3 px-4 py-3 rounded-xl border border-amber-500/20
                   hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                  to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                  duration-300 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/20 
                  to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <Sparkles className="w-5 h-5 relative z-10 text-amber-400 group-hover:text-amber-300 transition-colors" />
                  <span className="text-base font-medium relative z-10 text-amber-400/90 group-hover:text-amber-300 transition-colors">
                    Upgrade to Pro
                  </span>
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationHeader;