import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";


function AISupport({ error, onClose }: { error: string; onClose: () => void }) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [aiResponse, setAiResponse] = useState("");

  // Simulate AI analysis
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
      setAiResponse("Based on the error message, it looks like there's a syntax error in your code. Here are some suggestions:\n\n1. Check for missing semicolons\n2. Verify bracket matching\n3. Ensure proper variable declarations\n\nWould you like me to provide more specific guidance?");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-[#1e1e2e] to-[#2a2a3a] rounded-2xl border border-white/10 shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">AI Code Assistant</h3>
            <p className="text-sm text-gray-400">Analyzing your error and providing solutions</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {isAnalyzing ? (
            <div className="flex items-center gap-3 text-purple-400">
              <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <span>Analyzing your error...</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="text-red-300 font-medium mb-2">Error Analysis:</h4>
                <pre className="text-red-400/80 text-sm font-mono whitespace-pre-wrap">{error}</pre>
              </div>
              
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="text-purple-300 font-medium mb-2">AI Suggestions:</h4>
                <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{aiResponse}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-lg transition-all"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all font-medium"
          >
            Apply Fix
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
export default AISupport;