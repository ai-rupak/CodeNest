import { Bot, ChevronDown, ChevronUp, Keyboard, Sparkles, Terminal } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
function OutputHeader({ 
  hasContent, 
  showInput, 
  onToggleInput, 
  onAIHelp, 
  hasError 
}: {
  hasContent: string | null;
  isRunning: boolean;
  showInput: boolean;
  onToggleInput: () => void;
  onAIHelp: () => void;
  hasError: boolean;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!hasContent) return;
    const content = document.querySelector('.output-content')?.textContent || '';
    await navigator.clipboard.writeText(content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b border-white/5">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <motion.div 
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3a] ring-1 ring-white/10 shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <Terminal className="w-5 h-5 text-blue-400" />
        </motion.div>
        <div>
          <h3 className="text-sm sm:text-base font-semibold text-white">Output Console</h3>
          <p className="text-xs text-gray-400">Execution results and errors</p>
        </div>
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        {/* Input Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleInput}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl ring-1 transition-all text-sm font-medium ${
            showInput 
              ? 'bg-blue-600/20 ring-blue-500/30 text-blue-400' 
              : 'bg-[#1e1e2e] ring-white/10 text-gray-400 hover:ring-white/20'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span className="hidden xs:inline">Input</span>
          {showInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </motion.button>

        {/* AI Help - Only show when there's an error */}
        {hasError && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAIHelp}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-purple-400 rounded-xl ring-1 ring-purple-500/30 transition-all text-sm font-medium"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Help</span>
            <Sparkles className="w-3 h-3" />
          </motion.button>
        )}

        {/* Copy Button */}
        {hasContent && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] text-gray-400 hover:text-gray-300 rounded-xl ring-1 ring-white/10 hover:ring-white/20 transition-all text-sm"
          >
            {isCopied ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4 text-green-400"
                >
                  ✓
                </motion.div>
                <span className="hidden sm:inline text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}
export default OutputHeader;