// app/components/NavigationHeaderClient.tsx
'use client';

import HeaderProfileBtn from "@/app/(root)/_components/HeaderProfileBtn";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { Blocks, Code2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NavigationHeaderClient({  convexUser }: { convexUser: any}) {
  return (
    <div className="sticky top-0 ...">
      <div className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/90 backdrop-blur-xl backdrop-saturate-150">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative">
              {/* Logo hover effect */}
              <div
                className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
              group-hover:opacity-100 transition-all duration-500 blur-xl"
              />

              {/* Logo */}
              <div className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-1.5 sm:p-2 rounded-xl ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <Blocks className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
              </div>

              <div className="relative hidden sm:block">
                <span
                  className="block text-base sm:text-lg font-semibold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
                >
                  CodeCraft
                </span>
                <span className="block text-xs text-blue-400/60 font-medium">
                  Interactive Code Editor
                </span>
              </div>

              {/* Mobile-only brand name */}
              <div className="relative sm:hidden">
                <span
                  className="block text-base font-semibold bg-gradient-to-r
                 from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text"
                >
                  CodeCraft
                </span>
              </div>
            </Link>

            {/* Snippets Link - Only show when signed in or hide on mobile when signed out */}
            <SignedIn>
              <Link
                href="/snippets"
                className="relative group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 
                border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                <span className="text-xs sm:text-sm font-medium relative z-10 group-hover:text-white transition-colors">
                  <span className="hidden sm:inline">Snippets</span>
                  <span className="sm:hidden">Code</span>
                </span>
              </Link>
            </SignedIn>

            {/* Show snippets link for signed out users on desktop only */}
            <SignedOut>
              <Link
                href="/snippets"
                className="hidden lg:flex relative group items-center gap-2 px-4 py-1.5 rounded-lg text-gray-300 bg-gray-800/50 hover:bg-blue-500/10 
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
            </SignedOut>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* For signed out users - Combined CTA approach */}
            <SignedOut>
              {/* Primary CTA - Sign In with Pro hint */}
              <Link
                href="/pricing"
                className="group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 
                bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                text-white rounded-lg transition-all duration-300 font-medium 
                shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-xl
                border border-blue-400/20 hover:border-blue-300/30
                transform hover:scale-[1.02] overflow-hidden"
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                
                <Sparkles className="w-4 h-4 relative z-10 text-white-300 group-hover:rotate-12 transition-transform" />
                <span className="text-xs sm:text-sm relative z-10 font-semibold">
                  <span className="hidden sm:inline">Get Pro Access</span>
                  <span className="sm:hidden">Pro</span>
                </span>
              </Link>
            </SignedOut>

            {/* For signed in users - Show Pro link separately */}
            <SignedIn>
              {!convexUser?.isPro ? <Link
                href="/pricing"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-lg border border-amber-500/20
                 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" />
                <span className="text-xs sm:text-sm font-medium text-amber-400/90 hover:green-amber-300 transition-colors">
                  Premium
                </span>
              </Link>:(
              <Link
                href="/pricing"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 rounded-lg border border-amber-500/20
                 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all 
                duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" />
                <span className="text-xs sm:text-sm font-medium text-amber-400/90 hover:green-amber-300 transition-colors">
                  Upgrade
                </span>
              </Link>)}
            </SignedIn>

            {/* Profile button */}
            <div className="flex-shrink-0">
              <HeaderProfileBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
    
}