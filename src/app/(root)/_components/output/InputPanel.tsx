import { Keyboard, RotateCcw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

function InputPanel({ onSubmit }: { onSubmit: (value: string) => void }) {
  const { input, setInput } = useCodeEditorStore();
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 border-b border-white/5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Keyboard className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-300">
            Program Input
          </span>
        </div>
        
        {/* Character count - hidden on mobile */}
        <span className="hidden sm:block text-xs text-gray-500">
          {input.length} characters
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Input Area */}
        <div className="relative group">
          <motion.div
            animate={{
              boxShadow: isFocused 
                ? "0 0 0 1px rgb(59 130 246 / 0.5), 0 0 20px rgb(59 130 246 / 0.1)"
                : "0 0 0 1px rgb(75 85 99 / 0.3)"
            }}
            className="rounded-xl overflow-hidden"
          >
            <textarea
              className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-[#1e1e2e]/80 backdrop-blur-sm
              border-0 text-gray-300 placeholder-gray-500 resize-none
              focus:outline-none transition-all text-sm sm:text-base
              scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600
              hover:scrollbar-thumb-gray-500"
              placeholder="Enter input for your code..."
              rows={window.innerWidth < 640 ? 3 : 4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </motion.div>

          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 
          opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Mobile: Character count */}
          <span className="sm:hidden text-xs text-gray-500 flex-shrink-0">
            {input.length} chars
          </span>

          {/* Desktop: Helper text */}
          <p className="hidden sm:block text-xs text-gray-500 flex-1">
            Press Ctrl+Enter to submit or use the button
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Clear button */}
            {input.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={handleClear}
                className="relative group flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2
                bg-gray-800/50 hover:bg-red-500/10 border border-gray-700 hover:border-red-500/30
                rounded-lg transition-all duration-200 text-xs sm:text-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-orange-500/5 
                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-red-400 
                transition-colors relative z-10" />
                <span className="text-gray-400 group-hover:text-red-400 transition-colors relative z-10">
                  Clear
                </span>
              </motion.button>
            )}

            
          </div>
        </div>
      </form>

      
    </div>
  );
}

export default InputPanel;