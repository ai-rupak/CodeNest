import { SignInButton } from "@clerk/nextjs";
import { LogIn } from "lucide-react";

function LoginButton() {
  return (
    <SignInButton mode="modal">
      <button
        className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
        hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800
        text-white rounded-lg transition-all duration-300 font-medium 
        shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:shadow-xl
        border border-blue-400/20 hover:border-blue-300/30
        transform hover:scale-[1.02] active:scale-[0.98]
        ring-0 hover:ring-2 hover:ring-blue-400/20 focus:ring-2 focus:ring-blue-400/40 focus:outline-none
        overflow-hidden"
      >
        {/* Animated background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 
        translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-300/20 to-blue-400/0 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <LogIn className="w-4 h-4 relative z-10 transition-all duration-300 group-hover:translate-x-0.5 group-hover:rotate-[-2deg]" />
        <span className="text-sm sm:text-base relative z-10 group-hover:tracking-wide transition-all duration-300">
          Sign In
        </span>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-1/2 w-0 h-px bg-white/40 
        group-hover:w-3/4 group-hover:-translate-x-1/2 transition-all duration-300" />
      </button>
    </SignInButton>
  );
}

export default LoginButton;